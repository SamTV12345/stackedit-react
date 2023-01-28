import {db} from "./Database";
import {commonActions, File} from "../slices/CommonSlice";
import {store} from "../store/store";
import {displayFileNotFound, updatedFile, updatedFileErrored, updatedFilename} from "../utils/AlertEvents";
import {alertActions, AlertTypes} from "../slices/AlertSlice";

export  const saveFile = (content:string, name:string)=>{
        const id = crypto.randomUUID()
        const fileToSave = {lastOpened: new Date().toISOString(),content, name,id, repo:"Your repo"}
        db.put("file",fileToSave)
            .then(()=>store.dispatch(commonActions.setFiles([...store.getState().commonReducer.files,fileToSave])))
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
                f.lastOpened = new Date().toISOString()
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

export const findFileById = (id:string)=>{
    return db.get("file",id)
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

export const importAndOverrideFile = (file: File)=>{
    console.log(file)
    findFileById(file.id)
        .then(f=>{
            if(f===undefined){
                return
            }
            console.log(file.id)
            updateFile(file.id,file.name,file.content)
            const currentFileId = store.getState().commonReducer.currentFile?.id
            if(currentFileId===f.id) {
                store.dispatch(commonActions.setEditorText(file.content))
                store.dispatch(commonActions.setText(file.content))
                store.dispatch(commonActions.setCurrentFile(file))
            }
            store.dispatch(alertActions.setAlerting({open: true,type: AlertTypes.SUCESS,message: "File imported successfully",title:"Imported succesfully"}))
            store.dispatch(alertActions.setOpen(true))
        })
}
