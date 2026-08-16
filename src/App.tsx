import MarkdownViewer from "./components/MarkdownViewer";
import {InputField} from "./components/InputField";
import "./index.css"
import {Header} from "./components/Header";
import {SettingsMenu} from "./components/SettingsMenu";
import {FileViewer} from "./components/FileViewer";
import {Alert} from "./components/Alert";
import {SplitPane} from "./components/SplitPane";
import {Outline} from "./components/Outline";
import {CommandPalette} from "./components/CommandPalette";
import {useEffect, useRef, useState} from "react";
import type {editor} from "monaco-editor";
type IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
import {useAppSelector} from "./store/hooks";
import {store} from "./store/store";
import {proportionalScrollTop} from "./utils/scrollSync";

const App = ()=> {
    const [editor, setEditor] = useState<IStandaloneCodeEditor|undefined>(undefined)
    const viewerRef = useRef<HTMLDivElement>(null)
    const outlineOpen = useAppSelector(state=>state.commonReducer.outlineOpen)
    const rtl = useAppSelector(state=>state.commonReducer.rtl)
    // The preview only renders its scroll container once a file is loaded; track
    // that so the scroll-sync effect re-runs and attaches its listeners then.
    const previewReady = useAppSelector(state=>state.commonReducer.currentFile?.content !== undefined)

    // Bidirectional, proportional scroll sync between the editor and the preview.
    // Whichever pane the user scrolls drives the other; a lock prevents the
    // programmatic scroll from echoing back into a feedback loop.
    useEffect(()=>{
        const preview = viewerRef.current
        if(!editor || !preview){
            return
        }
        let locked = false
        const withLock = (apply:()=>void)=>{
            locked = true
            apply()
            requestAnimationFrame(()=>{ locked = false })
        }
        const enabled = ()=> store.getState().commonReducer.scrollSync

        const editorToPreview = ()=>{
            if(locked || !enabled()){ return }
            const editorMax = editor.getScrollHeight() - editor.getLayoutInfo().height
            const previewMax = preview.scrollHeight - preview.clientHeight
            withLock(()=>{ preview.scrollTop = proportionalScrollTop(editor.getScrollTop(), editorMax, previewMax) })
        }
        const previewToEditor = ()=>{
            if(locked || !enabled()){ return }
            const previewMax = preview.scrollHeight - preview.clientHeight
            const editorMax = editor.getScrollHeight() - editor.getLayoutInfo().height
            withLock(()=> editor.setScrollTop(proportionalScrollTop(preview.scrollTop, previewMax, editorMax)))
        }

        const disposable = editor.onDidScrollChange(editorToPreview)
        preview.addEventListener('scroll', previewToEditor)
        return ()=>{
            disposable.dispose()
            preview.removeEventListener('scroll', previewToEditor)
        }
    },[editor, previewReady])

  return (
      <div className="grid grid-rows-[auto_1fr] h-screen gap-2 print:h-auto print:grid-cols-none print:grid-rows-none">
          <Header/>
          <div className="col-span-2 flex overflow-hidden print:overflow-visible print:block">
              {outlineOpen && <Outline editor={editor}/>}
              <div className="flex-1 min-w-0 pl-6 pr-6 print:px-0">
                  <SplitPane
                      storageKey="editorSplitRatio"
                      rtl={rtl}
                      left={<InputField editor={editor} setEditor={(e)=>setEditor(e)}/>}
                      right={<MarkdownViewer refObj={viewerRef}/>}
                  />
              </div>
          </div>
          <SettingsMenu/>
          <FileViewer/>
          <CommandPalette editor={editor}/>
          <Alert/>
      </div>
  )
}

export default App
