export interface Article {
  id: number;
  slug: string;
  title: string;
  publishedAt: string;
  updatedAt: string;
  authorName: string;
  authorIconUrl?: string;
  thumbnailUrl?: string;
  starCount: number;
  content: string;
}

export type ArticleFrontMatter = Omit<Article, 'id' | 'content' | 'slug'>;