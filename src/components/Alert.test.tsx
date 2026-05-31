import { describe, it, expect, beforeEach } from 'vitest'
import { screen, act } from '@testing-library/react'
import { Alert } from './Alert'
import { renderWithStore } from '../test/renderWithStore'
import { alertActions, AlertTypes, AlertProps } from '../slices/AlertSlice'

const renderAlert = () => {
    const portal = document.createElement('div')
    portal.id = 'alert'
    document.body.appendChild(portal)
    const rendered = renderWithStore(<Alert />)
    const showAlert = (payload: AlertProps) =>
        act(() => {
            rendered.store.dispatch(alertActions.setAlerting(payload))
        })
    return { ...rendered, showAlert }
}

describe('Alert', () => {
    beforeEach(() => {
        document.getElementById('alert')?.remove()
    })

    it('shows green styling for a success alert', () => {
        const { showAlert } = renderAlert()
        showAlert({ open: true, type: AlertTypes.SUCCESS, title: 'Saved', message: 'ok' })
        const alert = screen.getByRole('alert')
        expect(alert.className).toContain('green')
        expect(alert.className).not.toContain('red')
        expect(alert.className).not.toContain('orange')
    })

    it('shows red styling for an error alert', () => {
        const { showAlert } = renderAlert()
        showAlert({ open: true, type: AlertTypes.ERROR, title: 'Oops', message: 'bad' })
        const alert = screen.getByRole('alert')
        expect(alert.className).toContain('red')
        expect(alert.className).not.toContain('green')
    })

    it('shows orange styling for a warning alert', () => {
        const { showAlert } = renderAlert()
        showAlert({ open: true, type: AlertTypes.WARN, title: 'Heads up', message: 'warn' })
        const alert = screen.getByRole('alert')
        expect(alert.className).toContain('orange')
        expect(alert.className).not.toContain('red')
    })

    it('switches styling correctly when the alert type changes between renders', () => {
        const { showAlert } = renderAlert()
        showAlert({ open: true, type: AlertTypes.ERROR, title: 'a', message: 'a' })
        showAlert({ open: true, type: AlertTypes.SUCCESS, title: 'b', message: 'b' })
        const alert = screen.getByRole('alert')
        expect(alert.className).toContain('green')
        expect(alert.className).not.toContain('red')
    })

    it('renders the title and message', () => {
        const { showAlert } = renderAlert()
        showAlert({ open: true, type: AlertTypes.SUCCESS, title: 'My title', message: 'My message' })
        expect(screen.getByText('My title')).toBeInTheDocument()
        expect(screen.getByText('My message')).toBeInTheDocument()
    })
})
