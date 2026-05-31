import { describe, it, expect } from 'vitest'
import { commonReducer, commonActions, File } from './CommonSlice'

const file = (content: string): File => ({
    id: '1', name: 'a.md', content, lastOpened: '2025-01-01T00:00:00.000Z',
})

const initial = () => commonReducer(undefined, { type: '@@INIT' })

describe('CommonSlice save status', () => {
    it('starts in the saved state', () => {
        const state = initial()
        expect(state.saveStatus).toBe('saved')
    })

    it('records the saved content and marks saved when a file is opened', () => {
        const state = commonReducer(initial(), commonActions.setCurrentFile(file('hello')))
        expect(state.savedContent).toBe('hello')
        expect(state.saveStatus).toBe('saved')
    })

    it('marks dirty when the editor text diverges from the saved content', () => {
        let state = commonReducer(initial(), commonActions.setCurrentFile(file('hello')))
        state = commonReducer(state, commonActions.setEditorText('hello world'))
        expect(state.saveStatus).toBe('dirty')
    })

    it('stays saved when the editor text matches the saved content (e.g. on load)', () => {
        let state = commonReducer(initial(), commonActions.setCurrentFile(file('hello')))
        state = commonReducer(state, commonActions.setEditorText('hello'))
        expect(state.saveStatus).toBe('saved')
    })

    it('can be put into the saving state', () => {
        const state = commonReducer(initial(), commonActions.setSaveStatus('saving'))
        expect(state.saveStatus).toBe('saving')
    })

    it('markSaved updates the saved content and returns to saved', () => {
        let state = commonReducer(initial(), commonActions.setCurrentFile(file('hello')))
        state = commonReducer(state, commonActions.setEditorText('hello world'))
        expect(state.saveStatus).toBe('dirty')
        state = commonReducer(state, commonActions.markSaved('hello world'))
        expect(state.savedContent).toBe('hello world')
        expect(state.saveStatus).toBe('saved')
    })
})

describe('CommonSlice outline panel', () => {
    it('is closed initially and toggles open/closed', () => {
        let state = initial()
        expect(state.outlineOpen).toBe(false)
        state = commonReducer(state, commonActions.toggleOutline())
        expect(state.outlineOpen).toBe(true)
        state = commonReducer(state, commonActions.toggleOutline())
        expect(state.outlineOpen).toBe(false)
    })
})
