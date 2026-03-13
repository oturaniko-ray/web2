import { render, screen } from '@testing-library/react';
import VideosPageTestComponent from './fixtures/VideosPageTestComponent';
import type { Video } from '../lib/videos/schema';

const mockVideos: Video[] = [
  {
    file: 'delivery-urban.mp4',
    src: '/videos/delivery-urban.mp4',
    slug: 'delivery-urban',
    title: 'Delivery Urban',
    poster: '/posters/delivery-urban.jpg',
    thumbs: [],
    description: 'Entrega urbana',
    subtitles: '/subtitles/delivery-urban.vtt'
  },
  {
    file: 'logistics-hero.mp4',
    src: '/videos/logistics-hero.mp4',
    slug: 'logistics-hero',
    title: 'Logistics Hero',
    poster: '/posters/logistics-hero.jpg',
    thumbs: [],
    description: 'Camiones en carretera',
    subtitles: null
  }
];

describe('VideosPage (fixture)', () => {
  it('renders list header and cards count', () => {
    render(<VideosPageTestComponent videos={mockVideos} />);
    expect(screen.getByText('Catálogo de vídeos')).toBeInTheDocument();
    expect(screen.getByText(/2 resultados/)).toBeInTheDocument();
    expect(screen.getByText('Delivery Urban')).toBeInTheDocument();
    expect(screen.getByText('Logistics Hero')).toBeInTheDocument();
  });
});
