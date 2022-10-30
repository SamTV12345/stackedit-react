import {commonActions} from "../slices/CommonSlice";
import {useAppDispatch, useAppSelector} from "../store/hooks";

export const InputField = ()=>{
    const text = useAppSelector(state=>state.commonReducer.text)
    const dispatch = useAppDispatch()

    return <textarea autoComplete="false" value={text} onChange={(e)=>dispatch(commonActions.setText(e.target.value))} style={{resize: "none"}}
                     className="rounded-2xl border-gray-100 border-2 p-2 outline-0"/>
}
