import {commonActions} from "../slices/CommonSlice";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import Editor from "@monaco-editor/react";
import {getSampleFile} from "../hooks/getSampleFile";
import {db} from "../database/Database";
import {FC, useEffect, useState} from "react";
import {useDebounce} from "../hooks/DebounceHook";
import {Spinner} from "./Spinner";
import {editor} from "monaco-editor";
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;

interface InputFieldProps {
    editor: IStandaloneCodeEditor|undefined,
    setEditor: (editor: IStandaloneCodeEditor) => void
}

export const InputField:FC<InputFieldProps> = ({editor, setEditor})=>{
    const currentFile = useAppSelector(state=>state.commonReducer.currentFile?.content)
    const dispatch = useAppDispatch()
    const text = useAppSelector(state=>state.commonReducer.text)

    useDebounce(()=>{
        dispatch(commonActions.setText(text))
    },500,[text])

    useEffect(()=>{
    if(currentFile===undefined){
        db.count('file')
            .then(c=> {
                if (c === 0) {
                    getSampleFile()
                    return <Spinner/>
                }
                else{
                    db.getAll('file').then(resp=>{
                        const file = resp.reduce( (a, b) =>{
                            return a.lastOpened > b.lastOpened ? a : b })
                        dispatch(commonActions.setCurrentFile(file))
                        dispatch(commonActions.setEditorText(file.content))
                    })
                }
            })
    }
    },[])


    return <div>{text!==undefined&& <Editor value={text} language="markdown" options={{wordWrap:'on'}}
                                            onMount={(editor, monaco) => {setEditor(editor)}}
                                                               onChange={(e)=>{dispatch(commonActions.setEditorText(e as string))}} theme='light'
                                                               className="max-h-100 rounded-2xl border-gray-100 border-2 p-2 outline-0 print:hidden" />}</div>
}
