export type PriceLabel = 'fixed' | 'from' | 'contact';

export interface SeoMetadata {
  title: string;
  description: string;
}

export interface CompatibleVehicle {
  brand: string;
  model?: string;
  yearFrom?: number;
  yearTo?: number;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  hotline: string;
  hotlines?: string[];
  zaloUrl: string;
  messengerUrl: string;
  email: string;
  address: string;
  seo: SeoMetadata;
}
