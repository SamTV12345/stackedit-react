import {createPortal} from "react-dom";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {alertActions, AlertTypes} from "../slices/AlertSlice";
import {useEffect} from "react";

// Full, static class strings per type so Tailwind's JIT keeps them in the build.
const ALERT_CLASSES: Record<AlertTypes, string> = {
    [AlertTypes.SUCCESS]: 'bg-green-100 border-green-500 text-green-700',
    [AlertTypes.ERROR]: 'bg-red-100 border-red-500 text-red-700',
    [AlertTypes.WARN]: 'bg-orange-100 border-orange-500 text-orange-700',
}

export const Alert = ()=>{
    const dispatch = useAppDispatch()
    const open = useAppSelector(state=>state.alertReducer.open)
    const type = useAppSelector(state=>state.alertReducer.type)
    const message = useAppSelector(state=>state.alertReducer.message)
    const title = useAppSelector(state=>state.alertReducer.title)

    useEffect(()=> {
        if(open){
            const timeout = setTimeout(()=>dispatch(alertActions.setOpen(false)),5000)
            return ()=>clearTimeout(timeout)
        }
    }, [open, dispatch])

    const colorClasses = ALERT_CLASSES[type] ?? ALERT_CLASSES[AlertTypes.SUCCESS]

    return createPortal(
        <div className={`${open ? 'md:block' : 'hidden'} absolute bottom-10 right-10 border-l-4 p-4 rounded-sm ${colorClasses}`} role="alert">
            <p className="font-bold">{title}</p>
            <p>{message}</p>
    </div>, document.getElementById('alert') as Element)
}
