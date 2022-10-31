import {useState} from "react";
import {useAppDispatch} from "../store/hooks";
import {commonActions} from "../slices/CommonSlice";

export const Dashboard = ()=>{
    const [selectedItem, setSelectedItem] = useState<number>(0)
    const dispatch = useAppDispatch()

    const highlightIfSelected = (selectedItemInList:number)=>{
        if(selectedItemInList===selectedItem){
            return 'bg-slate-500'
        }
        return ''
    }

    return <div id="defaultModal" tabIndex={-1} aria-hidden="true"
                className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full z-40" onClick={()=>dispatch(commonActions.setSettingsMenuOpen(false))}>
        <div className="grid place-items-center h-screen">
            <div className="relative rounded-lg shadow bg-gray-700 justify-center w-full md:w-3/4" onClick={(e)=>e.stopPropagation()}>
                <div className="flex justify-between items-start p-4 rounded-t border-b border-gray-600">
                    <h3 className="text-xl font-semibold text-white">
                        Einstellungen
                    </h3>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white" data-modal-toggle="defaultModal" onClick={()=>dispatch(commonActions.setSettingsMenuOpen(false))}>
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">testbutton</span>
                    </button>
                </div>
                <div className="p-6 space-y-6 text-base leading-relaxed text-gray-400">
                    <div className="grid grid-cols-[auto_1fr]">
                        <div className="w-60 content-center grid place-items-center text-xl">
                            <div className={"w-40 m-2 "}>
                            <div className={`m-2 p-2 rounded ${highlightIfSelected(0)}`} onClick={()=>setSelectedItem(0)}>GitHub</div>
                            <div className={`m-2 p-2 rounded ${highlightIfSelected(1)}`} onClick={()=>setSelectedItem(1)}>Gitlab</div>
                            <div className={`m-2 p-2 rounded ${highlightIfSelected(2)}`} onClick={()=>setSelectedItem(2)}>Wordpress</div>
                            <div className={`m-2 p-2 rounded ${highlightIfSelected(3)}`} onClick={()=>setSelectedItem(3)}>Import/Export</div>
                            <div className={`m-2 p-2 rounded ${highlightIfSelected(4)}`} onClick={()=>setSelectedItem(4)}>Zendesk</div>
                            <div className={`m-2 p-2 rounded ${highlightIfSelected(5)}`} onClick={()=>setSelectedItem(5)}>Google Drive</div>
                            <div className={`m-2 p-2 rounded ${highlightIfSelected(6)}`} onClick={()=>setSelectedItem(6)}>DropBox</div>
                            </div>
                        </div>
                        <div>content</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
