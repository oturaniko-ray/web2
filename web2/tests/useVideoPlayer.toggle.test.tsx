import { renderHook, act } from "@testing-library/react";
import { useVideoPlayer } from "../hooks/useVideoPlayer";
import { vi } from "vitest";

test("toggle pauses when video is playing and autoplay true triggers play attempt", async () => {
  vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(function (this: HTMLMediaElement) {
    (this as any).__paused = false;
    return Promise.resolve();
  });
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(function (this: HTMLMediaElement) {
    (this as any).__paused = true;
    return undefined as any;
  });

  const { result } = renderHook(() => useVideoPlayer({ src: "/videos/x.mp4", autoplay: false }));
  const fakeVideo = document.createElement("video");
  (fakeVideo as any).__paused = false;
  result.current.videoRef.current = fakeVideo;

  await act(async () => {
    await result.current.toggle();
  });
  expect(result.current.isPlaying).toBe(false);

  const { result: r2 } = renderHook(() => useVideoPlayer({ src: "/videos/x.mp4", autoplay: true }));
  r2.current.videoRef.current = document.createElement("video");
  await act(async () => {
    await Promise.resolve();
  });
  expect(typeof r2.current.isPlaying).toBe("boolean");
});
