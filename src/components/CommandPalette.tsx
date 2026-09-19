import {FC, KeyboardEvent, useEffect, useMemo, useRef, useState} from "react";
import {createPortal} from "react-dom";
import {useTranslation} from "react-i18next";
import type {editor} from "monaco-editor";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {commonActions} from "../slices/CommonSlice";
import {updateFile} from "../database/FileLib";
import {applyTransform} from "../utils/applyTransform";
import {insertLink, toggleWrap} from "../utils/markdownFormat";
import {runEditorAction, FIND_ACTION, REPLACE_ACTION} from "../utils/editorActions";
import {Command, filterCommands} from "../utils/commands";

type IStandaloneCodeEditor = editor.IStandaloneCodeEditor

interface CommandPaletteProps {
    editor: IStandaloneCodeEditor | undefined
}

export const CommandPalette: FC<CommandPaletteProps> = ({editor}) => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const open = useAppSelector(state => state.commonReducer.commandPaletteOpen)
    const currentFile = useAppSelector(state => state.commonReducer.currentFile)
    const scrollSync = useAppSelector(state => state.commonReducer.scrollSync)
    const rtl = useAppSelector(state => state.commonReducer.rtl)
    const text = useAppSelector(state => state.commonReducer.text)

    const [query, setQuery] = useState('')
    const [activeIndex, setActiveIndex] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null)

    const close = () => dispatch(commonActions.setCommandPaletteOpen(false))

    // Global shortcut (capture phase so it wins even when Monaco has focus).
    useEffect(() => {
        const onKey = (e: globalThis.KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'P' || e.key === 'p')) {
                e.preventDefault()
                e.stopPropagation()
                dispatch(commonActions.setCommandPaletteOpen(true))
            }
        }
        window.addEventListener('keydown', onKey, true)
        return () => window.removeEventListener('keydown', onKey, true)
    }, [dispatch])

    const commands: Command[] = useMemo(() => [
        {id: 'save', title: t('cmd-save'), run: () => currentFile && updateFile(currentFile.id, currentFile.name, text)},
        {id: 'file-manager', title: t('cmd-file-manager'), run: () => dispatch(commonActions.setFileMenuOpen(true))},
        {id: 'settings', title: t('cmd-settings'), run: () => dispatch(commonActions.setSettingsMenuOpen(true))},
        {id: 'toggle-scroll-sync', title: t('cmd-toggle-scroll-sync'), run: () => dispatch(commonActions.setScrollSync(!scrollSync))},
        {id: 'toggle-outline', title: t('cmd-toggle-outline'), run: () => dispatch(commonActions.toggleOutline())},
        {id: 'toggle-rtl', title: t('cmd-toggle-rtl'), run: () => dispatch(commonActions.setRtl(!rtl))},
        {id: 'bold', title: t('format-bold'), run: () => applyTransform(editor, (v, s, e) => toggleWrap(v, s, e, '**'))},
        {id: 'italic', title: t('format-italic'), run: () => applyTransform(editor, (v, s, e) => toggleWrap(v, s, e, '*'))},
        {id: 'link', title: t('format-link'), run: () => applyTransform(editor, (v, s, e) => insertLink(v, s, e))},
        {id: 'find', title: t('format-find'), run: () => runEditorAction(editor, FIND_ACTION)},
        {id: 'replace', title: t('format-replace'), run: () => runEditorAction(editor, REPLACE_ACTION)},
    ], [t, dispatch, currentFile, scrollSync, rtl, text, editor])

    const filtered = filterCommands(commands, query)

    useEffect(() => {
        if (open) {
            setQuery('')
            setActiveIndex(0)
            const id = setTimeout(() => inputRef.current?.focus(), 0)
            return () => clearTimeout(id)
        }
    }, [open])

    useEffect(() => { setActiveIndex(0) }, [query])

    if (!open) {
        return null
    }

    const runAt = (index: number) => {
        const command = filtered[index]
        if (command) {
            close()
            command.run()
        }
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            setActiveIndex(i => Math.min(filtered.length - 1, i + 1)); e.preventDefault()
        } else if (e.key === 'ArrowUp') {
            setActiveIndex(i => Math.max(0, i - 1)); e.preventDefault()
        } else if (e.key === 'Enter') {
            runAt(activeIndex); e.preventDefault()
        } else if (e.key === 'Escape') {
            close(); e.preventDefault()
        }
    }

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 pt-24" onClick={close}>
            <div className="w-full max-w-lg rounded-lg bg-white shadow-xl" onClick={e => e.stopPropagation()}>
                <input
                    ref={inputRef}
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder={t('command-palette-placeholder')}
                    aria-label={t('command-palette')}
                    className="w-full border-b border-gray-200 px-4 py-3 outline-hidden"
                />
                <ul className="max-h-80 overflow-y-auto py-1" role="listbox">
                    {filtered.length === 0 ? (
                        <li className="px-4 py-2 text-gray-400">{t('command-palette-empty')}</li>
                    ) : filtered.map((command, index) => (
                        <li key={command.id} role="option" aria-selected={index === activeIndex}>
                            <button
                                type="button"
                                onMouseEnter={() => setActiveIndex(index)}
                                onClick={() => runAt(index)}
                                className={`w-full px-4 py-2 text-left ${index === activeIndex ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                            >
                                {command.title}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>,
        document.body,
    )
}
