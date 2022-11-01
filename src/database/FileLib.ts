import {v4 as uuidv4} from "uuid";
import {db} from "./Database";
import {commonActions, File} from "../slices/CommonSlice";
import {AppDispatch, store} from "../store/store";

export  const saveFile = (content:string, name:string, dispatch: AppDispatch, files: File[])=>{
        const id = uuidv4()
        const fileToSave = {lastOpened:new Date().toString(),content:content, name,id:id}
        db.put("file",fileToSave)
            .then(()=>dispatch(commonActions.setFiles([...files,fileToSave])))
            .catch(e=>console.log(e))
        return fileToSave
}

export const updateFile =(id:string, name:string,content:string)=>{
        db.get("file",id).then(f=>{
                if(f===undefined){
                        console.log("Not found")
                        return
                }
                f.content= content
                f.name = name
                f.lastOpened = Date.now().toString()
                db.put("file",f)
        }).catch(()=>console.log("Error"))
}
