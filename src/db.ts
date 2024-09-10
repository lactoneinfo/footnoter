import { D1Database } from '@cloudflare/workers-types';
import { drizzle } from 'drizzle-orm/d1';

declare const DB: D1Database; 

export const db = drizzle(DB);
