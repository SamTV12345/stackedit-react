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
