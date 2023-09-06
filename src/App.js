import React, { useState } from "react";
//redux imports
import { Provider } from "react-redux";
import store from "./redux/store";
//redux imports

// notifications alerts
import 'react-notifications-component/dist/theme.css'
import ReactNotification from 'react-notifications-component'
import 'animate.css/animate.min.css';
// notifications alerts

//router
import { BrowserRouter } from "react-router-dom";
import BaseRoutes from "./routes";
//router

//global popup
import BasePopup, { BasePopupContext } from './components/BasePopup';
import { initialPopupState } from "./constants";
//global popup

const App = () => {
  const [popupState, setPopupState] = useState(initialPopupState);

  const openPopup = (params) => setPopupState(old => ({ ...old, ...params }));

  const global_popup_context_data = {
    popupState,
    setPopup: openPopup
  }
  // state for popup

  return (
    <>
      <Provider store={store}>
        <BasePopupContext.Provider value={global_popup_context_data}>

          <BrowserRouter>

            <ReactNotification />
            <BaseRoutes />
            <BasePopup />

          </BrowserRouter>

        </BasePopupContext.Provider>
      </Provider>    
    </>
  );
}

export default App;
