// Mock authentication functions
export interface CurrentUser {
  id: string;
  email: string;
  role: string;
  name?: string;
}

export function getCurrentUserFromToken(token: string): CurrentUser | null {
  // Mock implementation - in real app this would verify JWT
  if (token === 'mock-token') {
    return {
      id: 'user-1',
      email: 'vegalav0202@gmail.com',
      role: 'SUPER_ADMIN',
      name: 'Super Admin'
    };
  }
  return null;
}

export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}

// Mock schemas
export const getFileUrlSchema = {
  parse: (data: any) => data
};

export const createUploadSessionSchema = {
  parse: (data: any) => data
};

export const acceptOfferSchema = {
  parse: (data: any) => data
};

export function verifyAccess(request: any): boolean {
  // Mock implementation - always returns true
  return true;
}

// Additional auth schemas and functions
export const emailSchema = { parse: (data: any) => data };
export const registerSchema = { parse: (data: any) => data };
export const resetSchema = { parse: (data: any) => data };
export const tokenSchema = { parse: (data: any) => data };
export const createOfferSchema = { parse: (data: any) => data };
export const archiveRequestSchema = { parse: (data: any) => data };
export const duplicateRequestSchema = { parse: (data: any) => data };
export const createRequestSchema = { parse: (data: any) => data };
export const receiveShipmentSchema = { parse: (data: any) => data };
export const completeUploadSchema = { parse: (data: any) => data };

// Hash and crypto functions
export function sha256(data: string): string {
  return `hashed_${data}`;
}

export function hashPassword(password: string): string {
  return `hashed_${password}`;
}

// JWT functions
export function signAccess(payload: any): string {
  return `access_token_${JSON.stringify(payload)}`;
}

export function signRefresh(payload: any): string {
  return `refresh_token_${JSON.stringify(payload)}`;
}

export function verifyRefresh(token: string): any {
  return { userId: 'user-1', role: 'SUPER_ADMIN' };
}

// Email functions
export function sendMail(to: string, subject: string, body: string): Promise<void> {
  console.log(`Mock email sent to ${to}: ${subject}`);
  return Promise.resolve();
}

export const resetPasswordTpl = (token: string) => `Reset password: ${token}`;
export const verifyEmailTpl = (token: string) => `Verify email: ${token}`;

// Business logic functions
export function generateReferralToken(): string {
  return `ref_${Date.now()}`;
}

export function isTokenUnique(token: string): boolean {
  return true;
}

export function duplicateRequest(data: any): any {
  return { ...data, id: `duplicate_${Date.now()}` };
}

export function canCreateForAdmin(): boolean {
  return true;
}

export function createChatWithSummary(data: any): any {
  return { id: `chat_${Date.now()}`, ...data };
}

export function canAccessChat(chatId: string): boolean {
  return true;
}

export function createMessageNotification(data: any): any {
  return { id: `notif_${Date.now()}`, ...data };
}
