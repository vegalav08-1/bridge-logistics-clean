'use client';

import React, { createContext, useContext, ReactNode } from 'react';

export interface ACLContextType {
  userId: string;
  role: string;
  permissions: string[];
  canAccess: (resource: string, action?: string) => boolean;
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

  const value: ACLContextType = {
    userId,
    role,
    permissions,
    canAccess,
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
    throw new Error('useACL must be used within an ACLProvider');
  }
  return context;
}

export function useAbility() {
  const { canAccess } = useACL();
  return { canAccess };
}