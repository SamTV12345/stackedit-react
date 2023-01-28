import {commonActions, File as MyFile} from "../slices/CommonSlice";
import {useAppDispatch} from "../store/hooks";
import {useRef, useState} from "react";
import {alertActions, AlertTypes} from "../slices/AlertSlice";
import {findFileById, importAndOverrideFile, saveFile, updateFile} from "../database/FileLib";
import {isFile} from "../utils/TypeChecker";
import {OkButton} from "./OkButton";
import {DangerButton} from "./DangerButton";

export const ImportExportContent = () => {
    const dispatch = useAppDispatch()
    const [files, setFiles] = useState<FileItem[]>([])
    const [dragState, setDragState] = useState<DragState>("none")
    const fileInputRef = useRef<HTMLInputElement>(null)


    type FileItem = {
        name: string,
        content: string,
        json:MyFile,
        exists:boolean
    }

    type DragState = "none" | "allowed" | "invalid"

    const handleDropColor =()=> {
        switch (dragState) {
            case "none":
                return "border-double"
            case "allowed":
                return "border-dashed"
            case "invalid":
                return "border-solid border-red-500"
        }
    }


    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = "copy"
    }

    const readFile = (file: File): Promise<FileItem> => {
        return new Promise((res, rej) => {
            const fileItem: FileItem = {
                name: file.name,
                content: "",
                json: {content:'',id:'',name:'',lastOpened:'',repo:''},
                exists: false
            }

            const fr = new FileReader()

            fr.onload = async () => {
                const result = fr.result
                if (typeof result == "string") {
                    fileItem.content = result
                    try {
                        fileItem.json = JSON.parse(result)
                        if(!fileItem.json){
                            return
                        }
                        await findFileById(fileItem.json.id).then(e => {
                            fileItem.exists = e != null
                            console.log(fileItem)
                            res(fileItem)
                        })

                    } catch (e) {
                        dispatch(alertActions.setAlerting({
                            message: `${file.name} is not a valid JSON file.`, type: AlertTypes.ERROR
                            , open: true, title: "Error when importing"
                        }))
                        rej(e)
                    }
                }

                res(fileItem)
            }
            fr.readAsText(file)
        })
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()


        const fileList: Promise<FileItem>[] = []
        for (const f of e.dataTransfer.files) {
            fileList.push(readFile(f))
        }


        Promise.all(fileList).then(e => {
            const files=e.map(c=>c.content)
            setFiles(e)
        })
        setDragState("none")
    }
    const handleInputChanged = (e: any) => {
        uploadFiles(e.target.files)
    }
    const handleClick = () => {
        fileInputRef.current?.click()
    }

    const uploadFiles = (files: FileList) => {
        const fileList: Promise<FileItem>[] = []
        for (const f of files) {
            fileList.push(readFile(f))
        }


        Promise.all(fileList).then(e => {
            setFiles(e)
        })
    }

    const addFileToDatabase = (json: MyFile)=>{
        saveFile(json.content, json.name)
    }

    return <div className="flex flex-col justify-center items-center h-full gap-4">
        <div className={`p-4 border-4 ${handleDropColor()} border-dashed border-gray-500 text-center w-full h-40 grid place-items-center cursor-pointer`}
             onDragEnter={() => setDragState("allowed")}
             onDragLeave={() => setDragState("none")}
             onDragOver={handleDragOver} onDrop={handleDrop}
             onClick={handleClick}>
            Drag file here.
        </div>
        <div className="flex flex-col gap-4">
            {files.filter(f=> isFile(f.json)).map((f, i) => {
                    return <div className="grid grid-cols-3 gap-3 items-stretch" key={i}>
                        <div className="text-lg px-5 py-3">{f.name}</div>
                        <OkButton onClick={()=>addFileToDatabase(f.json)}>Import</OkButton>
                        <DangerButton hide={f.exists}
                                onClick={()=>importAndOverrideFile(f.json)}>Override</DangerButton>
                    </div>
            })}
        </div>
        <input type={"file"} ref={fileInputRef} hidden onChange={handleInputChanged} accept="application/json" multiple />
        <button className="bg-slate-600 p-4 rounded w-full" onClick={()=>{
            dispatch(commonActions.setSettingsMenuOpen(false))
            setTimeout(()=>window.print(),200)
        }
        }>Export to PDF (Text selection only in Chrome)</button>
    </div>
}
