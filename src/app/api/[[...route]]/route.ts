import { D1Database } from '@cloudflare/workers-types';
import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { drizzle } from "drizzle-orm/d1";
import { users } from "../../../schema";

export const runtime = 'edge';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB: D1Database;
    }
  }
}

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings}>().basePath('/api')

app.get("/users", async (c) => {
  const db = drizzle(process.env.DB);
  const result = await db.select().from(users).all();
  return c.json(result);
});

app.post("/users", async (c) => {
  const params = await c.req.json<typeof users.$inferSelect>();
  const db = drizzle(process.env.DB);
  const result = await db
    .insert(users)
    .values({
      userName: params.userName,
    })
    .execute();
  return c.json(result);
});

export const GET = handle(app);
export const POST = handle(app);