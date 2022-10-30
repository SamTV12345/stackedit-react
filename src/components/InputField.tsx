import {commonActions} from "../slices/CommonSlice";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import Editor from "@monaco-editor/react";

export const InputField = ()=>{
    const text = useAppSelector(state=>state.commonReducer.text)
    const dispatch = useAppDispatch()

    return <Editor language="markdown" value={text} onChange={(e)=>dispatch(commonActions.setText(e))} theme='light'
                     className="rounded-2xl border-gray-100 border-2 p-2 outline-0"/>
}
