// Service Worker для PWA Bridge Logistics
const CACHE_NAME = 'bridge-v1';
const OFFLINE_URL = '/offline.html';

// Файлы для кэширования при установке
const STATIC_CACHE_URLS = [
  '/',
  '/offline.html',
  '/manifest.webmanifest',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Стратегии кэширования
const CACHE_STRATEGIES = {
  // App shell - CacheFirst
  static: [
    '/_next/static/',
    '/icons/',
    '/manifest.webmanifest'
  ],
  // API - StaleWhileRevalidate
  api: [
    '/api/chats',
    '/api/shipments',
    '/api/notifications'
  ],
  // Чат сообщения - NetworkFirst
  chat: [
    '/api/chats/',
    '/chat/'
  ],
  // Изображения - CacheFirst
  images: [
    '/api/files/',
    '/_next/image'
  ]
};

// Установка Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static files');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log('Service Worker: Installation complete');
        return self.skipWaiting();
      })
  );
});

// Активация Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activation complete');
        return self.clients.claim();
      })
  );
});

// Обработка запросов
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Пропускаем не-GET запросы
  if (request.method !== 'GET') {
    return;
  }
  
  // Пропускаем chrome-extension и другие протоколы
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  event.respondWith(handleRequest(request));
});

// Обработка Background Sync
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync triggered:', event.tag);
  
  if (event.tag === 'outbox-sync') {
    event.waitUntil(syncOutbox());
  }
});

// Обработка push уведомлений
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received');
  
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body || 'Новое уведомление',
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-192x192.png',
      tag: data.tag || 'bridge-notification',
      data: data.data || {},
      actions: [
        {
          action: 'open',
          title: 'Открыть',
          icon: '/icons/icon-192x192.png'
        },
        {
          action: 'dismiss',
          title: 'Закрыть'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title || 'Bridge Logistics', options)
    );
  }
});

// Обработка кликов по уведомлениям
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked:', event.action);
  
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.openWindow('/shipments')
    );
  }
});

// Основная логика обработки запросов
async function handleRequest(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  try {
    // Определяем стратегию кэширования
    if (isStaticResource(pathname)) {
      return await cacheFirst(request);
    } else if (isApiRequest(pathname)) {
      return await staleWhileRevalidate(request);
    } else if (isChatRequest(pathname)) {
      return await networkFirst(request);
    } else if (isImageRequest(pathname)) {
      return await cacheFirst(request);
    } else {
      return await networkFirst(request);
    }
  } catch (error) {
    console.error('Service Worker: Request failed:', error);
    
    // Для навигационных запросов показываем offline страницу
    if (request.mode === 'navigate') {
      return await caches.match(OFFLINE_URL);
    }
    
    // Для API запросов возвращаем ошибку
    return new Response(
      JSON.stringify({ error: 'Offline', message: 'Нет подключения к интернету' }),
      { 
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Стратегия CacheFirst
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    // Кэшируем только успешные ответы
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    throw error;
  }
}

// Стратегия StaleWhileRevalidate
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  // Обновляем кэш в фоне
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  });
  
  // Возвращаем кэшированный ответ или ждем сеть
  return cachedResponse || fetchPromise;
}

// Стратегия NetworkFirst
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// Вспомогательные функции для определения типа запроса
function isStaticResource(pathname) {
  return CACHE_STRATEGIES.static.some(pattern => pathname.startsWith(pattern));
}

function isApiRequest(pathname) {
  return CACHE_STRATEGIES.api.some(pattern => pathname.startsWith(pattern));
}

function isChatRequest(pathname) {
  return CACHE_STRATEGIES.chat.some(pattern => pathname.startsWith(pattern));
}

function isImageRequest(pathname) {
  return CACHE_STRATEGIES.images.some(pattern => pathname.startsWith(pattern));
}

// Синхронизация outbox очереди
async function syncOutbox() {
  try {
    console.log('Service Worker: Syncing outbox...');
    
    // Отправляем сообщение клиенту для синхронизации
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'SYNC_OUTBOX',
        timestamp: Date.now()
      });
    });
    
    console.log('Service Worker: Outbox sync completed');
  } catch (error) {
    console.error('Service Worker: Outbox sync failed:', error);
  }
}

// Очистка старых кэшей
async function cleanupOldCaches() {
  const cacheNames = await caches.keys();
  const currentCaches = [CACHE_NAME];
  
  const oldCaches = cacheNames.filter(name => !currentCaches.includes(name));
  
  return Promise.all(
    oldCaches.map(name => {
      console.log('Service Worker: Deleting old cache:', name);
      return caches.delete(name);
    })
  );
}

// Периодическая очистка кэша
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEANUP_CACHE') {
    event.waitUntil(cleanupOldCaches());
  }
});

console.log('Service Worker: Loaded successfully');




