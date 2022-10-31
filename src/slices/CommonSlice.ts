import {createSlice} from "@reduxjs/toolkit";

export interface File{
    lastOpened: string,
    content:string,
    name:string,
    id:string,
}

interface CommonSliceProp {
    text:string,
    settingsMenuOpen: boolean
    files: File[],
    fileMenuOpen: boolean
}

const initialState:CommonSliceProp = {
    text:'',
    settingsMenuOpen:false,
    files: [],
    fileMenuOpen: false
}

export const commonSlice = createSlice({
    name: 'commonSlice',
    initialState: initialState,
    reducers: {
        setText: (state, action) => {
            state.text = action.payload
        },
        setSettingsMenuOpen: (state, action)=>{
            state.settingsMenuOpen  = action.payload
        },
        setFiles: (state, action)=>{
            state.files = action.payload
        },
        setFileMenuOpen: (state, action)=>{
            state.fileMenuOpen  = action.payload
        }
    }
})

export const commonReducer =  commonSlice.reducer
export const commonActions = commonSlice.actions
