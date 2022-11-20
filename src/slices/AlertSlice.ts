import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum AlertTypes {
    ERROR, SUCESS, WARN
}

interface AlertProps {
    open:boolean,
    message: string,
    title:string,
    type: AlertTypes
}

const initialState:AlertProps = {
    open:false,
    message:'',
    title: '',
    type: AlertTypes.SUCESS
}

export const alertSlice = createSlice({
    name: 'alertSlice',
    initialState: initialState,
    reducers: {
        setAlerting:(state, action:PayloadAction<AlertProps>)=>{
            state.type = action.payload.type
            state.message = action.payload.message
            state.open = action.payload.open
            state.title = action.payload.title
        },
        setOpen: (state, action:PayloadAction<boolean>)=>{
            state.open = action.payload
        }
    }
})

export const alertReducer =  alertSlice.reducer
export const alertActions = alertSlice.actions
