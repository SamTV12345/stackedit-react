import {FC, useEffect, useRef, useState} from "react";

// mermaid is ~1.4MB; load it on demand the first time a diagram is rendered
// and reuse the same instance afterwards.
let mermaidPromise: Promise<typeof import("mermaid")["default"]> | null = null

const loadMermaid = () => {
    if (!mermaidPromise) {
        mermaidPromise = import("mermaid").then(mod => {
            mod.default.initialize({startOnLoad: false, theme: "default"})
            return mod.default
        })
    }
    return mermaidPromise
}

let diagramCounter = 0

interface MermaidProps {
    chart: string
}

export const Mermaid: FC<MermaidProps> = ({chart}) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [svg, setSvg] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let active = true
        setError(null)
        loadMermaid()
            .then(mermaid => mermaid.render(`mermaid-diagram-${diagramCounter++}`, chart))
            .then(({svg}) => { if (active) setSvg(svg) })
            .catch((e: unknown) => { if (active) setError(e instanceof Error ? e.message : String(e)) })
        return () => { active = false }
    }, [chart])

    if (error) {
        return <pre className="my-3 rounded-md bg-red-50 p-3 text-sm whitespace-pre-wrap text-red-600" data-testid="mermaid-error">{error}</pre>
    }

    // text-center centers narrow diagrams; overflow-x-auto lets wide ones scroll
    // (the rendered <svg> is inline, so both behaviours work on one container).
    return (
        <div
            ref={containerRef}
            className="mermaid my-3 overflow-x-auto text-center"
            data-testid="mermaid"
            dangerouslySetInnerHTML={{__html: svg}}
        />
    )
}
