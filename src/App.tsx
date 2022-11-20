import MarkdownViewer from "./components/MarkdownViewer";
import {InputField} from "./components/InputField";
import "./index.css"
import {Header} from "./components/Header";
import {SettingsMenu} from "./components/SettingsMenu";
import {FileViewer} from "./components/FileViewer";
import {Alert} from "./components/Alert";

const App = ()=> {


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
