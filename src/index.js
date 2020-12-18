import React from "react"
import ReactDOM from "react-dom"
import reportWebVitals from "./reportWebVitals"
import {RecoilRoot} from "recoil"

import Root from "./pages/root"

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Root />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
)

reportWebVitals()
