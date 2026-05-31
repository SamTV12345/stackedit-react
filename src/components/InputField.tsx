import {commonActions} from "../slices/CommonSlice";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import Editor from "@monaco-editor/react";
import {loadInitialFile} from "../hooks/loadInitialFile";
import {FC, useEffect, useState} from "react";
import {useDebounce} from "../hooks/DebounceHook";
import {Spinner} from "./Spinner";
import {setupMonaco} from "../utils/setupMonaco";
import type {editor} from "monaco-editor";
type IStandaloneCodeEditor = editor.IStandaloneCodeEditor;

interface InputFieldProps {
    editor: IStandaloneCodeEditor|undefined,
    setEditor: (editor: IStandaloneCodeEditor) => void
}

export const InputField:FC<InputFieldProps> = ({editor, setEditor})=>{
    const currentFile = useAppSelector(state=>state.commonReducer.currentFile?.content)
    const dispatch = useAppDispatch()
    const text = useAppSelector(state=>state.commonReducer.text)
    const [monacoReady, setMonacoReady] = useState(false)

    useDebounce(()=>{
        dispatch(commonActions.setText(text))
    },500,[text])

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

    if(!monacoReady){
        return <Spinner/>
    }

    return <div>{text!==undefined&& <Editor value={text} language="markdown" options={{wordWrap:'on'}}
                                            onMount={(editor, monaco) => {setEditor(editor)}}
                                                               onChange={(e)=>{dispatch(commonActions.setEditorText(e as string))}} theme='light'
                                                               className="max-h-100 rounded-2xl border-gray-100 border-2 p-2 outline-0 print:hidden" />}</div>
}
