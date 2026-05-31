import {FC, KeyboardEvent, ReactNode, useCallback, useEffect, useRef, useState} from "react";
import {clampRatio, parseStoredRatio, ratioFromPointer} from "../utils/splitPane";

interface SplitPaneProps {
    storageKey: string
    left: ReactNode
    right: ReactNode
}

const KEYBOARD_STEP = 0.02

// Two horizontally-resizable panes separated by a draggable divider. The left
// pane's width fraction is persisted to localStorage under `storageKey`.
export const SplitPane: FC<SplitPaneProps> = ({storageKey, left, right}) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [ratio, setRatio] = useState<number>(() => parseStoredRatio(localStorage.getItem(storageKey)))
    const [dragging, setDragging] = useState(false)

    const updateFromClientX = useCallback((clientX: number) => {
        const rect = containerRef.current?.getBoundingClientRect()
        if (!rect) {
            return
        }
        setRatio(clampRatio(ratioFromPointer(clientX, rect.left, rect.width)))
    }, [])

    useEffect(() => {
        if (!dragging) {
            return
        }
        const onMove = (e: MouseEvent) => updateFromClientX(e.clientX)
        const onUp = () => setDragging(false)
        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseup', onUp)
        document.body.style.userSelect = 'none'
        return () => {
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mouseup', onUp)
            document.body.style.userSelect = ''
        }
    }, [dragging, updateFromClientX])

    useEffect(() => {
        localStorage.setItem(storageKey, String(ratio))
    }, [ratio, storageKey])

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
            setRatio(r => clampRatio(r - KEYBOARD_STEP))
            e.preventDefault()
        } else if (e.key === 'ArrowRight') {
            setRatio(r => clampRatio(r + KEYBOARD_STEP))
            e.preventDefault()
        }
    }

    return (
        <div ref={containerRef} className="flex h-full w-full gap-2 pb-2 print:block print:h-auto">
            <div className="min-w-0 h-full grow-0 shrink-0 print:w-full" style={{flexBasis: `${ratio * 100}%`}}>
                {left}
            </div>
            {/* Wide (12px) hit zone with a visible centred grip so the divider is
                easy to grab; the handle highlights on hover/drag/focus. */}
            <div
                role="separator"
                aria-orientation="vertical"
                aria-valuenow={Math.round(ratio * 100)}
                aria-valuemin={20}
                aria-valuemax={80}
                tabIndex={0}
                data-testid="split-divider"
                onMouseDown={(e) => { e.preventDefault(); setDragging(true) }}
                onKeyDown={onKeyDown}
                className={`group flex w-3 shrink-0 cursor-col-resize select-none items-center justify-center focus:outline-hidden print:hidden ${dragging ? 'is-dragging' : ''}`}
            >
                <div className={`h-12 w-1 rounded-full bg-gray-300 transition-colors group-hover:bg-blue-400 group-focus:bg-blue-400 ${dragging ? 'bg-blue-500' : ''}`}/>
            </div>
            <div className="min-w-0 h-full flex-1 print:w-full">
                {right}
            </div>
        </div>
    )
}
