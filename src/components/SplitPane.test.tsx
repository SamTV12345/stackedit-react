import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SplitPane } from './SplitPane'

const renderPane = (storageKey = 'test-split') =>
    render(<SplitPane storageKey={storageKey} left={<div>LEFT PANE</div>} right={<div>RIGHT PANE</div>} />)

beforeEach(() => {
    localStorage.clear()
})

describe('SplitPane', () => {
    it('renders both panes and a divider', () => {
        renderPane()
        expect(screen.getByText('LEFT PANE')).toBeInTheDocument()
        expect(screen.getByText('RIGHT PANE')).toBeInTheDocument()
        expect(screen.getByTestId('split-divider')).toBeInTheDocument()
    })

    it('defaults to a 50/50 split', () => {
        renderPane()
        expect(screen.getByTestId('split-divider')).toHaveAttribute('aria-valuenow', '50')
    })

    it('resizes with arrow keys and persists the ratio', () => {
        renderPane('persist-me')
        const divider = screen.getByTestId('split-divider')
        fireEvent.keyDown(divider, { key: 'ArrowRight' })
        expect(divider).toHaveAttribute('aria-valuenow', '52')
        expect(Number(localStorage.getItem('persist-me'))).toBeCloseTo(0.52)
    })

    it('does not resize past the maximum', () => {
        renderPane()
        const divider = screen.getByTestId('split-divider')
        for (let i = 0; i < 40; i++) {
            fireEvent.keyDown(divider, { key: 'ArrowRight' })
        }
        expect(divider).toHaveAttribute('aria-valuenow', '80')
    })

    it('restores a persisted ratio on mount', () => {
        localStorage.setItem('saved-split', '0.3')
        renderPane('saved-split')
        expect(screen.getByTestId('split-divider')).toHaveAttribute('aria-valuenow', '30')
    })
})
