import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import {
    openFileCreatedEvent,
    uploadToGitHubSuccessful,
    uploadToGitHubRepoNotFound,
    updatedFileErrored,
    displayFileNotFound,
} from './AlertEvents'
import { store } from '../store/store'
import { alertActions, AlertTypes } from '../slices/AlertSlice'
import i18n from '../i18n/i18n'

const alertState = () => store.getState().alertReducer

beforeAll(async () => {
    await i18n.changeLanguage('en')
})

beforeEach(() => {
    store.dispatch(alertActions.setOpen(false))
})

describe('AlertEvents', () => {
    it('reports a successful GitHub upload as a SUCCESS alert', () => {
        uploadToGitHubSuccessful('notes.md', 'octocat', 'my-repo')
        const state = alertState()
        expect(state.open).toBe(true)
        expect(state.type).toBe(AlertTypes.SUCCESS)
        // message must resolve (not echo the raw key) and mention the destination
        expect(state.message).not.toContain('alert-')
        expect(state.message).toContain('notes.md')
        expect(state.message).toContain('octocat')
        expect(state.message).toContain('my-repo')
        // title must not claim failure
        expect(state.title.toLowerCase()).not.toContain('not ')
    })

    it('resolves the title for a newly created file (no raw key leak)', () => {
        openFileCreatedEvent('draft.md')
        const state = alertState()
        expect(state.type).toBe(AlertTypes.SUCCESS)
        expect(state.title).not.toContain('alert-')
        expect(state.title.length).toBeGreaterThan(0)
        expect(state.message).toContain('draft.md')
    })

    it('reports a missing repo as an ERROR with a resolved message', () => {
        uploadToGitHubRepoNotFound('octocat', 'ghost-repo')
        const state = alertState()
        expect(state.type).toBe(AlertTypes.ERROR)
        expect(state.message).not.toContain('alert-')
        expect(state.message).toContain('octocat')
        expect(state.message).toContain('ghost-repo')
    })

    it('does not leak a raw interpolation token in the file-not-found message', () => {
        displayFileNotFound('abc-123')
        const state = alertState()
        expect(state.type).toBe(AlertTypes.ERROR)
        expect(state.message).toContain('abc-123')
        expect(state.message).not.toContain('${id}')
    })

    it('reports a failed save with a message that does not claim success', () => {
        updatedFileErrored('notes.md')
        const state = alertState()
        expect(state.type).toBe(AlertTypes.ERROR)
        expect(state.message.toLowerCase()).not.toContain('successfully')
    })
})
