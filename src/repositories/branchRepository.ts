import branches from '@/data/branches.json';
import type { Branch, BranchQuery } from '@/domain/branch';

export async function getBranches(query: BranchQuery = {}): Promise<Branch[]> {
  return (branches as unknown as Branch[])
    .filter((branch) => branch.isActive)
    .filter((branch) => !query.province || branch.province === query.province)
    .filter((branch) => !query.serviceId || branch.services.includes(query.serviceId));
}

export async function getBranchBySlug(slug: string): Promise<Branch | null> {
  return (branches as unknown as Branch[]).find((branch) => branch.slug === slug && branch.isActive) ?? null;
}

export async function getBranchesByProvince(province: string): Promise<Branch[]> {
  return getBranches({ province });
}
