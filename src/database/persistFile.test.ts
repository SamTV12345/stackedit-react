import { describe, it, expect, beforeEach } from 'vitest'
import { persistFile } from './FileLib'
import { db } from './Database'
import { store } from '../store/store'
import { commonActions, File } from '../slices/CommonSlice'
import { alertActions } from '../slices/AlertSlice'

const seed = async (content: string) => {
    const file: File = { id: 'f1', name: 'a.md', content, lastOpened: '2025-01-01T00:00:00.000Z', repo: 'r' }
    await db.put('file', file)
    store.dispatch(commonActions.setCurrentFile(file))
}

beforeEach(async () => {
    await db.clear('file')
    store.dispatch(alertActions.setOpen(false))
})

describe('persistFile', () => {
    it('writes the new content to IndexedDB and marks the document saved', async () => {
        await seed('old')
        store.dispatch(commonActions.setEditorText('new content'))
        expect(store.getState().commonReducer.saveStatus).toBe('dirty')

        await persistFile('f1', 'a.md', 'new content', { silent: true })

        const stored = await db.get('file', 'f1')
        expect(stored?.content).toBe('new content')
        expect(store.getState().commonReducer.saveStatus).toBe('saved')
        expect(store.getState().commonReducer.savedContent).toBe('new content')
    })

    it('does not raise a toast when saving silently (autosave)', async () => {
        await seed('old')
        await persistFile('f1', 'a.md', 'autosaved', { silent: true })
        expect(store.getState().alertReducer.open).toBe(false)
    })

    it('raises a confirmation toast when saving non-silently (manual save)', async () => {
        await seed('old')
        await persistFile('f1', 'a.md', 'manually saved', { silent: false })
        expect(store.getState().alertReducer.open).toBe(true)
    })
})
