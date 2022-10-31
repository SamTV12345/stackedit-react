import {createSlice} from "@reduxjs/toolkit";

interface File{
    value: {
        name: string,
        content: string,
        lastOpened: Date
    };
    key: string
}


interface CommonSliceProp {
    text:string,
    settingsMenuOpen: boolean
    files: File[]
}

const initialState:CommonSliceProp = {
    text:'',
    settingsMenuOpen:false,
    files: []
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
        }
    }
})

export const commonReducer =  commonSlice.reducer
export const commonActions = commonSlice.actions
