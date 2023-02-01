// @ts-ignore
import markdownSample from "../css/Readme.md";
import {saveFile} from "../database/FileLib";
import {store} from "../store/store";
import {commonActions} from "../slices/CommonSlice";

export const getSampleFile =()=>{

    fetch(markdownSample).then((response) => response.text()).then((text) => {
        const file = saveFile(text,"Example.md")
        store.dispatch(commonActions.setCurrentFile(file))
        store.dispatch(commonActions.setEditorText(file.content))
    })
}
