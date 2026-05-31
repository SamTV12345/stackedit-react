import {FC, useEffect, useRef, useState} from "react";
import {PrismAsync as SyntaxHighlighter} from 'react-syntax-highlighter'
import {oneLight} from 'react-syntax-highlighter/dist/esm/styles/prism'
import {useTranslation} from "react-i18next";

interface CodeBlockProps {
    language: string
    value: string
}

// A fenced code block with a header showing the language and a copy-to-clipboard
// button (with a transient "Copied" confirmation).
export const CodeBlock: FC<CodeBlockProps> = ({language, value}) => {
    const {t} = useTranslation()
    const [copied, setCopied] = useState(false)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

    useEffect(() => () => clearTimeout(timeoutRef.current), [])

    const copy = () => {
        navigator.clipboard?.writeText(value).then(() => {
            setCopied(true)
            clearTimeout(timeoutRef.current)
            timeoutRef.current = setTimeout(() => setCopied(false), 1500)
        })
    }

    return (
        <div className="my-3 overflow-hidden rounded-lg border border-gray-200">
            <div className="flex items-center justify-between bg-gray-100 px-3 py-1 text-xs text-gray-500">
                <span className="font-mono">{language}</span>
                <button
                    type="button"
                    onClick={copy}
                    className="rounded-sm px-2 py-0.5 hover:bg-gray-200"
                >
                    {copied ? t('copied') : t('copy')}
                </button>
            </div>
            <SyntaxHighlighter
                language={language}
                style={oneLight}
                PreTag="div"
                customStyle={{margin: 0, borderRadius: 0, fontSize: '0.9em', background: '#fafafa'}}
            >
                {value}
            </SyntaxHighlighter>
        </div>
    )
}
