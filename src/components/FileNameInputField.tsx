import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {commonActions} from "../slices/CommonSlice";
import {updateFileName} from "../database/FileLib";



export const FileNameInputField = ()=>{
    const [isEditable, setEditable] = useState<boolean>(false)
    const fileName = useAppSelector(state=>state.commonReducer.currentFile?.name)
    const fileId = useAppSelector(state=>state.commonReducer.currentFile?.id)
    const dispatch = useAppDispatch()

    const  modifyFileName = () =>{
        if (fileId === undefined || fileName === undefined) {
            console.log("Error file id unknown")
            return
        }
        setEditable(false)
        updateFileName(fileId, fileName)
    }

    return isEditable?<input className="text-black p-1 pl-2 pr-2" onBlur={()=>{
        modifyFileName()
    }} onKeyDown={(k)=>k.key==='Enter'&&modifyFileName()} value={fileName} onChange={(v)=>{
        dispatch(commonActions.setName(v.target.value))
    }}/>:<div onDoubleClick={()=>setEditable(true)}>{fileName}</div>
}
