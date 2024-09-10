import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  userId: integer("userId", { mode: "number" })
    .primaryKey({ autoIncrement: true })
    .notNull(),
  userName: text("userName").notNull(),
});

export const articles = sqliteTable("articles", {
  id: integer("id", { mode: "number" })
    .primaryKey({ autoIncrement: true })
    .notNull(),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  publishedAt: text("publishedAt").notNull(),
  updatedAt: text("updatedAt").notNull(),
  authorName: text("authorName").notNull(),
  authorIconUrl: text("authorIconUrl").default(''),  // オプショナル
  thumbnailUrl: text("thumbnailUrl").default(''),    // オプショナル
  starCount: integer("starCount").default(0),
  content: text("content").notNull(),  // Markdownの本文を保存
});
