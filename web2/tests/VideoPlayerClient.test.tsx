import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import VideoPlayerClient from "../components/VideoPlayerClient";

describe("VideoPlayerClient interaction (robust aria-pressed)", () => {
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

  it("toggles play/pause and updates aria-pressed reliably", async () => {
    render(
      <VideoPlayerClient
        src="/videos/delivery-urban.mp4"
        poster="/posters/delivery-urban.jpg"
        title="Delivery Urban"
      />
    );

    const playButton = screen.getByRole("button", { name: /play/i });
    expect(playButton).toHaveAttribute("aria-pressed", "false");

    await userEvent.click(playButton);
    await waitFor(() => expect(playButton).toHaveAttribute("aria-pressed", "true"));

    await userEvent.click(playButton);
    await waitFor(() => expect(playButton).toHaveAttribute("aria-pressed", "false"));
  });
});
