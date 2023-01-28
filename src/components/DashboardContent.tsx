import {FC, useEffect, useRef, useState} from "react";
import {pushStore} from "../database/Database";
import {UploadType} from "../models/UploadType";
import {useAppDispatch} from "../store/hooks";
import {commonActions} from "../slices/CommonSlice";
import {openGitHubAccountAdded, openGitHubAccountNotAdded} from "../utils/AlertEvents";

interface DashboardContentProps {
    selectedItem: number
}

interface Account {
    username:string,
    password?:string,
    type: UploadType,
    id: string
}

type FileItem = {
    name: string,
    content: string,
    json:string
}

type DragState = "none" | "allowed" | "invalid"

export interface AccountState {
    [key:number]: Account
}

const fileTypes = ["JPG", "PNG", "GIF"];

export const DashboardContent:FC<DashboardContentProps> =({selectedItem})=>{
    const [accounts, setAccounts] = useState<AccountState>({})
    const dispatch = useAppDispatch()
    const [files, setFiles] = useState<FileItem[]>([])
    const [dragState, setDragState] = useState<DragState>("none")
    const fileInputRef = useRef<HTMLInputElement>(null)

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
                        console.log(`${file.name} is not JSON.`)
                    }
                }

                res(fileItem)
            }

            fr.readAsText(file)
        })
    }

    useEffect(()=>{
        pushStore.getAll("account").then(res=>{
            res.forEach(c=>setAccounts({
                ...accounts
            ,[c.type]:c}))
        })
    }, [])

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = "copy"
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()

        console.log(e)

        const fileList: Promise<FileItem>[] = []
        for (const f of e.dataTransfer.files) {
            console.log("Test", f)
            fileList.push(readFile(f))
        }

        console.log("Here", fileList)

        Promise.all(fileList).then(e => {
            const files=e.map(c=>c.content)
            console.log(files)
            setFiles(e)
        })
        setDragState("none")
    }

    const handleInputChanged = (e: any) => {
        console.log(e)
        uploadFiles(e.target.files)
    }
    const handleClick = () => {
        fileInputRef.current?.click()
    }

    const uploadFiles = (files: FileList) => {
        const fileList: Promise<FileItem>[] = []
        for (const f of files) {
            console.log("Test", f)
            fileList.push(readFile(f))
        }

        console.log("Here", fileList)

        Promise.all(fileList).then(e => {
            console.log("Foo", e)
            setFiles(e)
        })
    }

    const GitHubContent = ()=>{
        const [githubAccount, setGithubAccount] = useState<Account>(()=>{

            if(accounts&& accounts[UploadType.GITHUB]!==undefined){
                return accounts[UploadType.GITHUB] as Account
            }
            return {username:'',password:'',id:crypto.randomUUID(),type:UploadType.GITHUB}
        })

        return <form className="grid grid-cols-1">
            <div className="mb-6">
                <label htmlFor="githubUsername"
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">GitHub Name</label>
                <input type="text" id="githubUsername" value={githubAccount?.username} autoComplete={"username"} onChange={(v)=>setGithubAccount(
                    {username:v.target.value,type: UploadType.GITHUB,password:githubAccount.password,id:githubAccount.id}
                )}
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </div>

            <div className="mb-6">
                <label htmlFor="githubPassword"
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Passwort (Optional)</label>
                <input type="password" id="githubPassword" value={githubAccount.password} autoComplete={"current-password"} onChange={(v)=>setGithubAccount(
                    {username: githubAccount.username,type: UploadType.GITHUB,password:v.target.value,id:githubAccount.id}
                )}
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </div>
            <div className="flex justify-end">
                <button className=" bg-blue-600 p-2 rounded text-black" onClick={()=>{
                    pushStore.put("account",githubAccount)
                        .then(()=>{
                            openGitHubAccountAdded(githubAccount.username)
                        })
                        .catch(()=>{
                            openGitHubAccountNotAdded(githubAccount.username)
                        })
                }}>Speichern</button>
            </div>
        </form>
    }

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
    const ImportExportContent = () => {
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

    const Content:FC<DashboardContentProps> = ({selectedItem})=>{
        switch (selectedItem){
            case 0: return <GitHubContent/>
            case UploadType.IE:return <ImportExportContent/>
        }
        return <div>

        </div>
    }


    return <div>
        <Content selectedItem={selectedItem}/>
    </div>
}
