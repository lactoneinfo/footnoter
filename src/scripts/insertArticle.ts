import { db } from '@/db';
import { articles } from '../schema';
import matter from 'gray-matter';
import fs from 'node:fs';
import path from 'node:path';
import type { Article } from '@/types';

async function insertArticle(slug: string) {
  const filePath = path.join(process.cwd(), 'public/articles', `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  
  const { data, content } = matter(fileContents);
  const frontMatter = data as Omit<Article, 'id' | 'content' | 'slug'>;

  await db.insert(articles).values({
    slug,
    title: frontMatter.title,
    publishedAt: frontMatter.publishedAt,
    updatedAt: frontMatter.updatedAt,
    authorName: frontMatter.authorName,
    authorIconUrl: frontMatter.authorIconUrl || '',
    thumbnailUrl: frontMatter.thumbnailUrl || '',
    starCount: frontMatter.starCount || 0,
    content: content,
  }).run();
}


async function run() {
  try {
    await insertArticle('test');
    console.log('Article inserted successfully');
  } catch (error) {
    console.error('Error inserting article:', error);
  }
}

run();