// tests/VideoCard.test.tsx
import { render, screen } from "@testing-library/react";
import VideoCard from "../components/VideoCard";
import type { Video } from "../lib/videos/schema";

const sample: Video = {
  file: "delivery-urban.mp4",
  src: "/videos/delivery-urban.mp4",
  slug: "delivery-urban",
  title: "Delivery Urban",
  poster: "/posters/delivery-urban.jpg",
  thumbs: ["/thumbs/delivery-urban-1.jpg"],
  description: "Entrega urbana",
  subtitles: "/subtitles/delivery-urban.vtt"
};

describe("VideoCard", () => {
  it("renders title, poster and link text", () => {
    render(<VideoCard video={sample} />);
    // Title
    expect(screen.getByText("Delivery Urban")).toBeInTheDocument();
    // Slug visible
    expect(screen.getByText("delivery-urban")).toBeInTheDocument();
    // "Ver" label present
    expect(screen.getByText("Ver")).toBeInTheDocument();
    // Image alt attribute (next/image renders an img in tests)
    const img = screen.getByAltText("Delivery Urban");
    expect(img).toBeInTheDocument();
  });
});