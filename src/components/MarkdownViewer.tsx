import React from 'react';
import ReactMarkdown from 'react-markdown';
// @ts-ignore
import { BlockMath, InlineMath } from 'react-katex';
import rehypeRaw from 'rehype-raw'
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import "highlight.js/styles/github.css";
import 'katex/dist/katex.min.css'
import rehypeKatex from "rehype-katex";
import {useAppSelector} from "../store/hooks";
import rehypeHighlight from "rehype-highlight";
// @ts-ignore
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'

export const MarkdownViewer = ()=>{
    const text = useAppSelector(state=>state.commonReducer.text)

    return (
        <ReactMarkdown className="grid-none border-gray-100 border-2 rounded-2xl pl-4 pt-2 pb-2 pr-4 overflow-scroll"
                       children={text}
                       components={{
                           code({node, inline, className, children, ...props}) {
                               const match = /language-(\w+)/.exec(className || '')
                               return !inline && match ? (
                                   <SyntaxHighlighter
                                       children={String(children).replace(/\n$/, '')}
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
                           remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[rehypeKatex,rehypeRaw]}
        />)

}
export default MarkdownViewer;
