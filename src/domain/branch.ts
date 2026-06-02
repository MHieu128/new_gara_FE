export interface Branch {
  id: string;
  slug: string;
  name: string;
  province: string;
  district?: string;
  address: string;
  phoneNumbers: string[];
  email?: string;
  latitude?: number;
  longitude?: number;
  googleMapUrl?: string;
  openingHours?: string;
  services: string[];
  isActive: boolean;
}

export interface BranchQuery {
  province?: string;
  serviceId?: string;
}
