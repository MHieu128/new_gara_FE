import type { SiteSettings } from '@/domain/common';
import { loadSiteConfig } from '@/config/siteConfig';

export async function getSiteSettings(): Promise<SiteSettings> {
  return loadSiteConfig();
}
