import {FC, useEffect} from "react";
import mermaid from "mermaid";

interface MermaidProps {
    chart:any
}

export const Mermaid:FC<MermaidProps> = ({chart})=>{
    useEffect(mermaid.contentLoaded(),
        [])
    return <div className="mermaid">{chart}</div>
}
