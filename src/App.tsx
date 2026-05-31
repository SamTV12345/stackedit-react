import MarkdownViewer from "./components/MarkdownViewer";
import {InputField} from "./components/InputField";
import "./index.css"
import {Header} from "./components/Header";
import {SettingsMenu} from "./components/SettingsMenu";
import {FileViewer} from "./components/FileViewer";
import {Alert} from "./components/Alert";
import {SplitPane} from "./components/SplitPane";
import {Outline} from "./components/Outline";
import {useRef, useState} from "react";
import type {editor} from "monaco-editor";
type IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
import {throttle} from "./utils/throttle";
import {useAppSelector} from "./store/hooks";
import {store} from "./store/store";

const App = ()=> {
    const [editor, setEditor] = useState<IStandaloneCodeEditor|undefined>(undefined)
    const viewerRef = useRef<HTMLDivElement>(null)
    const outlineOpen = useAppSelector(state=>state.commonReducer.outlineOpen)

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
          <div className="col-span-2 flex overflow-hidden print:overflow-visible print:block">
              {outlineOpen && <Outline editor={editor}/>}
              <div className="flex-1 min-w-0 pl-6 pr-6 print:px-0">
                  <SplitPane
                      storageKey="editorSplitRatio"
                      left={<InputField editor={editor} setEditor={(e)=>setEditor(e)}/>}
                      right={<MarkdownViewer refObj={viewerRef}/>}
                  />
              </div>
          </div>
          <SettingsMenu/>
          <FileViewer/>
          <Alert/>
      </div>
  )
}

export default App
