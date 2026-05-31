import { describe, it, expect } from 'vitest'
import { act } from '@testing-library/react'
import { createRef } from 'react'
import MarkdownViewer from './MarkdownViewer'
import { renderWithStore } from '../test/renderWithStore'
import { commonActions, File } from '../slices/CommonSlice'

const file: File = { id: '1', name: 'a.md', content: '# Hi\n\ntext', lastOpened: '2025-01-01T00:00:00.000Z' }

describe('MarkdownViewer', () => {
    it('gives its scroll container a bounded height so the preview can scroll', () => {
        const ref = createRef<HTMLDivElement>()
        const { store, container } = renderWithStore(<MarkdownViewer refObj={ref} />)
        act(() => { store.dispatch(commonActions.setCurrentFile(file)) })

        const scroller = container.querySelector('.overflow-y-scroll')
        expect(scroller).not.toBeNull()
        // Without h-full the scroller grows to content height and never scrolls.
        expect(scroller).toHaveClass('h-full')
    })
})
