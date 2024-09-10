import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BookmarkButton, StarButton } from '@/components/Buttons';
import Image from 'next/image';
import { ArticleFrontMatter } from '@/types';

export default function Home() {
  const articlesDirectory = path.join(process.cwd(), 'public/articles');
  const fileNames = fs.readdirSync(articlesDirectory);
  const articles = fileNames.map((fileName) => {
    const filePath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    return data as ArticleFrontMatter;
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Home</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {articles.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
}

interface ArticleCardProps {
  article: ArticleFrontMatter;
}

function ArticleCard({ article }: ArticleCardProps) {
  const { title, authorName, thumbnailUrl, starCount } = article;

  return (
    <div className="border rounded-lg shadow-md p-4 flex flex-col">
      {thumbnailUrl && (
        <Image
          src={thumbnailUrl}
          alt={title}
          width={400}
          height={200}
          className="w-full h-auto object-cover mb-4"
        />
      )}

      {/* 記事タイトル */}
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>

      {/* 著者情報 */}
      <div className="flex items-center mb-4">
        {/* 著者アイコン */}
        {/* {author.iconUrl && (
          <Image
            src={author.iconUrl}
            alt={author.name}
            width={40}
            height={40}
            className="rounded-full mr-2"
          />
        )} */}
        <span>{authorName}</span>
      </div>

      {/* ボタンとStar数 */}
      <div className="flex justify-between items-center mt-auto">
        <BookmarkButton />
        <div className="flex items-center space-x-1">
          <StarButton />
          <span>{starCount}</span>
        </div>
      </div>
    </div>
  );
}
