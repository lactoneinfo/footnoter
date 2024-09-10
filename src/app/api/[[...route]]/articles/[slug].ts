import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { articles } from '@/schema';
import { eq } from 'drizzle-orm';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const article = await db.select()
    .from(articles)
    .where(eq(articles.slug, slug))
    .get();

  if (!article) {
    return NextResponse.json({ message: 'Article not found' }, { status: 404 });
  }

  return NextResponse.json(article);
}
