import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {Provider} from "react-redux";
import "./index.css"
import {store} from "./store/store";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {WelcomeScreen} from "./components/WelcomeScreen";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <Routes>
                  <Route path={"/app"} element={<App/>}/>
                  <Route path={"/"} element={<WelcomeScreen/>}/>
              </Routes>
          </BrowserRouter>
      </Provider>
  </React.StrictMode>
)
