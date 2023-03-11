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
    currentFile:File|undefined,
    scrollSync: boolean
}

const initialState:CommonSliceProp = {
    text:'',
    settingsMenuOpen:false,
    files: [],
    fileMenuOpen: false,
    currentFile: undefined,
    scrollSync: localStorage.getItem('scrollSync')==='true'
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
        },
        setScrollSync: (state, action:PayloadAction<boolean>)=>{
            state.scrollSync = action.payload
            localStorage.setItem('scrollSync', action.payload.toString())
            console.log('scrollSync', action.payload)
        }
    }
})

export const commonReducer =  commonSlice.reducer
export const commonActions = commonSlice.actions
