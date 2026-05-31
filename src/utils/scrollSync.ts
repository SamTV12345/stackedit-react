// Maps a scroll position from a source scrollable region onto a target one by
// preserving the scroll fraction. sourceMax/targetMax are (scrollHeight -
// clientHeight) for each region.
export const proportionalScrollTop = (
    sourceTop: number,
    sourceMax: number,
    targetMax: number,
): number => {
    if (sourceMax <= 0) {
        return 0
    }
    const fraction = sourceTop / sourceMax
    const target = fraction * targetMax
    return Math.max(0, Math.min(targetMax, target))
}
