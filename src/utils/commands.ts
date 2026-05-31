export interface Command {
    id: string
    title: string
    run: () => void
}

// Filters commands by a case-insensitive substring of their title. An empty
// (or whitespace-only) query returns all commands.
export const filterCommands = (commands: Command[], query: string): Command[] => {
    const q = query.trim().toLowerCase()
    if (q.length === 0) {
        return commands
    }
    return commands.filter(c => c.title.toLowerCase().includes(q))
}
