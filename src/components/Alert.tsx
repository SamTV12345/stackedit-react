import {createPortal} from "react-dom";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {alertActions, AlertTypes} from "../slices/AlertSlice";
import {useEffect, useState} from "react";


export const Alert = ()=>{
    const dispatch = useAppDispatch()
    const open = useAppSelector(state=>state.alertReducer.open)
    const type = useAppSelector(state=>state.alertReducer.type)
    const message = useAppSelector(state=>state.alertReducer.message)
    const title = useAppSelector(state=>state.alertReducer.title)
    const [className, setClassname] = useState<string>(`absolute bottom-10 right-10 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded`)

    useEffect(()=> {
        if(open){
            setTimeout(()=>dispatch(alertActions.setOpen(false)),5000)
        }
    }, [open]
    )

    const colorSnackBarCorrect = (type: AlertTypes)=>{
        switch (type){
            case AlertTypes.ERROR: return 'red'
            case AlertTypes.SUCESS: return 'green'
            case AlertTypes.WARN:return 'orange'
            default: return "blue"
        }
    }

    useEffect(()=>{
        if(className.includes('red')){
            setClassname(className.replaceAll('red', colorSnackBarCorrect(type)))
        } else if (className.includes('green')){
            setClassname(className.replaceAll('green', colorSnackBarCorrect(type)))
        } else if (className.includes('orange')){
            setClassname(className.replaceAll('orange', colorSnackBarCorrect(type)))
        }
    },[type])



    return createPortal(
        <div className={`${open ? 'md:block' : 'hidden'} ${className}`} role="alert">
            <p className="font-bold">{title}</p>
            <p>{message}</p>
            <div className="hidden bg-red-100 border-red-500 text-red-700 bg-orange-100 border-orange-500 text-orange-700"/>
    </div>, document.getElementById('alert') as Element)
}
