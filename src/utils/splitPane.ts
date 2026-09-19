// Bounds for the editor/preview split, expressed as the leading pane's fraction
// of the container width. The leading pane is the left one, or the right one
// when the layout runs right-to-left.
export const MIN_RATIO = 0.2
export const MAX_RATIO = 0.8

export const clampRatio = (ratio: number, min = MIN_RATIO, max = MAX_RATIO): number =>
    Math.min(max, Math.max(min, ratio))

// Unclamped fraction (may be <0 or >1) of the pointer's horizontal position within a container rect.
// The ratio always describes the leading pane, which is anchored to the right
// edge in RTL, so the fraction is mirrored there.
export const ratioFromPointer = (clientX: number, rectLeft: number, rectWidth: number, rtl = false): number => {
    if (rectWidth <= 0) {
        return 0.5
    }
    const fraction = (clientX - rectLeft) / rectWidth
    return rtl ? 1 - fraction : fraction
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
