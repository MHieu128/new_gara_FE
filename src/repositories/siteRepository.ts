import type { SiteSettings } from '@/domain/common';
import { getJson } from '@/repositories/apiClient';

export async function getSiteSettings(): Promise<SiteSettings> {
  return getJson<SiteSettings>('/api/public/site-settings');
}
