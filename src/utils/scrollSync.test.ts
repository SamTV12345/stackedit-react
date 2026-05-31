import { describe, it, expect } from 'vitest'
import { proportionalScrollTop } from './scrollSync'

describe('proportionalScrollTop', () => {
    it('maps the source scroll fraction onto the target range', () => {
        // halfway down a 1000px source range -> halfway down a 400px target range
        expect(proportionalScrollTop(500, 1000, 400)).toBe(200)
    })

    it('maps top to top and bottom to bottom', () => {
        expect(proportionalScrollTop(0, 1000, 400)).toBe(0)
        expect(proportionalScrollTop(1000, 1000, 400)).toBe(400)
    })

    it('returns 0 when the source cannot scroll', () => {
        expect(proportionalScrollTop(0, 0, 400)).toBe(0)
        expect(proportionalScrollTop(50, -10, 400)).toBe(0)
    })

    it('clamps the result to the target range', () => {
        expect(proportionalScrollTop(2000, 1000, 400)).toBe(400)
    })
})
