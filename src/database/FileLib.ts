import {v4 as uuidv4} from "uuid";
import {db} from "./Database";
import {commonActions, File} from "../slices/CommonSlice";
import {AppDispatch, store} from "../store/store";
import {displayFileNotFound, updatedFile, updatedFileErrored, updatedFilename} from "../utils/AlertEvents";

export  const saveFile = (content:string, name:string, dispatch: AppDispatch, files: File[])=>{
        const id = uuidv4()
        const fileToSave = {lastOpened:Date.now().toString(),content, name,id, repo:"Your repo"}
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
                db.put("file",f).then(()=>{
                    const currentFiles = store.getState().commonReducer.files
                    const filesWithCurrentIdRemoved = currentFiles.filter(f=>f.id!==id)
                    store.dispatch(commonActions.setFiles([...filesWithCurrentIdRemoved,f]))
                    updatedFile(f.name)
                })
            })
            .catch(()=>updatedFileErrored(name))
}

function updateFiles(id: string, f: File) {
    // Edit file redux store
    const currentFiles = store.getState().commonReducer.files
    const filesWithCurrentIdRemoved = currentFiles.filter(f => f.id !== id)
    store.dispatch(commonActions.setFiles([f, ...filesWithCurrentIdRemoved]))
}

export const updateFileName = (id:string, name:string)=>{
        db.get("file",id).then(f=>{
                if(f===undefined){
                        displayFileNotFound(id)
                        return
                }
                f.name = name
                db.put("file",f)
                    .then(()=>{
                        updateFiles(id, f)
                        updatedFilename(id,f.name)
                    })
        }).catch(()=>console.log("Error"))
}

export const updateRepoName = (id:string, repoName:string)=>{
    db.get("file",id)
        .then(f=>{
            if(f===undefined){
                console.log("Not found")
                return
            }
            f.repo = repoName

            db.put("file", f).then(()=>{
                updateFiles(id, f)
            })
        })
}

export const deleteFile = (id:string)=>{
        db.delete("file",id)
            .then(()=>{
                    const currentFiles = store.getState().commonReducer.files
                    const filesWithCurrentIdRemoved = currentFiles.filter(f=>f.id!==id)
                    store.dispatch(commonActions.setFiles(filesWithCurrentIdRemoved))

            })
}
