import React from "react";
import { render, screen } from "@testing-library/react";
import VideoPlayerClient from "../components/VideoPlayerClient";

test("renders video with default aria-label when title is missing and handles missing poster", () => {
  render(<VideoPlayerClient src="/videos/no-title.mp4" />);
  const video = screen.getByLabelText("video player") as HTMLVideoElement;
  expect(video).toBeInTheDocument();
  expect(video).not.toHaveAttribute("poster");
  const source = video.querySelector("source");
  expect(source).toHaveAttribute("src", "/videos/no-title.mp4");
});
