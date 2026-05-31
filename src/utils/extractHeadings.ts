export interface Heading {
    level: number
    text: string
    line: number
}

const FENCE_RE = /^\s*(```|~~~)/
const HEADING_RE = /^(#{1,6})\s+(.*\S)\s*$/

// Extracts ATX headings (# .. ######) from markdown, ignoring anything inside
// fenced code blocks. Line numbers are 1-based to match the editor.
export const extractHeadings = (markdown: string): Heading[] => {
    const lines = markdown.split('\n')
    const headings: Heading[] = []
    let fenceMarker: string | null = null

    lines.forEach((line, index) => {
        const fence = FENCE_RE.exec(line)
        if (fence) {
            if (fenceMarker === null) {
                fenceMarker = fence[1]
            } else if (fence[1] === fenceMarker) {
                fenceMarker = null
            }
            return
        }
        if (fenceMarker !== null) {
            return
        }

        const match = HEADING_RE.exec(line)
        if (match) {
            const text = match[2].replace(/\s+#+\s*$/, '').trim()
            if (text.length > 0) {
                headings.push({ level: match[1].length, text, line: index + 1 })
            }
        }
    })

    return headings
}
