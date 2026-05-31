import { describe, it, expect, beforeEach, vi } from 'vitest'
import { loadInitialFile } from './loadInitialFile'
import { db } from '../database/Database'
import { makeStore } from '../store/store'

beforeEach(async () => {
    await db.clear('file')
})

const put = (file: { id: string; name: string; content: string; lastOpened: string }) =>
    db.put('file', { repo: 'r', ...file })

describe('loadInitialFile', () => {
    it('loads the sample file when the database is empty', async () => {
        const store = makeStore()
        const loadSample = vi.fn()

        await loadInitialFile({ dispatch: store.dispatch, loadSample })

        expect(loadSample).toHaveBeenCalledOnce()
        expect(store.getState().commonReducer.currentFile).toBeUndefined()
    })

    it('opens the most recently opened file when files exist', async () => {
        const store = makeStore()
        const loadSample = vi.fn()
        await put({ id: '1', name: 'old.md', content: 'old', lastOpened: '2024-01-01T00:00:00.000Z' })
        await put({ id: '2', name: 'new.md', content: 'newest', lastOpened: '2025-06-01T00:00:00.000Z' })
        await put({ id: '3', name: 'mid.md', content: 'mid', lastOpened: '2024-12-01T00:00:00.000Z' })

        await loadInitialFile({ dispatch: store.dispatch, loadSample })

        expect(loadSample).not.toHaveBeenCalled()
        expect(store.getState().commonReducer.currentFile?.id).toBe('2')
        expect(store.getState().commonReducer.text).toBe('newest')
    })
})
