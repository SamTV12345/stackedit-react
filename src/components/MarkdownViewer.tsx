import React, {useEffect} from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import 'katex/dist/katex.min.css'
import rehypeKatex from "rehype-katex";
import {useAppSelector} from "../store/hooks";
// @ts-ignore
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import remarkMermaid from 'remark-mermaidjs';
import "../css/markdown.css"
import { remark } from 'remark';
import {Spinner} from "./Spinner";

export const MarkdownViewer = ()=>{
    const currentFile = useAppSelector(state=>state.commonReducer.currentFile?.content)


    useEffect(()=>{
        remark().use(remarkMermaid).process(currentFile, (err, file) => {
            console.log(String(file))
        })

    },[])
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
        <ReactMarkdown className="max-h-100 grid-none border-gray-100 border-2 rounded-2xl pl-4 pt-2 pb-2 pr-4 overflow-auto relative print:col-span-2 print:inline print:w-auto print:h-auto print:overflow-visible print:break-after-page print:absolute print:border-none"
                       children={currentFile}
                       components={{
                            code({node, inline, className, children, ...props}) {
                               const match = /language-(\w+)/.exec(className || '')
                               return !inline && match ? (
                                   <SyntaxHighlighter
                                       children={String(children).replace(/\n$/, '') as string}
                                       language={match[1]}
                                       PreTag="div"
                                       {...props}
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
        />)

}
export default MarkdownViewer
