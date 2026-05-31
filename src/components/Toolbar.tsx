import {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBold, faItalic, faLink, faListUl, faQuoteLeft, faCode} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import type {editor} from "monaco-editor";
import {useTranslation} from "react-i18next";
import {applyTransform, TextTransform} from "../utils/applyTransform";
import {insertLink, setHeading, toggleLinePrefix, toggleWrap} from "../utils/markdownFormat";

type IStandaloneCodeEditor = editor.IStandaloneCodeEditor

interface ToolbarButton {
    key: string
    titleKey: string
    icon?: IconDefinition
    label?: string
    transform: TextTransform
}

const BUTTONS: ToolbarButton[] = [
    {key: 'bold', titleKey: 'format-bold', icon: faBold, transform: (v, s, e) => toggleWrap(v, s, e, '**')},
    {key: 'italic', titleKey: 'format-italic', icon: faItalic, transform: (v, s, e) => toggleWrap(v, s, e, '*')},
    {key: 'code', titleKey: 'format-code', icon: faCode, transform: (v, s, e) => toggleWrap(v, s, e, '`')},
    {key: 'h1', titleKey: 'format-heading1', label: 'H1', transform: (v, s, e) => setHeading(v, s, e, 1)},
    {key: 'h2', titleKey: 'format-heading2', label: 'H2', transform: (v, s, e) => setHeading(v, s, e, 2)},
    {key: 'h3', titleKey: 'format-heading3', label: 'H3', transform: (v, s, e) => setHeading(v, s, e, 3)},
    {key: 'link', titleKey: 'format-link', icon: faLink, transform: (v, s, e) => insertLink(v, s, e)},
    {key: 'list', titleKey: 'format-list', icon: faListUl, transform: (v, s, e) => toggleLinePrefix(v, s, e, '- ')},
    {key: 'quote', titleKey: 'format-quote', icon: faQuoteLeft, transform: (v, s, e) => toggleLinePrefix(v, s, e, '> ')},
]

interface ToolbarProps {
    editor: IStandaloneCodeEditor | undefined
}

export const Toolbar: FC<ToolbarProps> = ({editor}) => {
    const {t} = useTranslation()
    const disabled = !editor

    return (
        <div className="flex flex-wrap items-center gap-1 p-1 border-b border-gray-200 print:hidden" role="toolbar"
             aria-label={t('formatting-toolbar')}>
            {BUTTONS.map(button => (
                <button
                    key={button.key}
                    type="button"
                    title={t(button.titleKey)}
                    aria-label={t(button.titleKey)}
                    disabled={disabled}
                    onClick={() => applyTransform(editor, button.transform)}
                    className="w-8 h-8 flex items-center justify-center rounded-sm text-sm text-gray-700 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    {button.icon ? <FontAwesomeIcon icon={button.icon}/> : <span className="font-semibold">{button.label}</span>}
                </button>
            ))}
        </div>
    )
}
