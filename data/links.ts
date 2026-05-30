import { db } from '@/db';
import { links } from '@/db/schema';
import { and, desc, eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export async function getLinksByUserId(userId: string) {
  return db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.updatedAt));
}

export async function createLink(userId: string, url: string) {
  const shortCode = nanoid(8);
  const [link] = await db
    .insert(links)
    .values({ userId, url, shortCode })
    .returning();
  return link;
}

export async function updateLink(id: number, userId: string, url: string) {
  const [link] = await db
    .update(links)
    .set({ url, updatedAt: new Date() })
    .where(and(eq(links.id, id), eq(links.userId, userId)))
    .returning();
  return link;
}

export async function deleteLink(id: number, userId: string) {
  await db
    .delete(links)
    .where(and(eq(links.id, id), eq(links.userId, userId)));
}

export async function getLinkByShortCode(shortCode: string) {
  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);
  return link ?? null;
}
