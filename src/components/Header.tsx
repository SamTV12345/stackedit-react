import logo from '../logo/img.png'
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {commonActions} from "../slices/CommonSlice";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import {updateFile} from "../database/FileLib";

export const Header = ()=>{
    const dispatch = useAppDispatch()
    const currentFile = useAppSelector(state=>state.commonReducer.currentFile)

    if(currentFile===undefined){
        return <div>Loading</div>
    }
    return <div className="col-span-2 bg-slate-900 h-12 flex items-center w-full">
        <div className="text-white text-2xl m-2" onClick={()=>{dispatch(commonActions.setFileMenuOpen(true))}}>StackEdit-React</div>
        <FontAwesomeIcon icon={faFloppyDisk} className="text-white h-8" onClick={()=>{updateFile(currentFile?.id,currentFile?.name,currentFile?.content)}
        }/>
        <div className="flex-end ml-auto mr-2" onClick={()=>{dispatch(commonActions.setSettingsMenuOpen(true))}}>
            <img src={logo} className="w-10" alt="Logo with Settings capability"/></div>
    </div>
}
