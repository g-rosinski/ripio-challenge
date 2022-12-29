import 'react-app-polyfill/ie9'
import 'react-app-polyfill/stable'
import ReactDOM from "react-dom/client";
import App, { AppParams } from "./App";

window[`mountApp`] = (elementID:string, params: AppParams) => {
    const container = document.getElementById(elementID)
    if(container && !window['mountedApp']?.[elementID]){
        const root = ReactDOM.createRoot(container)
        root.render(App(params))
        window['mountedApp'] = {
            ...window['mountedApp'],
            [elementID]: root
        }
    }
}

window[`unmountApp`] = (elementID:string) => {
    if(!!window['mountedApp']?.[elementID]){
        window['mountedApp'][elementID]?.unmount()
        delete window['mountedApp'][elementID]
    }
}