// tests/setupTests.ts
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Asegura propiedad paused en el prototipo para entornos de test
if (!Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'paused')) {
  Object.defineProperty(HTMLMediaElement.prototype, 'paused', {
    configurable: true,
    get() { return (this as any).__paused ?? true; },
    set(v) { (this as any).__paused = v; }
  });
}

// Mocks globales para play/pause que los tests esperan
vi.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(function (this: HTMLMediaElement) {
  (this as any).__paused = false;
  return Promise.resolve();
});

vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(function (this: HTMLMediaElement) {
  (this as any).__paused = true;
  return undefined as any;
});