import MarkdownViewer from "./components/MarkdownViewer";
import {InputField} from "./components/InputField";
import "./index.css"
import {Header} from "./components/Header";
// @ts-ignore
import {SettingsMenu} from "./components/SettingsMenu";
import {FileViewer} from "./components/FileViewer";
import {loader} from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import {Alert} from "./components/Alert";

const App = ()=> {
    const init = async () => {
        const editorWorker = await import("monaco-editor/esm/vs/editor/editor.worker?worker")
        const jsonWorker = await import("monaco-editor/esm/vs/language/json/json.worker?worker")
        const cssWorker = await import("monaco-editor/esm/vs/language/css/css.worker?worker")
        const htmlWorker = await import("monaco-editor/esm/vs/language/html/html.worker?worker")
        const tsWorker = await import("monaco-editor/esm/vs/language/typescript/ts.worker?worker")

        self.MonacoEnvironment = {
            getWorker(_, label) {
                if (label === "json") {
                    return new jsonWorker.default()
                }
                if (label === "css" || label === "scss" || label === "less") {
                    return new cssWorker.default()
                }
                if (label === "html" || label === "handlebars" || label === "razor") {
                    return new htmlWorker.default()
                }
                if (label === "typescript" || label === "javascript") {
                    return new tsWorker.default()
                }
                return new editorWorker.default()
            }
        }
        loader.config({monaco});
    }

    init()

  return (
      <div className="grid grid-rows-[auto_1fr] h-screen gap-2 print:h-auto print:grid-cols-none print:grid-rows-none">
          <Header/>
          <div className="col-span-2 pl-6 overflow-hidden print:overflow-visible">
              <div className="grid grid-cols-2 h-full gap-2 pb-2 print:h-auto">
                  <InputField/>
                  <MarkdownViewer/>
              </div>
          </div>
          <SettingsMenu/>
          <FileViewer/>
          <Alert/>
      </div>
  )
}

export default App
