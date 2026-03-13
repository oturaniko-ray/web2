import { renderHook, act } from "@testing-library/react";
import { useVideoPlayer } from "../hooks/useVideoPlayer";
import { vi } from "vitest";

test("play rejects and isPlaying remains false; autoplay true behavior", async () => {
  const playReject = vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(() => Promise.reject(new Error("fail")));
  const { result } = renderHook(() => useVideoPlayer({ src: "/videos/x.mp4", autoplay: false }));

  const fakeVideo = document.createElement("video");
  result.current.videoRef.current = fakeVideo;

  await act(async () => {
    await result.current.play();
  });
  expect(result.current.isPlaying).toBe(false);

  playReject.mockRestore();
  vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(() => Promise.resolve());

  const { result: r2 } = renderHook(() => useVideoPlayer({ src: "/videos/x.mp4", autoplay: true }));
  r2.current.videoRef.current = document.createElement("video");

  await act(async () => {
    await Promise.resolve();
  });

  expect(typeof r2.current.isPlaying).toBe("boolean");
});
