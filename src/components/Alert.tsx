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
    const [color, setColor] = useState<string>('')

    useEffect(()=>{
        if(open){
            setTimeout(()=>dispatch(alertActions.setOpen(false)),5000)
        }
    })

    useEffect(()=>{
        setColor(colorSnackBarCorrect())
    },[type])

    const colorSnackBarCorrect = ()=>{
        switch (type){
            case AlertTypes.ERROR: return 'red'
            case AlertTypes.SUCESS: return 'green'
            case AlertTypes.WARN:return 'orange'
        }
    }

    return createPortal(
        <div className={`${open?'md:block':'hidden'} absolute bottom-10 right-10 bg-${color}-100 border-l-4 border-${color}-500 text-${color}-700 p-4 transition-all fadeOut fadeIn duration-1000`} role="alert">
            <p className="font-bold">{title}</p>
            <p>{message}</p>
    </div>, document.getElementById('alert') as Element)
}
