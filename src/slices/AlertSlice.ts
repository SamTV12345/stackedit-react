import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum AlertTypes {
    ERROR, SUCESS, WARN
}

interface AlertSlice {
    open:boolean,
    message: string,
    title:string,
    type: AlertTypes
}

const initialState:AlertSlice = {
    open:false,
    message:'',
    title: '',
    type: AlertTypes.SUCESS
}

export const alertSlice = createSlice({
    name: 'alertSlice',
    initialState: initialState,
    reducers: {
    setOpen: (state, action:PayloadAction<boolean>) =>{
        state.open = action.payload
        },
        setMessage:(state, action:PayloadAction<string>)=>{
            state.message = action.payload
        },
        setTitle: (state, action: PayloadAction<string>)=>{
            state.title = action.payload
        },
        setType: (state, action: PayloadAction<AlertTypes>)=>{
            state.type = action.payload
        }
    }
})

export const alertReducer =  alertSlice.reducer
export const alertActions = alertSlice.actions
