import { describe, it, expect, vi } from 'vitest'
import { screen, fireEvent, act } from '@testing-library/react'
import { Outline } from './Outline'
import { renderWithStore } from '../test/renderWithStore'
import { commonActions, File } from '../slices/CommonSlice'

const file = (content: string): File => ({
    id: '1', name: 'a.md', content, lastOpened: '2025-01-01T00:00:00.000Z',
})

const makeFakeEditor = () => ({
    revealLineNearTop: vi.fn(),
    setPosition: vi.fn(),
    focus: vi.fn(),
})

const md = '# Intro\n## Setup\n```\n# fake\n```\n## Usage'

describe('Outline', () => {
    it('lists the document headings (ignoring code fences)', () => {
        const { store } = renderWithStore(<Outline editor={undefined as any} />)
        act(() => { store.dispatch(commonActions.setCurrentFile(file(md))) })
        expect(screen.getByText('Intro')).toBeInTheDocument()
        expect(screen.getByText('Setup')).toBeInTheDocument()
        expect(screen.getByText('Usage')).toBeInTheDocument()
        expect(screen.queryByText('fake')).not.toBeInTheDocument()
    })

    it('jumps the editor to a heading line when clicked', () => {
        const editor = makeFakeEditor()
        const { store } = renderWithStore(<Outline editor={editor as any} />)
        act(() => { store.dispatch(commonActions.setCurrentFile(file(md))) })
        fireEvent.click(screen.getByText('Usage'))
        // "## Usage" is on line 6 in the markdown above
        expect(editor.revealLineNearTop).toHaveBeenCalledWith(6)
        expect(editor.setPosition).toHaveBeenCalledWith({ lineNumber: 6, column: 1 })
    })

    it('shows an empty-state message when there are no headings', () => {
        const { store } = renderWithStore(<Outline editor={undefined as any} />)
        act(() => { store.dispatch(commonActions.setCurrentFile(file('just text, no headings'))) })
        expect(screen.getByText('No headings yet')).toBeInTheDocument()
    })
})
