export type SOSCategory = 'medical' | 'accident' | 'security' | 'other';
export type SOSStatus = 'active' | 'acknowledged' | 'resolved';

export interface SOSAlert {
  id: string;
  userId: string;
  userName: string;
  userPhone?: string;
  category: SOSCategory;
  note?: string;
  lat: number;
  lng: number;
  area: string;
  status: SOSStatus;
  createdAt: string;
  updatedAt: string;
}

export interface NewSOSInput {
  category: SOSCategory;
  note?: string;
  lat: number;
  lng: number;
  area: string;
}
