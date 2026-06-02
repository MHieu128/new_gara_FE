import articles from '@/data/articles.json';
import type { Article, ArticleQuery } from '@/domain/article';

export async function getArticles(query: ArticleQuery = {}): Promise<Article[]> {
  const keyword = query.keyword?.trim().toLowerCase();

  return (articles as unknown as Article[])
    .filter((article) => article.isPublished)
    .filter((article) => !query.featuredOnly || article.isFeatured)
    .filter((article) => !query.category || article.category === query.category)
    .filter((article) => !query.tag || article.tags.includes(query.tag))
    .filter((article) => {
      if (!keyword) return true;
      return [article.title, article.excerpt, article.content, article.category, ...article.tags]
        .join(' ')
        .toLowerCase()
        .includes(keyword);
    })
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return (articles as unknown as Article[]).find((article) => article.slug === slug && article.isPublished) ?? null;
}
