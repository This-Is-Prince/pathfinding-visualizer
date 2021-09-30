import React, { useEffect, useReducer } from "react";
import "./App.css";
import AppContext from "./app/AppContext";
import reducer from "./app/reducer";
import AppInitialState from "./app/state";
import Main from "./components/Main";
import Aside from "./components/Aside";
import Modal from "./components/modal/Modal";
const App = () => {
  const [AppState, dispatch] = useReducer(reducer, AppInitialState);
  const checkScreen = () => {
    if (document.fullscreenElement) return;
    dispatch({
      type: "CHANGE_FULLSCREEN_MODEL",
      payload: true,
    });
  };
  useEffect(() => {
    document.addEventListener("fullscreenchange", checkScreen);
    return () => {
      document.removeEventListener("fullscreenchange", checkScreen);
    };
  }, []);
  return (
    <AppContext.Provider value={{ AppState, dispatch }}>
      {AppState.isFullScreenModelOpen ? (
        <Modal />
      ) : (
        <>
          <Aside />
          <Main />
        </>
      )}
    </AppContext.Provider>
  );
};

export default App;
