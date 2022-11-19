import { configureStore } from '@reduxjs/toolkit'
import {commonReducer} from "../slices/CommonSlice";
import {alertReducer} from "../slices/AlertSlice";

export const store = configureStore({
    reducer: {
        commonReducer: commonReducer,
        alertReducer
    },
})



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// Use throughout your app instead of plain `useDispatch` and `useSelector`
