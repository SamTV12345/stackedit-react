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

export const MarkdownViewer = ()=>{
    const text = useAppSelector(state=>state.commonReducer.text)

    return (
        <ReactMarkdown className="grid-none border-gray-100 border-2 rounded-2xl mr-6 p-2"
                       children={text}
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[rehypeKatex,rehypeRaw]}
        />)

}
export default MarkdownViewer;
