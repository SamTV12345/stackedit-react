import {useState} from "react";
import {useAppDispatch} from "../store/hooks";
import {commonActions} from "../slices/CommonSlice";
import {UploadType} from "../models/UploadType";
import {DashboardContent} from "./DashboardContent";
import {Trans, useTranslation} from "react-i18next";

export const Dashboard = ()=>{
    const [selectedItem, setSelectedItem] = useState<number>(0)
    const dispatch = useAppDispatch()
    const {t} = useTranslation()
    const highlightIfSelected = (selectedItemInList:number)=>{
        if(selectedItemInList===selectedItem){
            return 'bg-slate-500'
        }
        return ''
    }

    return <div id="defaultModal" tabIndex={-1} aria-hidden="true"
                className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 md:inset-0 h-modal md:h-full z-40" onClick={()=>dispatch(commonActions.setSettingsMenuOpen(false))}>
        <div className="grid place-items-center h-screen">
            <div className="relative rounded-lg shadow bg-gray-700 justify-center w-full md:w-3/4" onClick={(e)=>e.stopPropagation()}>
                <div className="flex justify-between items-start p-4 rounded-t border-b border-gray-600">
                    <h3 className="text-xl font-semibold text-white">
                        <Trans>settings</Trans>
                    </h3>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white" data-modal-toggle="defaultModal" onClick={()=>dispatch(commonActions.setSettingsMenuOpen(false))}>
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">{t('close')}</span>
                    </button>
                </div>
                <div className="p-6 space-y-6 text-base leading-relaxed text-gray-400">
                    <div className="grid grid-cols-[auto_1fr]">
                        <div className="w-60 content-center grid place-items-center text-xl">
                            <div className={"w-40 m-2 "}>
                            <div className={`m-2 p-2 rounded ${highlightIfSelected(UploadType.GITHUB)}`} onClick={()=>setSelectedItem(UploadType.GITHUB)}>{t('github')}</div>
                            <div className={`m-2 p-2 rounded ${highlightIfSelected(UploadType.GITLAB)}`} onClick={()=>setSelectedItem(UploadType.GITLAB)}>{t('gitlab')}</div>
                            <div className={`m-2 p-2 rounded ${highlightIfSelected(UploadType.WORDPRESS)}`} onClick={()=>setSelectedItem(UploadType.WORDPRESS)}>{t('wordpress')}</div>
                            <div className={`m-2 p-2 rounded ${highlightIfSelected(UploadType.IE)}`} onClick={()=>setSelectedItem(UploadType.IE)}>{t('import-export')}</div>
                            <div className={`m-2 p-2 rounded ${highlightIfSelected(UploadType.ZENDESK)}`} onClick={()=>setSelectedItem(UploadType.ZENDESK)}>{t('zendesk')}</div>
                            <div className={`m-2 p-2 rounded ${highlightIfSelected((UploadType.GDRIVE))}`} onClick={()=>setSelectedItem(UploadType.GDRIVE)}>{t('google-drive')}</div>
                            <div className={`m-2 p-2 rounded ${highlightIfSelected(UploadType.DROPBOX)}`} onClick={()=>setSelectedItem(UploadType.DROPBOX)}>{t('dropbox')}</div>
                                <div className={`m-2 p-2 rounded ${highlightIfSelected(UploadType.Settings)}`}>Einstellungen</div>
                            </div>
                        </div>
                        <DashboardContent selectedItem={selectedItem}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
