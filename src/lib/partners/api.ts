// Mock partners API
export function getClient(id: string): Promise<any> {
  return Promise.resolve({ id, name: `Client ${id}` });
}

export function listClientShipments(clientId: string): Promise<any[]> {
  return Promise.resolve([]);
}
