import '@testing-library/jest-dom/vitest'
import 'fake-indexeddb/auto'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// Node 26's jsdom does not expose a working localStorage by default; provide one
// before any module that reads it at import time (e.g. CommonSlice).
if (typeof localStorage === 'undefined' || localStorage === null) {
    const memory = new Map<string, string>()
    const polyfill: Storage = {
        get length() {
            return memory.size
        },
        clear: () => memory.clear(),
        getItem: (key: string) => (memory.has(key) ? memory.get(key)! : null),
        key: (index: number) => Array.from(memory.keys())[index] ?? null,
        removeItem: (key: string) => void memory.delete(key),
        setItem: (key: string, value: string) => void memory.set(key, String(value)),
    }
    Object.defineProperty(globalThis, 'localStorage', { value: polyfill, configurable: true })
}

// jsdom doesn't implement matchMedia; some components/libs probe it.
if (!window.matchMedia) {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
    }))
}

// jsdom doesn't implement scrollIntoView; the scroll-sync code calls it.
if (!Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = vi.fn()
}

afterEach(() => {
    cleanup()
})
