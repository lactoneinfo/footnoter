export const runtime = 'edge';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import { ShareButton } from '@/components/Buttons';
import { BookmarkButton } from '@/components/Buttons';
import { StarButton } from '@/components/Buttons';
import type { Article, ArticleFrontMatter } from '@/types';

interface Params {
  slug: string;
}

interface ArticleProps {
  params: Params;
}

export default async function Article({ params }: ArticleProps) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'public/articles', `${slug}.md`);

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const frontMatter = data as ArticleFrontMatter;
  const title = frontMatter.title;
  const publishedAt = frontMatter.publishedAt;
  const updatedAt = frontMatter.updatedAt;
  const author = frontMatter.authorName;
  const thumbnailUrl = frontMatter.thumbnailUrl;

  const processedContent = await unified().use(remarkParse).use(remarkHtml).process(content);
  const contentHtml = processedContent.toString();

  return (
    <div className="container mx-auto flex-1 px-4 py-8">
      <div className="flex justify-end space-x-4 mb-4">
        <StarButton />
        <BookmarkButton />
        <ShareButton />
      </div>

      {/* サムネイル */}
      {thumbnailUrl && (
        <div className="mb-6">
          {/* <Image
            src={thumbnailUrl}
            alt="Article Thumbnail"
            width={800}
            height={400}
            className="w-full h-auto object-cover"
          /> */}
        </div>
      )}

      {/* 記事タイトル */}
      <h1 className="text-4xl font-bold text-gray-900 mb-2">{title}</h1>

      {/* 公開日時 / 更新日時 */}
      <div className="text-sm text-gray-500 mb-6">
        公開: {publishedAt} | 更新: {updatedAt}
      </div>

      {/* 著者アイコン / ユーザー名 (右寄せ) */}
      <div className="flex justify-end items-center space-x-2 mb-8">
        {/* {author.iconUrl && (
          <Image
            src={author.iconUrl}
            alt={author.name}
            width={40}
            height={40}
            className="rounded-full"
          />
        )} */}
        <span className="text-gray-700">{author}</span>
      </div>

      {/* 記事本文 */}
      <article
        className="prose lg:prose-xl max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      <div className="flex justify-end space-x-4 mt-8">
        <StarButton />
        <BookmarkButton />
        <ShareButton />
      </div>
    </div>
  );
}