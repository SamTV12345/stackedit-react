import { describe, it, expect } from 'vitest'
import { screen, fireEvent, act } from '@testing-library/react'
import { CommandPalette } from './CommandPalette'
import { renderWithStore } from '../test/renderWithStore'
import { commonActions } from '../slices/CommonSlice'

const renderOpen = () => {
    const rendered = renderWithStore(<CommandPalette editor={undefined as any} />)
    act(() => { rendered.store.dispatch(commonActions.setCommandPaletteOpen(true)) })
    return rendered
}

describe('CommandPalette', () => {
    it('renders nothing when closed', () => {
        renderWithStore(<CommandPalette editor={undefined as any} />)
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })

    it('lists commands when opened', () => {
        renderOpen()
        expect(screen.getByText('Save file')).toBeInTheDocument()
        expect(screen.getByText('Toggle outline')).toBeInTheDocument()
    })

    it('filters commands as the user types', () => {
        renderOpen()
        fireEvent.change(screen.getByLabelText('Command palette'), { target: { value: 'outline' } })
        expect(screen.getByText('Toggle outline')).toBeInTheDocument()
        expect(screen.queryByText('Save file')).not.toBeInTheDocument()
    })

    it('runs the selected command on Enter and closes', () => {
        const { store } = renderOpen()
        const input = screen.getByLabelText('Command palette')
        fireEvent.change(input, { target: { value: 'outline' } })
        fireEvent.keyDown(input, { key: 'Enter' })
        expect(store.getState().commonReducer.outlineOpen).toBe(true)
        expect(store.getState().commonReducer.commandPaletteOpen).toBe(false)
    })

    it('opens via the Ctrl+Shift+P shortcut', () => {
        const { store } = renderWithStore(<CommandPalette editor={undefined as any} />)
        act(() => { fireEvent.keyDown(window, { key: 'P', ctrlKey: true, shiftKey: true }) })
        expect(store.getState().commonReducer.commandPaletteOpen).toBe(true)
    })

    it('closes on Escape', () => {
        const { store } = renderOpen()
        fireEvent.keyDown(screen.getByLabelText('Command palette'), { key: 'Escape' })
        expect(store.getState().commonReducer.commandPaletteOpen).toBe(false)
    })
})
