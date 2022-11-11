import logo from '../logo/img.png'
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {commonActions} from "../slices/CommonSlice";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import {updateFile} from "../database/FileLib";
import {FileNameInputField} from "./FileNameInputField";
import {useEffect, useState} from "react";
import {pushStore} from "../database/Database";
import {AccountState} from "./DashboardContent";
import {UploadType} from "../models/UploadType";
import {uploadFileToRegistry} from "../utils/GithubUtils";
import {RepoNameInputField} from "./RepoNameInputField";


export const Header = ()=>{
    const dispatch = useAppDispatch()
    const currentFile = useAppSelector(state=>state.commonReducer.currentFile)
    const [accounts, setAccounts] = useState<AccountState>({})

    useEffect(()=>{
        pushStore.getAll("account").then(res=>{
            res.forEach(c=>setAccounts({
                ...accounts
                ,[c.type]:c}))
        })
    }, [])

    if(currentFile===undefined){
        return <div>Loading</div>
    }
    return <div className="col-span-2 bg-slate-900 h-12 flex items-center w-full print:hidden">
        <div className="text-white text-2xl m-2" onClick={()=>{dispatch(commonActions.setFileMenuOpen(true))}}>StackEdit-React</div>
        <FontAwesomeIcon icon={faFloppyDisk} className="text-white h-8" onClick={()=>{updateFile(currentFile?.id,currentFile?.name,currentFile?.content)}
        }/>
        <div className="flex-end ml-auto mr-28 text-white"><FileNameInputField/></div>
        <RepoNameInputField/>
        {accounts[UploadType.GITHUB]&&<button onClick={() => {uploadFileToRegistry(accounts[UploadType.GITHUB].password as string,
            currentFile?.name,accounts[UploadType.GITHUB].username as string,currentFile?.repo as string, currentFile?.content)}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8" fill="white">
                <path
                    d="M 11.9991,2C 6.47774,2 2.00001,6.47712 2.00001,12.0006C 2.00001,16.4184 4.86504,20.1665 8.83877,21.489C 9.33909,21.5807 9.52142,21.272 9.52142,21.007C 9.52142,20.7696 9.51282,20.1407 9.50791,19.3062C 6.72636,19.9105 6.13948,17.9657 6.13948,17.9657C 5.68459,16.8105 5.02895,16.5029 5.02895,16.5029C 4.121,15.8824 5.09771,15.895 5.09771,15.895C 6.10143,15.9657 6.62936,16.9256 6.62936,16.9256C 7.52135,18.4537 8.97014,18.0125 9.53984,17.7565C 9.63069,17.1102 9.88914,16.6696 10.1746,16.4196C 7.95415,16.1672 5.61952,15.3093 5.61952,11.4773C 5.61952,10.3856 6.00934,9.49292 6.64902,8.79388C 6.54588,8.54089 6.20271,7.52417 6.74723,6.14739C 6.74723,6.14739 7.58643,5.87851 9.49686,7.17252C 10.2943,6.95073 11.1501,6.8398 12.0003,6.83594C 12.8499,6.8398 13.7051,6.95073 14.5038,7.17252C 16.413,5.87851 17.2509,6.14739 17.2509,6.14739C 17.7967,7.52417 17.4535,8.54089 17.351,8.79388C 17.9919,9.49292 18.3787,10.3856 18.3787,11.4773C 18.3787,15.3189 16.0403,16.1642 13.8131,16.4118C 14.1717,16.7205 14.4915,17.3308 14.4915,18.2637C 14.4915,19.6005 14.4792,20.6791 14.4792,21.007C 14.4792,21.2744 14.6597,21.5855 15.1668,21.4878C 19.1374,20.1629 22,16.4172 22,12.0006C 22,6.47712 17.5223,2 11.9991,2 Z "/>
            </svg>
        </button>}
        <div className="flex-end ml-auto mr-2" onClick={()=>{dispatch(commonActions.setSettingsMenuOpen(true))}}>
            <img src={logo} className="w-10" alt="Logo with Settings capability"/></div>
    </div>
}
