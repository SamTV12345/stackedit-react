import {commonActions} from "../slices/CommonSlice";
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {updateRepoName} from "../database/FileLib";

export const RepoNameInputField = ()=>{
    const [isEditable, setEditable] = useState<boolean>(false)
    const repoName = useAppSelector(state=>state.commonReducer.currentFile?.repo)
    const fileId = useAppSelector(state=>state.commonReducer.currentFile?.id)
    const dispatch = useAppDispatch()

    const  modifyRepoName = () =>{
        if (fileId === undefined || repoName === undefined) {
            console.log("Error file id unknown")
            return
        }
        setEditable(false)
        updateRepoName(fileId, repoName)
    }

    return isEditable?<input className="text-black p-1 pl-2 pr-2" onBlur={()=>{
        modifyRepoName()
    }} onKeyDown={(k)=>k.key==='Enter'&&modifyRepoName()} value={repoName} onChange={(v)=>{
        dispatch(commonActions.setRepoName(v.target.value))
    }}/>:<div className="text-white " onDoubleClick={()=>setEditable(true)}>{repoName}</div>
}
