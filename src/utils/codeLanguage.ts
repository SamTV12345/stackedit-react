// Extracts the language token from a react-markdown code element className
// (e.g. "language-ts" -> "ts"). Returns null when no language is present.
export const getCodeLanguage = (className?: string): string | null => {
    const match = /language-(\w+)/.exec(className || '')
    return match ? match[1] : null
}

export const isMermaid = (className?: string): boolean =>
    getCodeLanguage(className) === 'mermaid'
