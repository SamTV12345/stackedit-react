import {createSlice} from "@reduxjs/toolkit";

interface CommonSliceProp {
    text:string
}

const initialState:CommonSliceProp = {
    text:''
}

export const commonSlice = createSlice({
    name: 'commonSlice',
    initialState: initialState,
    reducers: {
        setText: (state, action) => {
            state.text = action.payload
        }
    },
})

export const commonReducer =  commonSlice.reducer
export const commonActions = commonSlice.actions
