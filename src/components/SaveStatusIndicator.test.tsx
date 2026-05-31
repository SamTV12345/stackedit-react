import { describe, it, expect } from 'vitest'
import { screen, act } from '@testing-library/react'
import { SaveStatusIndicator } from './SaveStatusIndicator'
import { renderWithStore } from '../test/renderWithStore'
import { commonActions, SaveStatus } from '../slices/CommonSlice'

const renderWithStatus = (status: SaveStatus) => {
    const rendered = renderWithStore(<SaveStatusIndicator />)
    act(() => { rendered.store.dispatch(commonActions.setSaveStatus(status)) })
    return rendered
}

describe('SaveStatusIndicator', () => {
    it('shows "Saved" when saved', () => {
        renderWithStatus('saved')
        expect(screen.getByText('Saved')).toBeInTheDocument()
        expect(screen.getByTestId('save-status')).toHaveAttribute('data-status', 'saved')
    })

    it('shows unsaved changes when dirty', () => {
        renderWithStatus('dirty')
        expect(screen.getByTestId('save-status')).toHaveAttribute('data-status', 'dirty')
        expect(screen.getByText('Unsaved changes')).toBeInTheDocument()
    })

    it('shows saving when saving', () => {
        renderWithStatus('saving')
        expect(screen.getByTestId('save-status')).toHaveAttribute('data-status', 'saving')
    })
})
