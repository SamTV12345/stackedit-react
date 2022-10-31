import {createSlice} from "@reduxjs/toolkit";

interface CommonSliceProp {
    text:string,
    settingsMenuOpen: boolean
}

const initialState:CommonSliceProp = {
    text:'',
    settingsMenuOpen:false
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
        }
    },
})

export const commonReducer =  commonSlice.reducer
export const commonActions = commonSlice.actions
