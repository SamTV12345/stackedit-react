import { describe, it, expect, beforeEach } from 'vitest'
import { detectLanguage, directionOf, isRtlLanguage, resolveInitialRtl } from './rtl'

describe('isRtlLanguage', () => {
    it('recognises right-to-left languages, with or without a region', () => {
        expect(isRtlLanguage('ar')).toBe(true)
        expect(isRtlLanguage('he-IL')).toBe(true)
        expect(isRtlLanguage('fa_IR')).toBe(true)
        expect(isRtlLanguage('UR')).toBe(true)
    })
    it('recognises the superseded Hebrew and Yiddish codes', () => {
        expect(isRtlLanguage('iw')).toBe(true)
        expect(isRtlLanguage('ji')).toBe(true)
    })
    it('treats left-to-right languages as such', () => {
        expect(isRtlLanguage('en')).toBe(false)
        expect(isRtlLanguage('de-DE')).toBe(false)
    })
    it('is false for a missing language', () => {
        expect(isRtlLanguage(null)).toBe(false)
        expect(isRtlLanguage(undefined)).toBe(false)
        expect(isRtlLanguage('')).toBe(false)
    })
})

describe('resolveInitialRtl', () => {
    it('honours a stored choice over the language', () => {
        expect(resolveInitialRtl('true', 'en')).toBe(true)
        expect(resolveInitialRtl('false', 'ar')).toBe(false)
    })
    it('falls back to the language when nothing is stored', () => {
        expect(resolveInitialRtl(null, 'he')).toBe(true)
        expect(resolveInitialRtl(null, 'en')).toBe(false)
    })
    it('defaults to left-to-right with neither a stored value nor a language', () => {
        expect(resolveInitialRtl(null)).toBe(false)
        expect(resolveInitialRtl('nonsense', 'en')).toBe(false)
    })
})

describe('detectLanguage', () => {
    beforeEach(() => {
        localStorage.clear()
    })
    it('prefers the language i18next persisted', () => {
        localStorage.setItem('i18nextLng', 'fa')
        expect(detectLanguage()).toBe('fa')
    })
    it('falls back to the browser language', () => {
        expect(detectLanguage()).toBe(navigator.language)
    })
})

describe('directionOf', () => {
    it('maps the flag to a dir attribute value', () => {
        expect(directionOf(true)).toBe('rtl')
        expect(directionOf(false)).toBe('ltr')
    })
})
