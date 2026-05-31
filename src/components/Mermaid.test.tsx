import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'

const renderMock = vi.fn()
const initializeMock = vi.fn()

vi.mock('mermaid', () => ({
    default: {
        initialize: (...args: unknown[]) => initializeMock(...args),
        render: (...args: unknown[]) => renderMock(...args),
    },
}))

import { Mermaid } from './Mermaid'

describe('Mermaid', () => {
    it('renders the SVG produced by mermaid', async () => {
        renderMock.mockResolvedValueOnce({ svg: '<svg data-testid="diagram">ok</svg>' })
        render(<Mermaid chart="graph TD; A-->B" />)

        await waitFor(() => {
            expect(screen.getByTestId('mermaid').innerHTML).toContain('<svg')
        })
        expect(renderMock).toHaveBeenCalledWith(expect.any(String), 'graph TD; A-->B')
    })

    it('shows an error message when mermaid fails to parse', async () => {
        renderMock.mockRejectedValueOnce(new Error('Parse error on line 1'))
        render(<Mermaid chart="not a diagram" />)

        await waitFor(() => {
            expect(screen.getByTestId('mermaid-error')).toHaveTextContent('Parse error on line 1')
        })
    })
})
