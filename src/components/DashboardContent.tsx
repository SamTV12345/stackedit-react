import {FC, useEffect, useRef, useState} from "react";
import {pushStore} from "../database/Database";
import {UploadType} from "../models/UploadType";
import {openGitHubAccountAdded, openGitHubAccountNotAdded} from "../utils/AlertEvents";
import {ImportExportContent} from "./ImportExportContent";
import {useTranslation} from "react-i18next";

interface DashboardContentProps {
    selectedItem: number
}

interface Account {
    username:string,
    password?:string,
    type: UploadType,
    id: string
}


export interface AccountState {
    [key:number]: Account
}



export const DashboardContent:FC<DashboardContentProps> =({selectedItem})=>{
    const [accounts, setAccounts] = useState<AccountState>({})
    const {t} = useTranslation()

    useEffect(()=>{
        pushStore.getAll("account").then(res=>{
            res.forEach(c=>setAccounts({
                ...accounts
            ,[c.type]:c}))
        })
    }, [])


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
                       className="block mb-2 text-sm font-medium text-white">{t('github-name')}</label>
                <input type="text" id="githubUsername" value={githubAccount?.username} autoComplete={"username"} onChange={(v)=>setGithubAccount(
                    {username:v.target.value,type: UploadType.GITHUB,password:githubAccount.password,id:githubAccount.id}
                )}
                       className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </div>

            <div className="mb-6">
                <label htmlFor="githubPassword"
                       className="block mb-2 text-sm font-medium text-white">{t('github-password')}</label>
                <input type="password" id="githubPassword" value={githubAccount.password} autoComplete={"current-password"} onChange={(v)=>setGithubAccount(
                    {username: githubAccount.username,type: UploadType.GITHUB,password:v.target.value,id:githubAccount.id}
                )}
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-black"/>
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
