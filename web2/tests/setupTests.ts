import "@testing-library/jest-dom";

// Make HTMLMediaElement.paused reflect our __paused flag used in mocks
Object.defineProperty(HTMLMediaElement.prototype, "paused", {
  get() {
    return (this as any).__paused ?? true;
  },
  configurable: true,
});
