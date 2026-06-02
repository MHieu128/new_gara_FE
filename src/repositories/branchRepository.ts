import type { Branch, BranchQuery } from '@/domain/branch';
import { getJson } from '@/repositories/apiClient';

export async function getBranches(query: BranchQuery = {}): Promise<Branch[]> {
  const branches = await getJson<Branch[]>('/api/public/branches', {
    province: query.province,
  });

  return query.serviceId ? branches.filter((branch) => branch.services.includes(query.serviceId!)) : branches;
}

export async function getBranchBySlug(slug: string): Promise<Branch | null> {
  try {
    return await getJson<Branch>(`/api/public/branches/${encodeURIComponent(slug)}`);
  } catch {
    return null;
  }
}

export async function getBranchesByProvince(province: string): Promise<Branch[]> {
  return getBranches({ province });
}
