import {commonActions} from "../slices/CommonSlice";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import Editor from "@monaco-editor/react";
import {useSampleFile} from "../hooks/useSampleFile";
import {db} from "../database/Database";
import {useEffect, useState} from "react";
import {useDebounce} from "../hooks/DebounceHook";

export const InputField = ()=>{
    const currentFile = useAppSelector(state=>state.commonReducer.currentFile?.content)
    const dispatch = useAppDispatch()
    const [text, setText] = useState<string>('')

    useDebounce(()=>{
        dispatch(commonActions.setText(text))
    },500,[text])

    useEffect(()=>{
    if(currentFile===undefined){
        db.count('file')
            .then(c=> {
                if (c === 0) {
                    useSampleFile()
                    return <div>Loading</div>
                }
                else{
                    db.getAll('file').then(resp=>{
                        dispatch(commonActions.setCurrentFile(resp.reduce(function (a, b) {
                            return Date.parse(a.lastOpened) > Date.parse(b.lastOpened) ? a : b; })))
                    })
                }
            })
    }
    },[])

    useEffect(()=>{
        if(currentFile && text===''){
            setText(currentFile)
        }
    },[currentFile])

    return <div>{currentFile && <Editor defaultValue={text} language="markdown" options={{wordWrap:'on'}}
                                        onChange={(e)=>{setText(e as string)}} theme='light'
                                        className="rounded-2xl border-gray-100 border-2 p-2 outline-0" />}</div>
}
