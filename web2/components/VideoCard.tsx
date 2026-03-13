// components/VideoCard.tsx
import Image from "next/image";
import type { Video } from "../lib/videos/schema";

interface Props {
  video: Video;
}

/**
 * Server Component: VideoCard
 * - Usa next/image para optimizar posters
 * - No contiene lógica cliente
 */
export default function VideoCard({ video }: Props) {
  // Proporcionar dimensiones para evitar CLS
  const posterWidth = 640;
  const posterHeight = 360;

  return (
    <article
      aria-labelledby={`title-${video.slug}`}
      style={{
        borderRadius: 8,
        overflow: "hidden",
        background: "#0a0a0f",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}
    >
      <div style={{ position: "relative", width: "100%", aspectRatio: `${posterWidth}/${posterHeight}`, background: "#000" }}>
        <Image
          src={video.poster}
          alt={video.title}
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          style={{ objectFit: "cover" }}
          priority={false}
        />
      </div>

      <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
        <h3 id={`title-${video.slug}`} style={{ margin: 0, fontSize: 16 }}>{video.title}</h3>
        {video.description && <p style={{ margin: 0, color: "#cbd5e1", fontSize: 14 }}>{video.description}</p>}
        <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, color: "#9ca3af" }}>{video.slug}</span>
          <span style={{ fontSize: 13, color: "#00F0FF" }}>Ver</span>
        </div>
      </div>
    </article>
  );
}