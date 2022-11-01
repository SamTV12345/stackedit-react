// @ts-ignore
import markdownSample from "../css/Readme.md";
import {saveFile} from "../database/FileLib";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {store} from "../store/store";
import {commonActions} from "../slices/CommonSlice";

export const useSampleFile =()=>{

    fetch(markdownSample).then((response) => response.text()).then((text) => {
        const file = saveFile(text,"Example.md",
        store.dispatch,
        store.getState().commonReducer.files)
        store.dispatch(commonActions.setCurrentFile(file))
    })
}
