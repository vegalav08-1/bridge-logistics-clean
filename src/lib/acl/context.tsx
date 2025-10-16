'use client';

import React, { createContext, useContext, ReactNode } from 'react';

export interface ACLContextType {
  userId: string;
  role: string;
  permissions: string[];
  canAccess: (resource: string, action?: string) => boolean;
  ability: {
    can: (resource: string, action?: string) => boolean;
    reason: (resource: string, action?: string) => string | null;
  };
  ctx: {
    userId: string;
    role: string;
    permissions: string[];
  };
}

const ACLContext = createContext<ACLContextType | null>(null);

interface ACLProviderProps {
  children: ReactNode;
  ctx: {
    userId: string;
    role: string;
    permissions?: string[];
  };
}

export function ACLProvider({ 
  children, 
  ctx 
}: ACLProviderProps) {
  const { userId, role, permissions = [] } = ctx;
  const canAccess = (resource: string, action?: string): boolean => {
    // Mock implementation - in real app, this would check against user permissions
    if (role === 'SUPER_ADMIN') return true;
    if (role === 'ADMIN') {
      return ['admin', 'users', 'analytics'].includes(resource);
    }
    if (role === 'USER') {
      return ['dashboard', 'profile'].includes(resource);
    }
    return false;
  };

  const ability = {
    can: canAccess,
    reason: (resource: string, action?: string) => {
      if (!canAccess(resource, action)) {
        return `Access denied to ${resource}${action ? ` for action ${action}` : ''}`;
      }
      return null;
    }
  };

  const value: ACLContextType = {
    userId,
    role,
    permissions,
    canAccess,
    ability,
    ctx: {
      userId,
      role,
      permissions
    }
  };

  return (
    <ACLContext.Provider value={value}>
      {children}
    </ACLContext.Provider>
  );
}

export function useACL(): ACLContextType {
  const context = useContext(ACLContext);
  if (!context) {
    // Return mock context for SSR
    const mockCanAccess = () => true;
    return {
      userId: 'user-1',
      role: 'SUPER_ADMIN',
      permissions: [],
      canAccess: mockCanAccess,
      ability: {
        can: mockCanAccess,
        reason: () => null
      },
      ctx: {
        userId: 'user-1',
        role: 'SUPER_ADMIN',
        permissions: []
      }
    };
  }
  return context;
}

export function useAbility() {
  const { canAccess } = useACL();
  return { canAccess };
}