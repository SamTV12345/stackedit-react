import logo from '../logo/img.png'
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {commonActions} from "../slices/CommonSlice";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import {db} from "../database/Database";
import { v4 as uuidv4 } from 'uuid';


export const Header = ()=>{
    const dispatch = useAppDispatch()
    const files = useAppSelector(state=>state.commonReducer.files)

    const saveFile = ()=>{
        const id = uuidv4()
        const fileToSave = {lastOpened:new Date().toString(),content:"test", name:"Test123",id:id}
        db.put("file",fileToSave)
            .then(()=>dispatch(commonActions.setFiles([...files,fileToSave])))
            .catch(e=>console.log(e))
    }

    return <div className="col-span-2 bg-slate-900 h-12 flex items-center w-full">
        <div className="text-white text-2xl m-2" onClick={()=>{dispatch(commonActions.setFileMenuOpen(true))}}>StackEdit-React</div>
        <FontAwesomeIcon icon={faFloppyDisk} className="text-white h-8" onClick={saveFile}/>
        <div className="flex-end ml-auto mr-2" onClick={()=>{dispatch(commonActions.setSettingsMenuOpen(true))}}>
            <img src={logo} className="w-10" alt="Logo with Settings capability"/></div>
    </div>
}
