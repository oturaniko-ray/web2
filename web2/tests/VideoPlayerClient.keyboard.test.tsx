// tests/VideoPlayerClient.keyboard.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VideoPlayerClient from "../components/VideoPlayerClient";
import { vi } from "vitest";

describe("VideoPlayerClient keyboard", () => {
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

  it("toggles play/pause with Space when button focused", async () => {
    render(<VideoPlayerClient src="/videos/delivery-urban.mp4" title="Delivery Urban" />);
    const btn = screen.getByRole("button");
    btn.focus();
    await userEvent.keyboard("[Space]");
    expect(btn).toHaveAttribute("aria-pressed", "true");
    await userEvent.keyboard("[Space]");
    expect(btn).toHaveAttribute("aria-pressed", "false");
  });
});