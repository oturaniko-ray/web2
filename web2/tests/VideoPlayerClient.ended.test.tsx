import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
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

    await act(async () => {
      await userEvent.click(btn);
    });
    await waitFor(() => expect(btn).toHaveAttribute("aria-pressed", "true"));

    const video = screen.getByLabelText("Delivery Urban") as HTMLVideoElement;
    act(() => {
      (video as any).__paused = true;
      video.dispatchEvent(new Event("ended"));
    });

    await waitFor(() => {
      expect(btn).toHaveAttribute("aria-pressed", "false");
    });
  });
});
