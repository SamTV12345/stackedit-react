import MarkdownViewer from "./components/MarkdownViewer";
import {InputField} from "./components/InputField";
import "./index.css"
import {Header} from "./components/Header";
// @ts-ignore
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';

const App = ()=> {


  return (

      <div className="grid grid-rows-[auto_1fr] h-screen gap-2">
          <Header/>
          <div className="col-span-2 pl-6 overflow-hidden">
              <div className="grid grid-cols-2 h-full gap-2 pb-2">
                  <InputField/>
                  <MarkdownViewer/>
              </div>
          </div>
      </div>
  )
}

export default App
