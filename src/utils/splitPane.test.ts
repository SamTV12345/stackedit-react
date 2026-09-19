import { describe, it, expect } from 'vitest'
import { clampRatio, ratioFromPointer, parseStoredRatio, MIN_RATIO, MAX_RATIO } from './splitPane'

describe('clampRatio', () => {
    it('passes through a value within bounds', () => {
        expect(clampRatio(0.5)).toBe(0.5)
    })
    it('clamps below the minimum', () => {
        expect(clampRatio(0.05)).toBe(MIN_RATIO)
    })
    it('clamps above the maximum', () => {
        expect(clampRatio(0.99)).toBe(MAX_RATIO)
    })
})

describe('ratioFromPointer', () => {
    it('computes the fraction of the pointer position within the container', () => {
        expect(ratioFromPointer(500, 0, 1000)).toBe(0.5)
        expect(ratioFromPointer(300, 100, 800)).toBeCloseTo(0.25)
    })
    it('falls back to centre for a zero-width container', () => {
        expect(ratioFromPointer(10, 0, 0)).toBe(0.5)
    })
    it('measures from the right edge in RTL', () => {
        expect(ratioFromPointer(500, 0, 1000, true)).toBe(0.5)
        expect(ratioFromPointer(300, 100, 800, true)).toBeCloseTo(0.75)
    })
})

describe('parseStoredRatio', () => {
    it('parses and clamps a stored numeric string', () => {
        expect(parseStoredRatio('0.3')).toBeCloseTo(0.3)
        expect(parseStoredRatio('0.95')).toBe(MAX_RATIO)
    })
    it('returns the fallback for null or invalid input', () => {
        expect(parseStoredRatio(null)).toBe(0.5)
        expect(parseStoredRatio('not-a-number', 0.4)).toBe(0.4)
    })
})
