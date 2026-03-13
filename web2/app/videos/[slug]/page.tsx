// app/videos/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getVideoBySlug } from "../../../lib/videos/service";
import VideoPlayerClient from "../../../components/VideoPlayerClient";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const video = await getVideoBySlug(params.slug);
  if (!video) return { title: "Video not found" };
  return {
    title: video.title,
    description: video.description ?? undefined,
    openGraph: {
      title: video.title,
      description: video.description ?? undefined,
      images: video.poster
    }
  };
}

export default async function Page({ params }: Props) {
  const { slug } = params;
  const video = await getVideoBySlug(slug);

  if (!video) {
    notFound();
  }

  const playerProps = {
    src: video.src,
    poster: video.poster,
    subtitles: video.subtitles ?? undefined,
    title: video.title
  };

  return (
    <main style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
      <header style={{ marginBottom: 12 }}>
        <h1 style={{ margin: 0 }}>{video.title}</h1>
        {video.description && <p style={{ color: "#666" }}>{video.description}</p>}
      </header>

      <section>
        <div style={{ borderRadius: 8, overflow: "hidden", background: "#000" }}>
          <VideoPlayerClient {...playerProps} />
        </div>
      </section>

      <section style={{ marginTop: 16 }}>
        <h2 style={{ fontSize: 16 }}>Detalles</h2>
        <dl>
          <dt>Slug</dt>
          <dd>{video.slug}</dd>
          <dt>Archivo</dt>
          <dd>{video.file}</dd>
          <dt>Fuente</dt>
          <dd>{video.src}</dd>
        </dl>
      </section>
    </main>
  );
}