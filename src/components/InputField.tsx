import {commonActions} from "../slices/CommonSlice";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import Editor from "@monaco-editor/react";
import {useSampleFile} from "../hooks/useSampleFile";
import {db} from "../database/Database";
import {useEffect} from "react";

export const InputField = ()=>{
    const currentFile = useAppSelector(state=>state.commonReducer.currentFile?.content)
    const dispatch = useAppDispatch()

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

    return <div>{currentFile && <Editor defaultValue={currentFile} language="markdown" options={{wordWrap:'on'}} onChange={(e)=>{dispatch(commonActions.setText(e))}} theme='light'
                                        className="rounded-2xl border-gray-100 border-2 p-2 outline-0" />}</div>
}
