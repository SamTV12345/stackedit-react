import { describe, it, expect } from 'vitest'
import { jsonDownloadName } from './download'

describe('jsonDownloadName', () => {
    it('uses the file name rather than a hardcoded placeholder', () => {
        expect(jsonDownloadName({ name: 'my-notes.md' })).toBe('my-notes.md.json')
    })

    it('falls back to a default when the name is empty', () => {
        expect(jsonDownloadName({ name: '' })).toBe('untitled.json')
    })
})
