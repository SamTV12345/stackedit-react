import {commonActions} from "../slices/CommonSlice";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import Editor from "@monaco-editor/react";
import {loadInitialFile} from "../hooks/loadInitialFile";
import {FC, useEffect, useState} from "react";
import {useDebounce} from "../hooks/DebounceHook";
import {Spinner} from "./Spinner";
import {setupMonaco} from "../utils/setupMonaco";
import {persistFile} from "../database/FileLib";
import {Toolbar} from "./Toolbar";
import {applyTransform} from "../utils/applyTransform";
import {insertLink, toggleWrap} from "../utils/markdownFormat";
import type {editor} from "monaco-editor";
type IStandaloneCodeEditor = editor.IStandaloneCodeEditor;

interface InputFieldProps {
    editor: IStandaloneCodeEditor|undefined,
    setEditor: (editor: IStandaloneCodeEditor) => void
}

export const InputField:FC<InputFieldProps> = ({editor, setEditor})=>{
    const currentFile = useAppSelector(state=>state.commonReducer.currentFile?.content)
    const currentFileMeta = useAppSelector(state=>state.commonReducer.currentFile)
    const saveStatus = useAppSelector(state=>state.commonReducer.saveStatus)
    const dispatch = useAppDispatch()
    const text = useAppSelector(state=>state.commonReducer.text)
    const [monacoReady, setMonacoReady] = useState(false)

    useDebounce(()=>{
        dispatch(commonActions.setText(text))
    },500,[text])

    // Autosave: persist silently to IndexedDB a short while after typing stops.
    useDebounce(()=>{
        if(currentFileMeta && saveStatus === 'dirty'){
            persistFile(currentFileMeta.id, currentFileMeta.name, text, {silent: true})
        }
    },1500,[text])

    useEffect(()=>{
        let active = true
        setupMonaco().then(()=>{ if(active) setMonacoReady(true) })
        return ()=>{ active = false }
    },[])

    useEffect(()=>{
        if(currentFile===undefined){
            loadInitialFile({dispatch})
        }
    },[])

    const registerShortcuts = (instance: IStandaloneCodeEditor, monaco: typeof import("monaco-editor")) => {
        const {CtrlCmd} = monaco.KeyMod
        const {KeyB, KeyI, KeyK} = monaco.KeyCode
        instance.addAction({id: 'md-bold', label: 'Bold', keybindings: [CtrlCmd | KeyB],
            run: () => applyTransform(instance, (v, s, e) => toggleWrap(v, s, e, '**'))})
        instance.addAction({id: 'md-italic', label: 'Italic', keybindings: [CtrlCmd | KeyI],
            run: () => applyTransform(instance, (v, s, e) => toggleWrap(v, s, e, '*'))})
        instance.addAction({id: 'md-link', label: 'Link', keybindings: [CtrlCmd | KeyK],
            run: () => applyTransform(instance, (v, s, e) => insertLink(v, s, e))})
    }

    if(!monacoReady){
        return <Spinner/>
    }

    return <div className="flex flex-col h-full">
        <Toolbar editor={editor}/>
        <div className="flex-1 min-h-0">
            {text!==undefined&& <Editor value={text} language="markdown" height="100%" options={{wordWrap:'on'}}
                                        onMount={(instance, monaco) => {setEditor(instance); registerShortcuts(instance, monaco)}}
                                        onChange={(e)=>{dispatch(commonActions.setEditorText(e as string))}} theme='light'
                                        className="rounded-2xl border-gray-100 border-2 p-2 outline-0 print:hidden" />}
        </div>
    </div>
}
