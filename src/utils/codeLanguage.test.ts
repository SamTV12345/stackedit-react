import { describe, it, expect } from 'vitest'
import { getCodeLanguage, isMermaid } from './codeLanguage'

describe('getCodeLanguage', () => {
    it('extracts the language from a language-* class', () => {
        expect(getCodeLanguage('language-ts')).toBe('ts')
        expect(getCodeLanguage('foo language-python bar')).toBe('python')
    })

    it('returns null when there is no language class', () => {
        expect(getCodeLanguage('')).toBeNull()
        expect(getCodeLanguage(undefined)).toBeNull()
        expect(getCodeLanguage('hljs')).toBeNull()
    })
})

describe('isMermaid', () => {
    it('is true only for language-mermaid', () => {
        expect(isMermaid('language-mermaid')).toBe(true)
        expect(isMermaid('language-js')).toBe(false)
        expect(isMermaid(undefined)).toBe(false)
    })
})
