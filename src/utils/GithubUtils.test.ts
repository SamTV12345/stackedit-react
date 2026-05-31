import { describe, it, expect, beforeEach, vi } from 'vitest'
import axios from 'axios'
import { uploadFileToRegistry, GithubHttpClient } from './GithubUtils'
import { store } from '../store/store'
import { alertActions, AlertTypes } from '../slices/AlertSlice'

const alertState = () => store.getState().alertReducer

const makeClient = (overrides: Partial<GithubHttpClient> = {}): { client: GithubHttpClient; puts: Array<{ url: string; body: any }> } => {
    const puts: Array<{ url: string; body: any }> = []
    const client: GithubHttpClient = {
        get: vi.fn().mockRejectedValue(new Error('not found')),
        put: vi.fn().mockImplementation((url: string, body: any) => {
            puts.push({ url, body })
            return Promise.resolve({ data: {} })
        }),
        ...overrides,
    }
    return { client, puts }
}

beforeEach(() => {
    store.dispatch(alertActions.setOpen(false))
    delete (axios.defaults.headers as any).Authorization
})

describe('uploadFileToRegistry', () => {
    it('uploads a new file (no existing sha) and reports success', async () => {
        const { client, puts } = makeClient()
        await uploadFileToRegistry('tok', 'notes.md', 'octocat', 'repo', 'hello', client)

        expect(puts).toHaveLength(1)
        expect(puts[0].body.sha).toBeUndefined()
        expect(alertState().type).toBe(AlertTypes.SUCCESS)
        expect(alertState().open).toBe(true)
    })

    it('includes the existing sha when updating a file that already exists', async () => {
        const { client, puts } = makeClient({
            get: vi.fn().mockResolvedValue({ data: { sha: 'abc123' } }),
        })
        await uploadFileToRegistry('tok', 'notes.md', 'octocat', 'repo', 'hello', client)

        expect(puts[0].body.sha).toBe('abc123')
        expect(alertState().type).toBe(AlertTypes.SUCCESS)
    })

    it('base64-encodes the content in the payload', async () => {
        const { client, puts } = makeClient()
        await uploadFileToRegistry('tok', 'notes.md', 'octocat', 'repo', 'hello', client)

        expect(puts[0].body.content).toBe(btoa('hello'))
    })

    it('reports an error when the upload (PUT) fails', async () => {
        const { client } = makeClient({
            put: vi.fn().mockRejectedValue(new Error('403')),
        })
        await uploadFileToRegistry('tok', 'notes.md', 'octocat', 'ghost', 'hello', client)

        expect(alertState().type).toBe(AlertTypes.ERROR)
        expect(alertState().open).toBe(true)
    })

    it('does not mutate the global axios Authorization default', async () => {
        const { client } = makeClient()
        await uploadFileToRegistry('secret-token', 'notes.md', 'octocat', 'repo', 'hello', client)

        expect((axios.defaults.headers as any).Authorization).toBeUndefined()
    })
})
