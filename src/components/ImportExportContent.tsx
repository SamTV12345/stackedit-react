import {commonActions} from "../slices/CommonSlice";
import {useAppDispatch} from "../store/hooks";
import {useRef, useState} from "react";
import {alertActions, AlertTypes} from "../slices/AlertSlice";

export const ImportExportContent = () => {
    const dispatch = useAppDispatch()
    const [files, setFiles] = useState<FileItem[]>([])
    const [dragState, setDragState] = useState<DragState>("none")
    const fileInputRef = useRef<HTMLInputElement>(null)
    const fileTypes = ["JPG", "PNG", "GIF"];

    type FileItem = {
        name: string,
        content: string,
        json:string
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
                json:''
            }

            const fr = new FileReader()

            fr.onload = () => {
                const result = fr.result
                if (typeof result == "string") {
                    fileItem.content = result
                    try {
                        fileItem.json = JSON.parse(result)
                    } catch (e) {
                        dispatch(alertActions.setAlerting({message: `${file.name} is not a valid JSON file.`, type:AlertTypes.ERROR
                            , open:true,title:"Error when importing"}))
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

    return <div className="flex flex-col justify-center items-center h-full gap-4">
        <div className={`p-4 border-4 ${handleDropColor()} border-dashed border-gray-500 text-center w-full h-40 grid place-items-center cursor-pointer`}
             onDragEnter={() => setDragState("allowed")}
             onDragLeave={() => setDragState("none")}
             onDragOver={handleDragOver} onDrop={handleDrop}
             onClick={handleClick}>
            Drag file here.
        </div>
        <input type={"file"} ref={fileInputRef} hidden onChange={handleInputChanged} accept="application/json" multiple />
        <button className="bg-slate-600 p-4 rounded" onClick={()=>{
            dispatch(commonActions.setSettingsMenuOpen(false))
            setTimeout(()=>window.print(),200)
        }
        }>Export to PDF (Text selection only in Chrome)</button>
    </div>
}
