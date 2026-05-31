import { describe, it, expect, vi } from 'vitest'
import { runEditorAction, FIND_ACTION, REPLACE_ACTION } from './editorActions'

const makeFakeEditor = () => {
    const run = vi.fn()
    const getAction = vi.fn().mockReturnValue({ run })
    return { editor: { focus: vi.fn(), getAction } as any, run, getAction }
}

describe('runEditorAction', () => {
    it('runs the requested Monaco action', () => {
        const { editor, run, getAction } = makeFakeEditor()
        runEditorAction(editor, FIND_ACTION)
        expect(getAction).toHaveBeenCalledWith(FIND_ACTION)
        expect(run).toHaveBeenCalled()
    })

    it('runs the replace action', () => {
        const { editor, getAction } = makeFakeEditor()
        runEditorAction(editor, REPLACE_ACTION)
        expect(getAction).toHaveBeenCalledWith(REPLACE_ACTION)
    })

    it('is a no-op when there is no editor', () => {
        expect(() => runEditorAction(undefined, FIND_ACTION)).not.toThrow()
    })

    it('is safe when the action is not registered', () => {
        const editor = { focus: vi.fn(), getAction: vi.fn().mockReturnValue(undefined) } as any
        expect(() => runEditorAction(editor, FIND_ACTION)).not.toThrow()
    })
})
