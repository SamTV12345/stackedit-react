import {commonActions, File as MyFile} from "../slices/CommonSlice";
import {useAppDispatch} from "../store/hooks";
import {useRef, useState} from "react";
import {alertActions, AlertTypes} from "../slices/AlertSlice";
import {findFileById, importAndOverrideFile, saveFile} from "../database/FileLib";
import {isFile} from "../utils/TypeChecker";
import {OkButton} from "./OkButton";
import {DangerButton} from "./DangerButton";
import {AlternativeButton} from "./AlternativeButton";
import {useTranslation} from "react-i18next";

export const ImportExportContent = () => {
    const dispatch = useAppDispatch()
    const [files, setFiles] = useState<FileItem[]>([])
    const [dragState, setDragState] = useState<DragState>("none")
    const fileInputRef = useRef<HTMLInputElement>(null)
    const {t} = useTranslation()

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
        saveFile(json.content, json.name, json.id,json.lastOpened)
        files.forEach(async f=>{
            await findFileById(f.json.id).then(e => {
                f.exists = e != null
                const filteredFiles = files.filter(e=>e.json.id!=f.json.id)
                const filesToSet = [...filteredFiles,f]
                setFiles(filesToSet)
            })
        })
        dispatch(alertActions.setAlerting({open: true,type:AlertTypes.SUCESS,message:`${json.name} imported successfully`,title:"Import success"}))
    }

    return <div className="flex flex-col justify-center items-center h-full gap-4">
        <div className={`p-4 border-4 ${handleDropColor()} border-dashed border-gray-500 text-center w-full h-40 grid place-items-center cursor-pointer`}
             onDragEnter={() => setDragState("allowed")}
             onDragLeave={() => setDragState("none")}
             onDragOver={handleDragOver} onDrop={handleDrop}
             onClick={handleClick}>
            {t('drag-here')}
        </div>
        <div className="flex flex-col gap-4">
            {files.filter(f=> isFile(f.json)).map((f, i) => {
                    return <div className="grid grid-cols-3 gap-3 items-stretch" key={i}>
                        <div className="text-lg px-5 py-3">{f.name}</div>
                        <OkButton onClick={()=>addFileToDatabase(f.json)} hide={!f.exists}>Import</OkButton>
                        <AlternativeButton onClick={()=>{
                            f.json.id = crypto.randomUUID()
                            addFileToDatabase(f.json)
                        }} hide={f.exists}>{t('save-as-copy')}</AlternativeButton>
                        <DangerButton hide={f.exists}
                                onClick={()=>importAndOverrideFile(f.json)}>{t('override')}</DangerButton>
                    </div>
            })}
        </div>
        <input type={"file"} ref={fileInputRef} hidden onChange={handleInputChanged} accept="application/json" multiple />
        <button className="bg-slate-600 p-4 rounded w-full" onClick={()=>{
            dispatch(commonActions.setSettingsMenuOpen(false))
            setTimeout(()=>window.print(),200)
        }
        }>{t('export-to-pdf')}</button>
    </div>
}
