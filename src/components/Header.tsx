import logo from '../logo/img.png'
import {useAppDispatch} from "../store/hooks";
import {commonActions} from "../slices/CommonSlice";

export const Header = ()=>{
    const dispatch = useAppDispatch()

    return <div className="col-span-2 bg-slate-900 h-12 flex items-center w-full">
        <div className="text-white text-2xl m-2">StackEdit-React</div>
        <div className="flex-end ml-auto mr-2" onClick={()=>{dispatch(commonActions.setSettingsMenuOpen(true))}}>
            <img src={logo} className="w-10" alt="Logo with Settings capability"/></div>
    </div>
}
