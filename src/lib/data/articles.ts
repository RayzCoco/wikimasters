import { eq } from "drizzle-orm";
import redis from "@/cache";
import db from "@/db/index";
import { articles, usersSync } from "@/db/schema";

export type ArticleList = {
  id: number;
  title: string;
  createdAt: string;
  summary: string | null;
  content: string;
  author: string | null;
  imageUrl?: string | null;
};

export async function getArticles() {
  const cached = await redis.get<ArticleList[]>("articles:all");
  if (cached) {
    console.log("get articles cache hit");
    return cached;
  }

  console.log("Get articles cache miss");

  const response = await db
    .select({
      title: articles.title,
      id: articles.id,
      createdAt: articles.createdAt,
      content: articles.content,
      author: usersSync.name,
    })
    .from(articles)
    .leftJoin(usersSync, eq(articles.authorId, usersSync.id));

  try {
    redis.set("articles:all", response, {
      ex: 60,
    });
  } catch (err) {
    console.warn("Failed to set articles cache", err);
  }

  return response as unknown as ArticleList[];
}

export async function getArticleById(id: number) {
  const response = await db
    .select({
      title: articles.title,
      id: articles.id,
      createdAt: articles.createdAt,
      content: articles.content,
      author: usersSync.name,
      imageUrl: articles.imageUrl,
    })
    .from(articles)
    .where(eq(articles.id, id))
    .leftJoin(usersSync, eq(articles.authorId, usersSync.id));
  return response[0] ? response[0] : null;
}
