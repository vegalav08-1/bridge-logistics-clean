'use client';

import { useEffect } from 'react';
import { NOTIFICATIONS_V2_ENABLED } from '@/lib/flags';
import { initTestNotifications } from '@/lib/notifications/seed';
import { initDevHelpers } from '@/lib/partners/dev-helpers';

export function ClientInitializer() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && NOTIFICATIONS_V2_ENABLED) {
      initTestNotifications();
    }
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      initDevHelpers();
    }
  }, []);

  return null;
}
