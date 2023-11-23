import React, {FC, MutableRefObject, Ref, RefObject, useEffect} from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import 'katex/dist/katex.min.css'
import rehypeKatex from "rehype-katex";
import {useAppSelector} from "../store/hooks";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import remarkMermaid from 'rehype-mermaid';
import "../css/markdown.css"
import { remark } from 'remark';
import {Spinner} from "./Spinner";

interface MarkdownViewerProps {
    refObj: RefObject<HTMLDivElement>
}

export const MarkdownViewer:FC<MarkdownViewerProps> = ({refObj})=>{
    const currentFile = useAppSelector(state=>state.commonReducer.currentFile?.content)

    if(currentFile === undefined){
        return <Spinner/>
    }

    const handle =  (node: any, error: string):any =>{
        console.log(error)
        console.log(node.position)
        node.value=error
        return node.value==="mermaid"?{type:"html",value:''}:node
    }

    return (
        <div className="overflow-y-scroll" ref={refObj}>
        <ReactMarkdown sourcePos className="max-h-100 grid-none border-gray-100 border-2 rounded-2xl pl-4 pt-2 pb-2 pr-4 relative print:col-span-2 print:inline print:w-auto print:h-auto print:overflow-visible print:break-after-page print:absolute print:border-none markdown-viewer"
                       children={currentFile}
                       components={{
                            code({node,inlist, className, children, ...props}) {
                               const match = /language-(\w+)/.exec(className || '')
                               return !inlist && match ? (
                                   <SyntaxHighlighter
                                       children={String(children).replace(/\n$/, '') as string}
                                       language={match[1]}
                                       PreTag="div"
                                   />
                               ) : (
                                   <code className={className} {...props}>
                                       {children}
                                   </code>
                               )
                           }
                       }}
                           remarkPlugins={[remarkMath, remarkGfm, [remarkMermaid, { onError : 'fallback', errorFallback:handle }]]}
            rehypePlugins={[rehypeKatex,rehypeRaw]}
        />
        </div>)

}
export default MarkdownViewer
