// Bounds for the editor/preview split, expressed as the left pane's fraction
// of the container width.
export const MIN_RATIO = 0.2
export const MAX_RATIO = 0.8

export const clampRatio = (ratio: number, min = MIN_RATIO, max = MAX_RATIO): number =>
    Math.min(max, Math.max(min, ratio))

// Fraction (0..1) of the pointer's horizontal position within a container rect.
export const ratioFromPointer = (clientX: number, rectLeft: number, rectWidth: number): number => {
    if (rectWidth <= 0) {
        return 0.5
    }
    return (clientX - rectLeft) / rectWidth
}

// Parse a persisted ratio string, clamping valid values and falling back when
// the value is missing or not a finite number.
export const parseStoredRatio = (raw: string | null, fallback = 0.5): number => {
    if (raw === null) {
        return fallback
    }
    const value = Number(raw)
    return Number.isFinite(value) ? clampRatio(value) : fallback
}
