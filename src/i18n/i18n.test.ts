import { describe, it, expect } from 'vitest'
import en from './json/en.json'
import de from './json/de.json'

describe('i18n translation files', () => {
    it('en and de define exactly the same keys', () => {
        const enKeys = Object.keys(en).sort()
        const deKeys = Object.keys(de).sort()
        const missingInDe = enKeys.filter(k => !(k in de))
        const missingInEn = deKeys.filter(k => !(k in en))
        expect(missingInDe, 'keys present in en.json but missing in de.json').toEqual([])
        expect(missingInEn, 'keys present in de.json but missing in en.json').toEqual([])
    })

    it('no value contains an un-interpolated ${...} token', () => {
        const offenders = Object.entries({ ...en, ...de }).filter(([, v]) =>
            /\$\{/.test(v as string),
        )
        expect(offenders).toEqual([])
    })
})
