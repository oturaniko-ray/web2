// tests/videos.service.test.ts
import { describe, it, expect } from "vitest";
import { getAllVideos, getVideoBySlug } from "../lib/videos/service";

describe("videos service", () => {
  it("loads all videos and returns an array", async () => {
    const videos = await getAllVideos();
    expect(Array.isArray(videos)).toBe(true);
    for (const v of videos) {
      expect(typeof v.slug).toBe("string");
      expect(typeof v.title).toBe("string");
      expect(typeof v.file).toBe("string");
    }
  });

  it("getVideoBySlug returns null for unknown slug", async () => {
    const v = await getVideoBySlug("slug-that-does-not-exist-xyz");
    expect(v).toBeNull();
  });

  it("getVideoBySlug returns video with src prioritized", async () => {
    const videos = await getAllVideos();
    if (videos.length === 0) return;
    const sample = videos[0];
    const found = await getVideoBySlug(sample.slug);
    expect(found).not.toBeNull();
    if (found) {
      expect(typeof found.src).toBe("string");
      expect(found.src.length).toBeGreaterThan(0);
    }
  });
});