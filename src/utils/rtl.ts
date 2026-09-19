// Right-to-left support. The editor launches left-to-right unless the user has
// picked a direction before, or the UI language is written right-to-left.

export type Direction = 'ltr' | 'rtl'

export const RTL_STORAGE_KEY = 'rtl'

// Primary language subtags written in a right-to-left script. `iw` and `ji` are
// the superseded codes for Hebrew and Yiddish, which some browsers still report.
const RTL_LANGUAGES = ['ar', 'arc', 'ckb', 'dv', 'fa', 'he', 'iw', 'ji', 'nqo', 'ps', 'sd', 'syr', 'ug', 'ur', 'yi']

export const isRtlLanguage = (language: string | null | undefined): boolean => {
    if (!language) {
        return false
    }
    const primary = language.toLowerCase().split(/[-_]/)[0]
    return RTL_LANGUAGES.includes(primary)
}

// The language i18next detected, persisted by its browser detector; before the
// detector has ever run, fall back to what the browser reports.
export const detectLanguage = (): string | undefined => {
    const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('i18nextLng') : null
    if (stored) {
        return stored
    }
    return typeof navigator !== 'undefined' ? navigator.language : undefined
}

// The RTL flag the editor starts with: an explicit choice by the user wins,
// otherwise derive it from the UI language, defaulting to false.
export const resolveInitialRtl = (stored: string | null | undefined, language?: string | null): boolean => {
    if (stored === 'true') {
        return true
    }
    if (stored === 'false') {
        return false
    }
    return isRtlLanguage(language)
}

export const directionOf = (rtl: boolean): Direction => rtl ? 'rtl' : 'ltr'
