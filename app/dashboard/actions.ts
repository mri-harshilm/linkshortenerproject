"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createLink, updateLink, deleteLink } from "@/data/links";
import { revalidatePath } from "next/cache";

const createLinkSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL." }),
});

export async function createLinkAction(input: { url: string }) {
  const { userId } = await auth();
  if (!userId) {
    return { error: "You must be signed in to create a link." };
  }

  const parsed = createLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    const link = await createLink(userId, parsed.data.url);
    revalidatePath("/dashboard");
    return { success: link };
  } catch {
    return { error: "Failed to create link. Please try again." };
  }
}

const updateLinkSchema = z.object({
  id: z.number().int().positive(),
  url: z.string().url({ message: "Please enter a valid URL." }),
});

export async function updateLinkAction(input: { id: number; url: string }) {
  const { userId } = await auth();
  if (!userId) {
    return { error: "You must be signed in." };
  }

  const parsed = updateLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    const link = await updateLink(parsed.data.id, userId, parsed.data.url);
    revalidatePath("/dashboard");
    return { success: link };
  } catch {
    return { error: "Failed to update link. Please try again." };
  }
}

const deleteLinkSchema = z.object({
  id: z.number().int().positive(),
});

export async function deleteLinkAction(input: { id: number }) {
  const { userId } = await auth();
  if (!userId) {
    return { error: "You must be signed in." };
  }

  const parsed = deleteLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    await deleteLink(parsed.data.id, userId);
    revalidatePath("/dashboard");
    return { success: true };
  } catch {
    return { error: "Failed to delete link. Please try again." };
  }
}
