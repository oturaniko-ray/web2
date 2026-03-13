// lib/videos/service.ts
import fs from "fs/promises";
import path from "path";
import { videoSchema, videosSchema, type Video } from "./schema";
import { existsSync } from "fs";

/**
 * Service to read and validate public/data/videos.json
 * - Validación Zod
 * - Cache en memoria (TTL)
 * - Funciones tipadas: getAllVideos, getVideoBySlug
 */

let cache: { ts: number; data: Video[] } | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutos

async function readRawJson(): Promise<unknown> {
  const dataPath = path.join(process.cwd(), "public", "data", "videos.json");
  const raw = await fs.readFile(dataPath, "utf8");
  try {
    return JSON.parse(raw);
  } catch (err) {
    throw new Error("Invalid JSON in public/data/videos.json");
  }
}

function normalizeVideo(v: Video): Video {
  const poster = v.poster.startsWith("/") ? v.poster : `/${v.poster}`;
  const thumbs = (v.thumbs || []).map(t => (t.startsWith("/") ? t : `/${t}`));
  const subtitles = v.subtitles ? (v.subtitles.startsWith("/") ? v.subtitles : `/${v.subtitles}`) : undefined;
  return { ...v, poster, thumbs, subtitles };
}

export async function getAllVideos(): Promise<Video[]> {
  const now = Date.now();
  if (cache && now - cache.ts < CACHE_TTL_MS) {
    return cache.data;
  }

  const raw = await readRawJson();
  const parsed = videosSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(`videos.json validation error: ${parsed.error.message}`);
  }

  const normalized = parsed.data.map(normalizeVideo);
  cache = { ts: now, data: normalized };
  return normalized;
}

export async function getVideoBySlug(slug: string): Promise<(Video & { src: string }) | null> {
  const videos = await getAllVideos();
  const found = videos.find(v => v.slug === slug) ?? null;
  if (!found) return null;

  const effectiveSrc = found.src && found.src.length > 0 ? found.src : `/videos/${found.file}`;

  if (process.env.NODE_ENV !== "production") {
    const posterPath = path.join(process.cwd(), "public", found.poster.replace(/^\//, ""));
    if (!existsSync(posterPath)) {
      // eslint-disable-next-line no-console
      console.warn(`Poster not found for ${slug} at ${posterPath}`);
    }
    if (found.subtitles) {
      const subPath = path.join(process.cwd(), "public", found.subtitles.replace(/^\//, ""));
      if (!existsSync(subPath)) {
        // eslint-disable-next-line no-console
        console.warn(`Subtitles file not found for ${slug} at ${subPath}`);
      }
    }
  }

  return { ...found, src: effectiveSrc };
}