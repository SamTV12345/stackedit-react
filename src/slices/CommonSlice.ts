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
    fileMenuOpen: boolean,
    currentFile:File|undefined
}

const initialState:CommonSliceProp = {
    text:'',
    settingsMenuOpen:false,
    files: [],
    fileMenuOpen: false,
    currentFile: undefined
}

export const commonSlice = createSlice({
    name: 'commonSlice',
    initialState: initialState,
    reducers: {
        setText: (state, action) => {
            if(state.currentFile!==undefined) {
                state.currentFile.content = action.payload
            }
        },
        setName: (state, action)=>{
            if(state.currentFile!==undefined) {
                state.currentFile.name = action.payload
            }
        },
        setSettingsMenuOpen: (state, action)=>{
            state.settingsMenuOpen  = action.payload
        },
        setFiles: (state, action)=>{
            state.files = action.payload
        },
        setFileMenuOpen: (state, action)=>{
            state.fileMenuOpen  = action.payload
        },
        setCurrentFile: (state, action)=>{
            state.currentFile = action.payload
        },
        setEditorText: (state, action)=>{
            state.text = action.payload
        }
    }
})

export const commonReducer =  commonSlice.reducer
export const commonActions = commonSlice.actions
