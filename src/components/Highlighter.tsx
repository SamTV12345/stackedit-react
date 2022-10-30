import {useEffect} from "react";
// @ts-ignore
import Prism from "prismjs"
export const Highlighter = ()=>{

    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return <pre>
        <code className="language-markdown">
            ## Test123
        </code>
    </pre>
}
