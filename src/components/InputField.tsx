import {commonActions} from "../slices/CommonSlice";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import Editor from "@monaco-editor/react";
import {useSampleFile} from "../hooks/useSampleFile";
import {db} from "../database/Database";
import {useEffect} from "react";
import {useDebounce} from "../hooks/DebounceHook";


export const InputField = ()=>{
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
                    useSampleFile()
                    return <div>Loading</div>
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
                                                               onChange={(e)=>{dispatch(commonActions.setEditorText(e as string))}} theme='light'
                                                               className="rounded-2xl border-gray-100 border-2 p-2 outline-0 print:hidden" />}</div>
}
