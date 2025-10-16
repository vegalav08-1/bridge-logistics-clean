// Mock database functions
export const db = {
  // Mock database operations
  attachment: {
    findUnique: () => Promise.resolve(null),
    findMany: () => Promise.resolve([]),
    create: () => Promise.resolve({}),
    update: () => Promise.resolve({}),
    delete: () => Promise.resolve({}),
  },
  user: {
    findUnique: () => Promise.resolve({ id: 'user-1', parentAdminId: 'admin-1', role: 'USER' }),
    findMany: () => Promise.resolve([]),
    create: () => Promise.resolve({}),
    update: () => Promise.resolve({}),
    delete: () => Promise.resolve({}),
  },
  shipment: {
    findUnique: () => Promise.resolve(null),
    findMany: () => Promise.resolve([]),
    create: () => Promise.resolve({}),
    update: () => Promise.resolve({}),
    delete: () => Promise.resolve({}),
  },
  // Add other mock database operations as needed
};

export const prisma = db;
