// hooks/useVideoPlayer.ts
import { useCallback, useEffect, useRef, useState } from "react";

export type UseVideoPlayerOptions = {
  src?: string;
  poster?: string;
  autoplay?: boolean;
};

export function useVideoPlayer({ src, poster, autoplay }: UseVideoPlayerOptions = {}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(!!autoplay);

  const play = useCallback(async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      await v.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, []);

  const pause = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(async () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      await play();
    } else {
      pause();
    }
  }, [play, pause]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const handleEnded = () => setIsPlaying(false);
    v.addEventListener("ended", handleEnded);
    return () => {
      v.removeEventListener("ended", handleEnded);
    };
  }, []);

  return {
    videoRef,
    isPlaying,
    play,
    pause,
    toggle,
    src,
    poster,
  } as const;
}