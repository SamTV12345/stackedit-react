import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { CodeBlock } from './CodeBlock'
import { renderWithStore } from '../test/renderWithStore'

const writeText = vi.fn().mockResolvedValue(undefined)

beforeEach(() => {
    writeText.mockClear()
    Object.assign(navigator, { clipboard: { writeText } })
})

describe('CodeBlock', () => {
    it('shows the language label and a copy button', () => {
        renderWithStore(<CodeBlock language="js" value="const x = 1" />)
        expect(screen.getByText('js')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument()
    })

    it('copies the raw code to the clipboard and confirms', async () => {
        renderWithStore(<CodeBlock language="ts" value="let y = 2" />)
        fireEvent.click(screen.getByRole('button', { name: 'Copy' }))
        expect(writeText).toHaveBeenCalledWith('let y = 2')
        await waitFor(() => expect(screen.getByRole('button', { name: 'Copied!' })).toBeInTheDocument())
    })
})
