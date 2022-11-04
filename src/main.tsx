import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {Provider} from "react-redux";
import "./index.css"
import {store} from "./store/store";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {WelcomeScreen} from "./components/WelcomeScreen";
import {loader} from '@monaco-editor/react'
import * as monaco from "monaco-editor";
import {PrivacyPolicy} from "./components/PrivacyPolicy";


import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker"
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker"
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker"
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"

self.MonacoEnvironment = {
    getWorker(_, label) {
        if (label === "json") {
            return new jsonWorker()
        }
        if (label === "css" || label === "scss" || label === "less") {
            return new cssWorker()
        }
        if (label === "html" || label === "handlebars" || label === "razor") {
            return new htmlWorker()
        }
        if (label === "typescript" || label === "javascript") {
            return new tsWorker()
        }
        return new editorWorker()
    }
}
loader.config({ monaco});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter basename={"/stackedit-react"}>
              <Routes>
                  <Route path={"/app"} element={<App/>}/>
                  <Route path={"/privacy"} element={<PrivacyPolicy/>}/>
                  <Route path={"/"} element={<WelcomeScreen/>}/>
              </Routes>
          </BrowserRouter>
      </Provider>
  </React.StrictMode>
)
