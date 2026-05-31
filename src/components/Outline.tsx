import {FC, useMemo} from "react";
import type {editor} from "monaco-editor";
import {useTranslation} from "react-i18next";
import {useAppSelector} from "../store/hooks";
import {extractHeadings} from "../utils/extractHeadings";

type IStandaloneCodeEditor = editor.IStandaloneCodeEditor

interface OutlineProps {
    editor: IStandaloneCodeEditor | undefined
}

export const Outline: FC<OutlineProps> = ({editor}) => {
    const {t} = useTranslation()
    const content = useAppSelector(state => state.commonReducer.currentFile?.content ?? '')
    const headings = useMemo(() => extractHeadings(content), [content])

    const goTo = (line: number) => {
        if (!editor) {
            return
        }
        editor.revealLineNearTop(line)
        editor.setPosition({lineNumber: line, column: 1})
        editor.focus()
    }

    return (
        <nav className="w-64 shrink-0 h-full overflow-y-auto border-r border-gray-200 p-2 text-sm print:hidden"
             aria-label={t('outline')}>
            <h2 className="px-2 py-1 font-semibold text-gray-500 uppercase text-xs tracking-wide">{t('outline')}</h2>
            {headings.length === 0 ? (
                <p className="px-2 py-1 text-gray-400">{t('outline-empty')}</p>
            ) : (
                <ul>
                    {headings.map((h, i) => (
                        <li key={`${h.line}-${i}`}>
                            <button
                                type="button"
                                onClick={() => goTo(h.line)}
                                className="w-full text-left truncate rounded-sm px-2 py-1 text-gray-700 hover:bg-gray-200"
                                style={{paddingLeft: `${(h.level - 1) * 12 + 8}px`}}
                                title={h.text}
                            >
                                {h.text}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    )
}
