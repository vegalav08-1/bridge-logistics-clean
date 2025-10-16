import { NextRequest } from 'next/server';
import { getCurrentUserFromToken, extractTokenFromHeader, CurrentUser } from '@/lib/auth-mock';

/**
 * Извлекает текущего пользователя из запроса
 */
export async function getCurrentUser(request: NextRequest): Promise<CurrentUser> {
  const authHeader = request.headers.get('authorization');
  const token = extractTokenFromHeader(authHeader);
  return getCurrentUserFromToken(token);
}




