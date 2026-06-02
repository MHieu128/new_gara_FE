import { deleteJson, getJson, patchJson, postJson, putJson } from '@/repositories/apiClient';

export type AdminRecord = Record<string, unknown> & { id: string };

export interface Dashboard {
  totalProducts: number;
  totalServices: number;
  totalBranches: number;
  totalArticles: number;
  totalLeads: number;
  newLeads: number;
  bookingsToday: number;
  pendingBookings: number;
  activeJobCards: number;
  draftOrSentQuotations: number;
  unpaidInvoices: number;
  activeUsers: number;
}

const resourcePaths = {
  products: '/api/admin/products',
  services: '/api/admin/services',
  branches: '/api/admin/branches',
  articles: '/api/admin/articles',
  users: '/api/admin/users',
  leads: '/api/admin/leads',
  bookings: '/api/admin/bookings',
  customers: '/api/admin/customers',
  vehicles: '/api/admin/vehicles',
  quotations: '/api/admin/quotations',
  jobCards: '/api/admin/job-cards',
  invoices: '/api/admin/invoices',
  warranties: '/api/admin/warranties',
  productCategories: '/api/admin/product-categories',
  serviceCategories: '/api/admin/service-categories',
} as const;

export type AdminResource = keyof typeof resourcePaths;

export function getDashboard(): Promise<Dashboard> {
  return getJson<Dashboard>('/api/admin/dashboard');
}

export function listResource(resource: AdminResource): Promise<AdminRecord[]> {
  return getJson<AdminRecord[]>(resourcePaths[resource]);
}

export function createResource(resource: Exclude<AdminResource, 'leads'>, payload: Record<string, unknown>): Promise<AdminRecord> {
  return postJson<AdminRecord>(resourcePaths[resource], payload);
}

export function updateResource(resource: Exclude<AdminResource, 'leads'>, id: string, payload: Record<string, unknown>): Promise<AdminRecord> {
  return putJson<AdminRecord>(`${resourcePaths[resource]}/${id}`, payload);
}

export function deleteResource(resource: Exclude<AdminResource, 'leads'>, id: string): Promise<void> {
  return deleteJson<void>(`${resourcePaths[resource]}/${id}`);
}

export function updateLeadStatus(id: string, status: string): Promise<AdminRecord> {
  return patchJson<AdminRecord>(`${resourcePaths.leads}/${id}/status`, { status });
}

export function assignLead(id: string, branchId: string): Promise<AdminRecord> {
  return patchJson<AdminRecord>(`${resourcePaths.leads}/${id}/assign`, { branchId });
}
