import { describe, it, expect } from 'vitest'
import { extractHeadings } from './extractHeadings'

describe('extractHeadings', () => {
    it('extracts ATX headings with their level and 1-based line number', () => {
        const md = '# Title\n\nsome text\n## Section\n### Sub'
        expect(extractHeadings(md)).toEqual([
            { level: 1, text: 'Title', line: 1 },
            { level: 2, text: 'Section', line: 4 },
            { level: 3, text: 'Sub', line: 5 },
        ])
    })

    it('ignores headings inside ``` fenced code blocks', () => {
        const md = '# Real\n```\n# not a heading\n```\n## Also real'
        expect(extractHeadings(md).map(h => h.text)).toEqual(['Real', 'Also real'])
    })

    it('ignores headings inside ~~~ fenced code blocks', () => {
        const md = '# Real\n~~~\n## fake\n~~~\n## Real two'
        expect(extractHeadings(md).map(h => h.text)).toEqual(['Real', 'Real two'])
    })

    it('requires a space after the hashes', () => {
        expect(extractHeadings('#nospace\n# yes')).toEqual([{ level: 1, text: 'yes', line: 2 }])
    })

    it('trims text and strips trailing closing hashes', () => {
        expect(extractHeadings('##   Padded   ##')[0].text).toBe('Padded')
    })

    it('ignores empty headings and returns [] for no headings', () => {
        expect(extractHeadings('just text\nmore text')).toEqual([])
        expect(extractHeadings('#\n##  ')).toEqual([])
    })

    it('does not treat levels beyond 6 as headings', () => {
        expect(extractHeadings('####### too deep')).toEqual([])
    })
})
