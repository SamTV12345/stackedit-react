import React,{lazy, Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from "react-redux";
import "./index.css"
import {store} from "./store/store";
import {HashRouter, Route, Routes} from "react-router-dom";
import {WelcomeScreen} from "./components/WelcomeScreen";
import {PrivacyPolicy} from "./components/PrivacyPolicy";
import {Spinner} from "./components/Spinner";
import {I18nextProvider} from "react-i18next";
import i18n from "./i18n/i18n";

// App (and Monaco, which it sets up on mount) is only loaded for the editor route.
const App = lazy(() => import("./App"));

const AppPage = () => (
    <Suspense fallback={<Spinner/>}>
        <App/>
    </Suspense>
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <I18nextProvider i18n={i18n}>
            <Provider store={store}>
                <HashRouter basename={"/"}>
                    <Routes>
                        <Route path={"/app"} element={<AppPage/>}/>
                        <Route path={"/privacy"} element={<PrivacyPolicy/>}/>
                        <Route path={"/"} element={<WelcomeScreen/>}/>
                    </Routes>
                </HashRouter>
            </Provider>
        </I18nextProvider>
    </React.StrictMode>
)
