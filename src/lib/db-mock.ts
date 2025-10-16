// Mock database functions
export const db = {
  // Mock database operations
  attachment: {
    findUnique: (args?: any) => Promise.resolve(null),
    findMany: (args?: any) => Promise.resolve([]),
    create: (args?: any) => Promise.resolve({}),
    update: (args?: any) => Promise.resolve({}),
    delete: (args?: any) => Promise.resolve({}),
  },
  user: {
    findUnique: (args?: any) => Promise.resolve({ id: 'user-1', parentAdminId: 'admin-1', role: 'USER' }),
    findMany: (args?: any) => Promise.resolve([]),
    create: (args?: any) => Promise.resolve({}),
    update: (args?: any) => Promise.resolve({}),
    delete: (args?: any) => Promise.resolve({}),
  },
  shipment: {
    findUnique: (args?: any) => Promise.resolve(null),
    findMany: (args?: any) => Promise.resolve([]),
    create: (args?: any) => Promise.resolve({}),
    update: (args?: any) => Promise.resolve({}),
    delete: (args?: any) => Promise.resolve({}),
  },
  chat: {
    findUnique: (args?: any) => Promise.resolve(null),
    findMany: (args?: any) => Promise.resolve([]),
    create: (args?: any) => Promise.resolve({}),
    update: (args?: any) => Promise.resolve({}),
    delete: (args?: any) => Promise.resolve({}),
  },
  message: {
    findUnique: (args?: any) => Promise.resolve(null),
    findMany: (args?: any) => Promise.resolve([]),
    create: (args?: any) => Promise.resolve({}),
    update: (args?: any) => Promise.resolve({}),
    delete: (args?: any) => Promise.resolve({}),
  },
  order: {
    findUnique: (args?: any) => Promise.resolve(null),
    findMany: (args?: any) => Promise.resolve([]),
    create: (args?: any) => Promise.resolve({}),
    update: (args?: any) => Promise.resolve({}),
    delete: (args?: any) => Promise.resolve({}),
  },
  partner: {
    findUnique: (args?: any) => Promise.resolve(null),
    findMany: (args?: any) => Promise.resolve([]),
    create: (args?: any) => Promise.resolve({}),
    update: (args?: any) => Promise.resolve({}),
    delete: (args?: any) => Promise.resolve({}),
  },
  annotation: {
    findUnique: (args?: any) => Promise.resolve(null),
    findMany: (args?: any) => Promise.resolve([]),
    create: (args?: any) => Promise.resolve({}),
    update: (args?: any) => Promise.resolve({}),
    delete: (args?: any) => Promise.resolve({}),
  },
  file: {
    findUnique: (args?: any) => Promise.resolve(null),
    findMany: (args?: any) => Promise.resolve([]),
    create: (args?: any) => Promise.resolve({}),
    update: (args?: any) => Promise.resolve({}),
    delete: (args?: any) => Promise.resolve({}),
  },
  document: {
    findUnique: (args?: any) => Promise.resolve(null),
    findMany: (args?: any) => Promise.resolve([]),
    create: (args?: any) => Promise.resolve({}),
    update: (args?: any) => Promise.resolve({}),
    delete: (args?: any) => Promise.resolve({}),
  },
  // Add other mock database operations as needed
};

export const prisma = db;
