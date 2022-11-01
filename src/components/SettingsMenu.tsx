import {createPortal} from "react-dom";
import {Dashboard} from "./Dashboard";
import {useAppSelector} from "../store/hooks";

export const SettingsMenu = ()=>{
    const openSettingsMenu = useAppSelector(state=>state.commonReducer.settingsMenuOpen)

    return openSettingsMenu?createPortal(
        <Dashboard/>
        , (document.getElementById("modal") as Element))
        :<div></div>
}
