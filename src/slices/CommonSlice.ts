import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface File{
    lastOpened: string,
    content:string,
    name:string,
    id:string,
    repo?:string
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
        setText: (state, action:PayloadAction<string>) => {
            if(state.currentFile!==undefined) {
                state.currentFile.content = action.payload
            }
        },
        setName: (state, action: PayloadAction<string>)=>{
            if(state.currentFile!==undefined) {
                state.currentFile.name = action.payload
            }
        },
        setSettingsMenuOpen: (state, action: PayloadAction<boolean>)=>{
            state.settingsMenuOpen  = action.payload
        },
        setFiles: (state, action:PayloadAction<File[]>)=>{
            state.files = action.payload
        },
        setFileMenuOpen: (state, action:PayloadAction<boolean>)=>{
            state.fileMenuOpen  = action.payload
        },
        setCurrentFile: (state, action:PayloadAction<File>)=>{
            state.currentFile = action.payload
        },
        setEditorText: (state, action:PayloadAction<string>)=>{
            state.text = action.payload
        },
        setRepoName: (state, action) => {
            if(state.currentFile!==undefined) {
                state.currentFile.repo = action.payload
            }
        }
    }
})

export const commonReducer =  commonSlice.reducer
export const commonActions = commonSlice.actions
