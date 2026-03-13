// lib/videos/schema.ts
import { z } from "zod";

/**
 * Video metadata schema
 * - Tipos explícitos
 * - Validación runtime con Zod
 */
export const videoSchema = z.object({
  file: z.string().min(1),
  src: z.string().url().optional().or(z.literal("")).transform(v => (v === "" ? undefined : v)).optional(),
  slug: z.string().min(1),
  title: z.string().min(1),
  poster: z.string().min(1),
  thumbs: z.array(z.string()).optional().default([]),
  description: z.string().optional().nullable(),
  subtitles: z.string().optional().nullable()
});

export const videosSchema = z.array(videoSchema);

export type Video = z.infer<typeof videoSchema>;
export type Videos = z.infer<typeof videosSchema>;