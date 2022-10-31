import {db} from "../database/Database";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {useEffect} from "react";
import {commonActions} from "../slices/CommonSlice";

export const FileViewer =()=>{
    const files = useAppSelector(state=>state.commonReducer.files)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        if(files.length==0){
            db.getAll("file")
                .then(f=>dispatch(commonActions.setFiles(f)))
                .catch(c=>console.log("Fehler aufgetreten"))
            }
        },[])



    return <div>
        {}
    </div>
}
