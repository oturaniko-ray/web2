// app/videos/page.tsx
import React from 'react';
import Link from 'next/link';

export default function VideosPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Videos</h1>
      <p>Listado de videos disponibles.</p>

      <ul>
        <li>
          <Link href="/videos">
            <a>Ver todos los videos</a>
          </Link>
        </li>
      </ul>
    </main>
  );
}