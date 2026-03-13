import React from "react";
import { render, screen } from "@testing-library/react";
import VideoPlayerClient from "../components/VideoPlayerClient";

test("render video element with poster, source and aria-label", () => {
  render(<VideoPlayerClient src="/videos/foo.mp4" poster="/posters/foo.jpg" title="Foo" />);
  const video = screen.getByLabelText("Foo") as HTMLVideoElement;
  expect(video).toBeInTheDocument();
  expect(video).toHaveAttribute("poster", "/posters/foo.jpg");
  const source = video.querySelector("source");
  expect(source).toHaveAttribute("src", "/videos/foo.mp4");
});
