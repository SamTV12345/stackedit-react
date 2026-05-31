// Pure markdown formatting transforms operating on a full string plus a
// selection (character offsets). Each returns the new string and the new
// selection so the editor wiring can apply the result and restore selection.
export interface TextEditResult {
    value: string
    selectionStart: number
    selectionEnd: number
}

// Wrap/unwrap the selection with a marker (e.g. "**" for bold, "*" italic,
// "`" inline code). Toggles off when the selection is already wrapped.
export const toggleWrap = (
    value: string,
    start: number,
    end: number,
    marker: string,
): TextEditResult => {
    const before = value.slice(0, start)
    const selected = value.slice(start, end)
    const after = value.slice(end)
    const len = marker.length

    const alreadyWrapped = before.endsWith(marker) && after.startsWith(marker)
    if (alreadyWrapped) {
        return {
            value: before.slice(0, before.length - len) + selected + after.slice(len),
            selectionStart: start - len,
            selectionEnd: end - len,
        }
    }

    return {
        value: before + marker + selected + marker + after,
        selectionStart: start + len,
        selectionEnd: end + len,
    }
}

const selectedLinesRange = (value: string, start: number, end: number) => {
    const lineStart = value.lastIndexOf('\n', start - 1) + 1
    let lineEnd = value.indexOf('\n', end)
    if (lineEnd === -1) {
        lineEnd = value.length
    }
    return { lineStart, lineEnd }
}

const replaceBlock = (
    value: string,
    lineStart: number,
    lineEnd: number,
    newBlock: string,
): TextEditResult => ({
    value: value.slice(0, lineStart) + newBlock + value.slice(lineEnd),
    selectionStart: lineStart,
    selectionEnd: lineStart + newBlock.length,
})

// Add/remove a line prefix (e.g. "- " for lists, "> " for blockquotes) on every
// line touched by the selection. Removes only when all non-empty lines have it.
export const toggleLinePrefix = (
    value: string,
    start: number,
    end: number,
    prefix: string,
): TextEditResult => {
    const { lineStart, lineEnd } = selectedLinesRange(value, start, end)
    const lines = value.slice(lineStart, lineEnd).split('\n')
    const nonEmpty = lines.filter(l => l.length > 0)
    const allPrefixed = nonEmpty.length > 0 && nonEmpty.every(l => l.startsWith(prefix))

    const newLines = lines.map(line => {
        if (allPrefixed) {
            return line.startsWith(prefix) ? line.slice(prefix.length) : line
        }
        return prefix + line
    })
    return replaceBlock(value, lineStart, lineEnd, newLines.join('\n'))
}

const HEADING_RE = /^(#{1,6})\s+/

// Set (or toggle off) an ATX heading of the given level on the selected lines.
export const setHeading = (
    value: string,
    start: number,
    end: number,
    level: number,
): TextEditResult => {
    const prefix = '#'.repeat(level) + ' '
    const { lineStart, lineEnd } = selectedLinesRange(value, start, end)
    const lines = value.slice(lineStart, lineEnd).split('\n')

    const newLines = lines.map(line => {
        const match = HEADING_RE.exec(line)
        const stripped = line.replace(HEADING_RE, '')
        // Already at this level -> remove the heading (toggle off).
        if (match && match[1].length === level) {
            return stripped
        }
        return prefix + stripped
    })
    return replaceBlock(value, lineStart, lineEnd, newLines.join('\n'))
}

// Insert a markdown link using the selection as link text, leaving the cursor
// on the "url" placeholder.
export const insertLink = (value: string, start: number, end: number): TextEditResult => {
    const before = value.slice(0, start)
    const after = value.slice(end)
    const linkText = value.slice(start, end) || 'text'
    const inserted = `[${linkText}](url)`
    const newValue = before + inserted + after
    // Place selection on the "url" placeholder.
    const urlStart = before.length + inserted.length - 4 // length of "url)"
    return {
        value: newValue,
        selectionStart: urlStart,
        selectionEnd: urlStart + 3,
    }
}
