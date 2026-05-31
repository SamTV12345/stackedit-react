import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface File{
    lastOpened: string,
    content:string,
    name:string,
    id:string,
    repo?:string
}

export type SaveStatus = 'saved' | 'dirty' | 'saving'

interface CommonSliceProp {
    text:string,
    settingsMenuOpen: boolean
    files: File[],
    fileMenuOpen: boolean,
    currentFile:File|undefined,
    scrollSync: boolean,
    // Content currently persisted in IndexedDB, used to derive the dirty state.
    savedContent: string,
    saveStatus: SaveStatus,
}

const initialState:CommonSliceProp = {
    text:'',
    settingsMenuOpen:false,
    files: [],
    fileMenuOpen: false,
    currentFile: undefined,
    scrollSync: localStorage.getItem('scrollSync')==='true',
    savedContent: '',
    saveStatus: 'saved',
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
            state.savedContent = action.payload.content
            state.saveStatus = 'saved'
        },
        setEditorText: (state, action:PayloadAction<string>)=>{
            state.text = action.payload
            if(state.saveStatus !== 'saving'){
                state.saveStatus = action.payload === state.savedContent ? 'saved' : 'dirty'
            }
        },
        setSaveStatus: (state, action:PayloadAction<SaveStatus>)=>{
            state.saveStatus = action.payload
        },
        markSaved: (state, action:PayloadAction<string>)=>{
            state.savedContent = action.payload
            state.saveStatus = 'saved'
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
