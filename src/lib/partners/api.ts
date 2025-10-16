// Mock partners API
export function getClient(id: string): Promise<any> {
  return Promise.resolve({ id, name: `Client ${id}` });
}

export function listClientShipments(clientId: string): Promise<any[]> {
  return Promise.resolve([]);
}

export function createReferralLink(data: any): Promise<any> {
  return Promise.resolve({ id: `ref_${Date.now()}`, ...data });
}

export function joinByReferral(token: string): Promise<any> {
  return Promise.resolve({ success: true, token });
}

export function ensureReferralRelation(partnerId: string): Promise<any> {
  return Promise.resolve({ relation: 'active' });
}

export function getPartnerInfo(partnerId: string): Promise<any> {
  return Promise.resolve({ id: partnerId, name: `Partner ${partnerId}` });
}

export function listPartnerShipments(partnerId: string): Promise<any[]> {
  return Promise.resolve([]);
}

export function fetchPartners(): Promise<any[]> {
  return Promise.resolve([]);
}

export function searchPartners(query: string): Promise<any[]> {
  return Promise.resolve([]);
}
// Force update Thu Oct 16 09:23:07 MSK 2025
