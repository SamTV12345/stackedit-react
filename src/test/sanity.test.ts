import { describe, it, expect } from 'vitest'
import { makeStore } from '../store/store'

describe('test harness', () => {
    it('creates an isolated redux store', () => {
        const store = makeStore()
        expect(store.getState().commonReducer.text).toBe('')
    })

    it('has a working fake IndexedDB', () => {
        expect(typeof indexedDB.open).toBe('function')
    })
})
