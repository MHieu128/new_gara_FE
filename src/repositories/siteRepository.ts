import siteSettings from '@/data/site-settings.json';
import type { SiteSettings } from '@/domain/common';

export async function getSiteSettings(): Promise<SiteSettings> {
  return siteSettings as unknown as SiteSettings;
}
