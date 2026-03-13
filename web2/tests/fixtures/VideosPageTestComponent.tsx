import React from 'react';
import VideoCard from '../../components/VideoCard';
import type { Video } from '../../lib/videos/schema';

/**
 * Componente de prueba que replica la UI del listado sin dependencias Next específicas.
 * Usar solo en tests para evitar importar app/videos/page.tsx directamente.
 */
export default function VideosPageTestComponent({ videos }: { videos: Video[] }) {
  if (!videos || videos.length === 0) {
    return (
      <main style={{ padding: 24, maxWidth: 1100, margin: '0 auto' }}>
        <h1>Videos</h1>
        <p>No hay vídeos disponibles.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 24, maxWidth: 1100, margin: '0 auto' }}>
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0 }}>Catálogo de vídeos</h1>
        <p style={{ color: '#666' }}>{videos.length} resultados</p>
      </header>

      <section
        aria-label="Listado de vídeos"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 16
        }}
      >
        {videos.map((video) => (
          <div key={video.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
            <VideoCard video={video} />
          </div>
        ))}
      </section>
    </main>
  );
}
