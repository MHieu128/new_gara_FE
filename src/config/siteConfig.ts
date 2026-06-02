import type { SiteSettings } from '@/domain/common';

export interface RuntimeSiteConfig extends SiteSettings {
  brandName: string;
  description: string;
  logoUrl: string;
  faviconUrl: string;
  primaryColor: string;
  accentColor: string;
  defaultProvince: string;
  googleMapUrl: string;
  socials: {
    facebook: string;
    youtube: string;
    tiktok: string;
  };
  seo: SiteSettings['seo'] & {
    siteBaseUrl: string;
    defaultTitle: string;
    defaultDescription: string;
    defaultOgImage: string;
  };
  api: {
    baseUrl: string;
  };
}

let cachedConfig: RuntimeSiteConfig | null = null;
let pendingConfig: Promise<RuntimeSiteConfig> | null = null;

const fallbackConfig: RuntimeSiteConfig = {
  siteName: 'Garage Pro',
  brandName: 'Garage Pro',
  tagline: 'Chăm sóc, sửa chữa và nâng cấp ô tô chuyên nghiệp',
  description: 'Hệ thống gara ô tô chuyên nghiệp.',
  logoUrl: '/images/logo.svg',
  faviconUrl: '/favicon.svg',
  primaryColor: '#0f172a',
  accentColor: '#f97316',
  hotline: '0900000000',
  hotlines: ['0900000000'],
  zaloUrl: 'https://zalo.me/0900000000',
  messengerUrl: 'https://m.me/example',
  email: 'contact@example.com',
  address: 'Địa chỉ gara',
  defaultProvince: 'Đà Nẵng',
  googleMapUrl: 'https://maps.google.com',
  socials: { facebook: '', youtube: '', tiktok: '' },
  seo: {
    title: 'Garage Pro - Dịch vụ ô tô chuyên nghiệp',
    description: 'Dịch vụ sửa chữa, bảo dưỡng, nâng cấp và chăm sóc ô tô chuyên nghiệp.',
    siteBaseUrl: 'http://localhost:5173',
    defaultTitle: 'Garage Pro - Dịch vụ ô tô chuyên nghiệp',
    defaultDescription: 'Dịch vụ sửa chữa, bảo dưỡng, nâng cấp và chăm sóc ô tô chuyên nghiệp.',
    defaultOgImage: '/images/og-default.webp',
  },
  api: { baseUrl: 'http://localhost:5234' },
};

export async function loadSiteConfig(): Promise<RuntimeSiteConfig> {
  if (cachedConfig) return cachedConfig;
  if (pendingConfig) return pendingConfig;

  pendingConfig = fetch('/site-config.json')
    .then((response) => (response.ok ? response.json() : fallbackConfig))
    .then((config) => {
      cachedConfig = normalizeConfig(config as Partial<RuntimeSiteConfig>);
      applyBrandConfig(cachedConfig);
      return cachedConfig;
    })
    .catch(() => {
      cachedConfig = fallbackConfig;
      applyBrandConfig(cachedConfig);
      return cachedConfig;
    });

  return pendingConfig;
}

export async function getApiBaseUrl(): Promise<string> {
  const envBaseUrl = import.meta.env.VITE_API_BASE_URL;
  if (envBaseUrl) return envBaseUrl;

  const config = await loadSiteConfig();
  return config.api?.baseUrl || fallbackConfig.api.baseUrl;
}

function normalizeConfig(config: Partial<RuntimeSiteConfig>): RuntimeSiteConfig {
  return {
    ...fallbackConfig,
    ...config,
    hotlines: config.hotlines?.length ? config.hotlines : config.hotline ? [config.hotline] : fallbackConfig.hotlines,
    socials: { ...fallbackConfig.socials, ...config.socials },
    seo: { ...fallbackConfig.seo, ...config.seo },
    api: { ...fallbackConfig.api, ...config.api },
  };
}

function applyBrandConfig(config: RuntimeSiteConfig) {
  document.documentElement.style.setProperty('--garage-primary', config.primaryColor);
  document.documentElement.style.setProperty('--garage-accent', config.accentColor);
  document.title = config.seo.defaultTitle;

  const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
  if (favicon && config.faviconUrl) {
    favicon.href = config.faviconUrl;
  }
}
