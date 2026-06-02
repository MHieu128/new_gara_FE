import type { Article, ArticleQuery } from '@/domain/article';
import { getJson, type PagedResponse } from '@/repositories/apiClient';

const defaultPageSize = 100;

export async function getArticles(query: ArticleQuery = {}): Promise<Article[]> {
  const response = await getJson<PagedResponse<Article>>('/api/public/articles', {
    category: query.category,
    tag: query.tag,
    keyword: query.keyword,
    featuredOnly: query.featuredOnly,
    page: 1,
    pageSize: defaultPageSize,
  });

  return response.items;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    return await getJson<Article>(`/api/public/articles/${encodeURIComponent(slug)}`);
  } catch {
    return null;
  }
}
