import React,{lazy, Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from "react-redux";
import "./index.css"
import {store} from "./store/store";
import {HashRouter, Route, Routes} from "react-router-dom";
import {WelcomeScreen} from "./components/WelcomeScreen";
import {PrivacyPolicy} from "./components/PrivacyPolicy";
import {Spinner} from "./components/Spinner";



const init = async () => {
    const loader =  await import("@monaco-editor/loader");
    const monaco = await import("monaco-editor")
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
    loader.default.config({monaco});
}

init()
    .then(()=> {

        const App = lazy(() => import("./App"));

        const AppPage = () => (
            <Suspense fallback={<Spinner/>}>
                <App/>
            </Suspense>
        );



        ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <React.StrictMode>
                <Provider store={store}>
                    <HashRouter basename={"/"}>
                        <Routes>
                            <Route path={"/app"} element={<AppPage/>}/>
                            <Route path={"/privacy"} element={<PrivacyPolicy/>}/>
                            <Route path={"/"} element={<WelcomeScreen/>}/>
                        </Routes>
                    </HashRouter>
                </Provider>
            </React.StrictMode>
        )
    })
