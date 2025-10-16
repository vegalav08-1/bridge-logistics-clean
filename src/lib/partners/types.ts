export interface Client {
  id: string;
  name: string;
  email: string;
  joinedAt: string; // ISO date string
  joinedAtISO: string; // ISO date string for compatibility
  status: 'active' | 'inactive' | 'pending';
  totalShipments: number;
  lastActivity: string; // ISO date string
}

export interface ClientSummary {
  id: string;
  name: string;
  email: string;
  joinedAt: string; // ISO date string
  joinedAtISO: string; // ISO date string for compatibility
  shipments: number;
  unread: number;
  debt: number;
}