import MarkdownViewer from "./components/MarkdownViewer";
import {InputField} from "./components/InputField";
import "./index.css"
import {Header} from "./components/Header";
import {SettingsMenu} from "./components/SettingsMenu";
import {FileViewer} from "./components/FileViewer";
import {Alert} from "./components/Alert";
import React, {createRef, useEffect, useRef, useState} from "react";
import {editor} from "monaco-editor";
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
import {throttle} from "./utils/throttle";
import {useAppSelector} from "./store/hooks";
import {store} from "./store/store";

const App = ()=> {
    const [editor, setEditor] = useState<IStandaloneCodeEditor|undefined>(undefined)
    const viewerRef = createRef<HTMLDivElement>()

    const doEditorScroll = ()=>{
       if(!store.getState().commonReducer.scrollSync){
           return
       }
        const contentInTopLine = editor?.getModel()?.getLineContent(Number(editor?.getVisibleRanges()[0].startLineNumber))
        if(contentInTopLine && contentInTopLine.trim() === ""){
            return
        }

        const res = document.querySelector('[data-sourcepos^="'+editor?.getVisibleRanges()[0].startLineNumber+':1"'+"]")

        res?.scrollIntoView({behavior: "smooth", block: "center", inline: "center"})
    }
    const throttledEditorScroll = throttle(doEditorScroll, 100)

    editor?.onDidScrollChange((e)=>{
            throttledEditorScroll()
    })

  return (
      <div className="grid grid-rows-[auto_1fr] h-screen gap-2 print:h-auto print:grid-cols-none print:grid-rows-none">
          <Header/>
          <div className="col-span-2 pl-6 overflow-hidden print:overflow-visible">
              <div className="grid grid-cols-2 h-full gap-2 pb-2 print:h-auto">
                  <InputField editor={editor} setEditor={(e)=>setEditor(e)}/>
                  <MarkdownViewer refObj={viewerRef}/>
              </div>
          </div>
          <SettingsMenu/>
          <FileViewer/>
          <Alert/>
      </div>
  )
}

export default App
