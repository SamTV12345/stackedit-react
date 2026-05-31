import React, {FC, RefObject, useMemo} from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import 'katex/dist/katex.min.css'
import rehypeKatex from "rehype-katex";
import {useAppSelector} from "../store/hooks";
import {PrismAsync as SyntaxHighlighter} from 'react-syntax-highlighter'
import "../css/markdown.css"
import {Spinner} from "./Spinner";
import {Mermaid} from "./Mermaid";
import {getCodeLanguage} from "../utils/codeLanguage";

interface MarkdownViewerProps {
    refObj: RefObject<HTMLDivElement>
}

// react-syntax-highlighter (PrismAsync) loads each language grammar on demand,
// and mermaid is rendered via a lazily-imported component, so neither is bundled
// into the eager path.
const markdownComponents = {
    code({className, children, ...props}: any) {
        const language = getCodeLanguage(className)
        const value = String(children).replace(/\n$/, '')

        if (language === 'mermaid') {
            return <Mermaid chart={value}/>
        }
        if (language) {
            return <SyntaxHighlighter language={language} PreTag="div">{value}</SyntaxHighlighter>
        }
        return <code className={className} {...props}>{children}</code>
    }
}

const remarkPlugins = [remarkMath, remarkGfm]
const rehypePlugins = [rehypeKatex, rehypeRaw]

const MarkdownViewerImpl: FC<MarkdownViewerProps> = ({refObj}) => {
    const currentFile = useAppSelector(state => state.commonReducer.currentFile?.content)

    // Components/plugin arrays are module constants, but memo keeps referential
    // stability obvious and lets React.memo short-circuit unchanged renders.
    const components = useMemo(() => markdownComponents, [])

    if (currentFile === undefined) {
        return <Spinner/>
    }

    return (
        <div className="overflow-y-scroll" ref={refObj}>
            {/* react-markdown v10 dropped the className prop; style a wrapper instead. */}
            <div className="max-h-100 grid-none border-gray-100 border-2 rounded-2xl pl-4 pt-2 pb-2 pr-4 relative print:col-span-2 print:inline print:w-auto print:h-auto print:overflow-visible print:break-after-page print:absolute print:border-none markdown-viewer">
                <ReactMarkdown
                    children={currentFile}
                    components={components}
                    remarkPlugins={remarkPlugins}
                    rehypePlugins={rehypePlugins}
                />
            </div>
        </div>)
}

export const MarkdownViewer = React.memo(MarkdownViewerImpl)
export default MarkdownViewer
