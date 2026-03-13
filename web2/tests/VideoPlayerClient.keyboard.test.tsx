import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
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

    const btn = screen.getByRole("button", { name: /play/i });
    btn.focus();

    await act(async () => {
      fireEvent.keyDown(btn, { key: " ", code: "Space", keyCode: 32, charCode: 32 });
      fireEvent.keyUp(btn, { key: " ", code: "Space", keyCode: 32, charCode: 32 });
    });
    await waitFor(() => expect(btn).toHaveAttribute("aria-pressed", "true"));

    await act(async () => {
      fireEvent.keyDown(btn, { key: " ", code: "Space", keyCode: 32, charCode: 32 });
      fireEvent.keyUp(btn, { key: " ", code: "Space", keyCode: 32, charCode: 32 });
    });
    await waitFor(() => expect(btn).toHaveAttribute("aria-pressed", "false"));
  });
});
