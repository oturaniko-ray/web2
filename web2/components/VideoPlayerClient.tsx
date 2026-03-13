// components/VideoPlayerClient.tsx
import React from "react";
import { useVideoPlayer } from "../hooks/useVideoPlayer";

type Props = {
  src: string;
  poster?: string;
  title?: string;
};

export default function VideoPlayerClient({ src, poster, title }: Props) {
  const { videoRef, isPlaying, toggle } = useVideoPlayer({ src, poster, autoplay: false });

  return (
    <div>
      <div>
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          aria-label={title ?? "video player"}
          style={{ width: "100%", height: "auto", display: "block", background: "#000" }}
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>

      <div style={{ marginTop: 8, display: "flex", gap: 8, alignItems: "center" }}>
        <button
          aria-pressed={isPlaying}
          onClick={() => void toggle()}
          style={{ padding: "8px 12px", borderRadius: 6 }}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>

        <a href={src} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
          Ver
        </a>
      </div>
    </div>
  );
}