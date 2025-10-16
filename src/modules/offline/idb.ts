// Mock IDB implementation for deployment
export interface OfflineDB {
  // Mock interface
}

export interface OutboxMessage {
  id: string;
  chatId: string;
  kind: 'text' | 'file' | 'system';
  payload: any;
  createdAt: number;
  retryCount: number;
  lastRetryAt?: number;
  status: 'pending' | 'sending' | 'sent' | 'failed';
  clientId?: string;
}

export interface OutboxChunk {
  id: string;
  uploadId: string;
  partNo: number;
  blob: Blob;
  checksum: string;
  size: number;
  createdAt: number;
  status: 'pending' | 'uploading' | 'uploaded' | 'failed';
}

export interface LocalAttachment {
  tempId: string;
  previewBlob: Blob;
  meta: {
    name: string;
    mime: string;
    size: number;
    width?: number;
    height?: number;
  };
  createdAt: number;
}

export interface CachedChat {
  chatId: string;
  messages: any[];
  updatedAt: number;
  lastReadSeq: number;
}

// Mock service for deployment
export class OfflineDBService {
  async init(): Promise<void> {
    // Mock implementation
  }

  async close(): Promise<void> {
    // Mock implementation
  }

  async addOutboxMessage(message: any): Promise<string> {
    return 'mock-id';
  }

  async getOutboxMessages(chatId?: string): Promise<OutboxMessage[]> {
    return [];
  }

  async updateOutboxMessage(id: string, updates: any): Promise<void> {
    // Mock implementation
  }

  async deleteOutboxMessage(id: string): Promise<void> {
    // Mock implementation
  }

  async addOutboxChunk(chunk: any): Promise<string> {
    return 'mock-chunk-id';
  }

  async getOutboxChunks(uploadId: string): Promise<OutboxChunk[]> {
    return [];
  }

  async updateOutboxChunk(id: string, updates: any): Promise<void> {
    // Mock implementation
  }

  async deleteOutboxChunk(id: string): Promise<void> {
    // Mock implementation
  }

  async addLocalAttachment(attachment: any): Promise<void> {
    // Mock implementation
  }

  async getLocalAttachment(tempId: string): Promise<LocalAttachment | undefined> {
    return undefined;
  }

  async deleteLocalAttachment(tempId: string): Promise<void> {
    // Mock implementation
  }

  async cacheChat(chat: CachedChat): Promise<void> {
    // Mock implementation
  }

  async getCachedChat(chatId: string): Promise<CachedChat | undefined> {
    return undefined;
  }

  async getCachedChats(): Promise<CachedChat[]> {
    return [];
  }

  async clearAll(): Promise<void> {
    // Mock implementation
  }

  async getStats(): Promise<{
    outboxMessages: number;
    outboxChunks: number;
    localAttachments: number;
    cachedChats: number;
  }> {
    return {
      outboxMessages: 0,
      outboxChunks: 0,
      localAttachments: 0,
      cachedChats: 0,
    };
  }
}

export const offlineDB = new OfflineDBService();