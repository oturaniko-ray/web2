// tests/VideoPlayerClient.accessibility.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import VideoPlayerClient from "../components/VideoPlayerClient";

describe("VideoPlayerClient accessibility", () => {
  it("renders video with aria-label and control button with aria-pressed", () => {
    render(<VideoPlayerClient src="/videos/delivery-urban.mp4" title="Delivery Urban" />);
    const video = screen.getByLabelText("Delivery Urban");
    expect(video).toBeInTheDocument();
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("aria-pressed");
  });
});