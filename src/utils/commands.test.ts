import { describe, it, expect, vi } from 'vitest'
import { filterCommands, Command } from './commands'

const cmds: Command[] = [
    { id: 'save', title: 'Save file', run: vi.fn() },
    { id: 'scroll', title: 'Toggle scroll sync', run: vi.fn() },
    { id: 'outline', title: 'Toggle outline', run: vi.fn() },
    { id: 'settings', title: 'Open settings', run: vi.fn() },
]

describe('filterCommands', () => {
    it('returns all commands for an empty query', () => {
        expect(filterCommands(cmds, '')).toHaveLength(4)
        expect(filterCommands(cmds, '   ')).toHaveLength(4)
    })

    it('matches by case-insensitive substring of the title', () => {
        expect(filterCommands(cmds, 'save').map(c => c.id)).toEqual(['save'])
        expect(filterCommands(cmds, 'TOGGLE').map(c => c.id)).toEqual(['scroll', 'outline'])
    })

    it('returns an empty list when nothing matches', () => {
        expect(filterCommands(cmds, 'zzz')).toEqual([])
    })
})
