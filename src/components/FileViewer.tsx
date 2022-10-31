import {db} from "../database/Database";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {useEffect} from "react";
import {commonActions} from "../slices/CommonSlice";
import {createPortal} from "react-dom";

export const FileViewer =()=>{
    const files = useAppSelector(state=>state.commonReducer.files)
    const fileViewerOpen = useAppSelector(state=>state.commonReducer.fileMenuOpen)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        if(files.length==0){
            db.getAll("file")
                .then(f=>dispatch(commonActions.setFiles(f)))
                .catch(c=>console.log("Fehler aufgetreten"))
            }
        },[])



    return fileViewerOpen?createPortal(<div id="defaultModal" tabIndex={-1} aria-hidden="true"
                                            className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full z-40" onClick={()=>dispatch(commonActions.setFileMenuOpen(false))}>
                <div className="grid place-items-center h-screen">
                    <div className="relative rounded-lg shadow bg-gray-700 justify-center w-full md:w-3/4" onClick={(e)=>e.stopPropagation()}>
                        <div className="flex justify-between items-start p-4 rounded-t border-b border-gray-600">
                            <h3 className="text-xl font-semibold text-white">
                                Dateimanager
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white" data-modal-toggle="defaultModal" onClick={()=>dispatch(commonActions.setFileMenuOpen(false))}>
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">testbutton</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-6 text-base leading-relaxed text-gray-400 justify-center flex">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Dateiname</th>
                                        <th>Inhalt</th>
                                        <th>Zuletzt geöffnet</th>
                                        <th>Aktionen</th>
                                    </tr>
                                </thead>

                                <tbody>
                                {files.map((f)=>{
                                    return <tr><td>{f.name}</td>
                                                <td>{f.content.substring(0,10)}</td>
                                    <td>
                                        {f.lastOpened}
                                    </td>
                                        <td>

                                        </td>
                                    </tr>
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>,
        document.getElementById('viewer' ) as Element)
        :<div></div>
}
