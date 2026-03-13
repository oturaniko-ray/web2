// tests/VideoPlayerClient.ended.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VideoPlayerClient from "../components/VideoPlayerClient";
import { vi } from "vitest";

describe("VideoPlayerClient ended event", () => {
  beforeEach(() => {
    vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(function (this: HTMLMediaElement) {
      (this as any).__paused = false;
      return Promise.resolve();
    });
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(function (this: HTMLMediaElement) {
      (this as any).__paused = true;
      return undefined as any;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("sets isPlaying false when video ends", async () => {
    render(<VideoPlayerClient src="/videos/delivery-urban.mp4" title="Delivery Urban" />);
    const btn = screen.getByRole("button");
    await userEvent.click(btn);
    // simulate ended
    const video = screen.getByLabelText("Delivery Urban") as HTMLVideoElement;
    video.dispatchEvent(new Event("ended"));
    expect(btn).toHaveAttribute("aria-pressed", "false");
  });
});