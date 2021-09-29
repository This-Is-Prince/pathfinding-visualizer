import React, { useReducer } from "react";
import "./App.css";
import AppContext from "./app/AppContext";
import reducer from "./app/reducer";
import AppInitialState from "./app/state";

const App = () => {
  const [AppState, dispatch] = useReducer(reducer, AppInitialState);
  return (
    <AppContext.Provider value={{ AppState, dispatch }}>
      <h1>Hello</h1>
    </AppContext.Provider>
  );
};

export default App;
