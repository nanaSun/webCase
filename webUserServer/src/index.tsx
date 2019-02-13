import "./index.scss"
import * as React from 'react'; 
import * as ReactDOM from 'react-dom'; 

import App from "./App"

ReactDOM.render(<App />, document.getElementById("root"));

// 热更新
let m:any=module
if(m.hot){
  m.hot.accept()
}