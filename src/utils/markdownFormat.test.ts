import { describe, it, expect } from 'vitest'
import { toggleWrap, toggleLinePrefix, setHeading, insertLink } from './markdownFormat'

describe('toggleWrap', () => {
    it('wraps the selection with the marker', () => {
        // "hello world", select "world" (6..11)
        const r = toggleWrap('hello world', 6, 11, '**')
        expect(r.value).toBe('hello **world**')
        // selection still surrounds the inner text
        expect(r.value.slice(r.selectionStart, r.selectionEnd)).toBe('world')
    })

    it('unwraps when the selection is already wrapped', () => {
        const r = toggleWrap('hello **world**', 8, 13, '**')
        expect(r.value).toBe('hello world')
        expect(r.value.slice(r.selectionStart, r.selectionEnd)).toBe('world')
    })

    it('wraps an empty selection and places the cursor between the markers', () => {
        const r = toggleWrap('', 0, 0, '**')
        expect(r.value).toBe('****')
        expect(r.selectionStart).toBe(2)
        expect(r.selectionEnd).toBe(2)
    })

    it('supports single-character markers (italic, code)', () => {
        expect(toggleWrap('ab', 0, 2, '*').value).toBe('*ab*')
        expect(toggleWrap('ab', 0, 2, '`').value).toBe('`ab`')
    })
})

describe('toggleLinePrefix', () => {
    it('adds a prefix to a single line', () => {
        const r = toggleLinePrefix('item', 0, 4, '- ')
        expect(r.value).toBe('- item')
    })

    it('removes the prefix when every line already has it', () => {
        const r = toggleLinePrefix('- a\n- b', 0, 7, '- ')
        expect(r.value).toBe('a\nb')
    })

    it('adds the prefix to all selected lines when some lack it', () => {
        const r = toggleLinePrefix('- a\nb', 0, 5, '- ')
        expect(r.value).toBe('- - a\n- b')
    })

    it('toggles a blockquote prefix', () => {
        expect(toggleLinePrefix('quote', 0, 5, '> ').value).toBe('> quote')
    })
})

describe('setHeading', () => {
    it('adds a heading marker of the requested level', () => {
        expect(setHeading('Title', 0, 5, 1).value).toBe('# Title')
        expect(setHeading('Title', 0, 5, 2).value).toBe('## Title')
    })

    it('replaces an existing heading of a different level', () => {
        expect(setHeading('# Title', 0, 7, 3).value).toBe('### Title')
    })

    it('removes the heading when it already matches the requested level', () => {
        expect(setHeading('## Title', 0, 8, 2).value).toBe('Title')
    })
})

describe('insertLink', () => {
    it('wraps the selection as link text and selects the url placeholder', () => {
        const r = insertLink('click here', 0, 10)
        expect(r.value).toBe('[click here](url)')
        expect(r.value.slice(r.selectionStart, r.selectionEnd)).toBe('url')
    })

    it('uses a text placeholder when there is no selection', () => {
        const r = insertLink('', 0, 0)
        expect(r.value).toBe('[text](url)')
    })
})
