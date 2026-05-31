import { describe, it, expect, vi } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { Toolbar } from './Toolbar'
import { renderWithStore } from '../test/renderWithStore'

// A minimal Monaco editor/model fake. Positions carry their raw offset so the
// offset<->position conversions in applyTransform round-trip for any value.
const makeFakeEditor = (initial: string, selStart: number, selEnd: number) => {
    let value = initial
    const model = {
        getValue: () => value,
        getOffsetAt: (pos: any) => pos.__offset,
        getPositionAt: (offset: number) => ({ lineNumber: 1, column: offset + 1, __offset: offset }),
        getFullModelRange: () => ({}),
    }
    const editor = {
        getModel: () => model,
        getSelection: () => ({
            getStartPosition: () => ({ __offset: selStart }),
            getEndPosition: () => ({ __offset: selEnd }),
        }),
        executeEdits: (_src: string, edits: Array<{ text: string }>) => { value = edits[0].text; return true },
        setSelection: vi.fn(),
        focus: vi.fn(),
    }
    return { editor, getValue: () => value }
}

describe('Toolbar', () => {
    it('renders a button for each formatting action', () => {
        renderWithStore(<Toolbar editor={undefined as any} />)
        expect(screen.getByRole('button', { name: /Bold/ })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /Italic/ })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Heading 1' })).toBeInTheDocument()
    })

    it('disables buttons until an editor is available', () => {
        renderWithStore(<Toolbar editor={undefined as any} />)
        expect(screen.getByRole('button', { name: /Bold/ })).toBeDisabled()
    })

    it('wraps the selection in bold markers when Bold is clicked', () => {
        const fake = makeFakeEditor('hello world', 6, 11)
        renderWithStore(<Toolbar editor={fake.editor as any} />)
        fireEvent.click(screen.getByRole('button', { name: /Bold/ }))
        expect(fake.getValue()).toBe('hello **world**')
    })

    it('applies a heading when H2 is clicked', () => {
        const fake = makeFakeEditor('Title', 0, 5)
        renderWithStore(<Toolbar editor={fake.editor as any} />)
        fireEvent.click(screen.getByRole('button', { name: 'Heading 2' }))
        expect(fake.getValue()).toBe('## Title')
    })

    it('triggers the Monaco find action when Find is clicked', () => {
        const run = vi.fn()
        const editor = { focus: vi.fn(), getAction: vi.fn().mockReturnValue({ run }) }
        renderWithStore(<Toolbar editor={editor as any} />)
        fireEvent.click(screen.getByRole('button', { name: /Find/ }))
        expect(editor.getAction).toHaveBeenCalledWith('actions.find')
        expect(run).toHaveBeenCalled()
    })
})
