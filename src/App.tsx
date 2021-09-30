import React, { useEffect, useReducer } from "react";
import "./App.css";
import AppContext from "./app/AppContext";
import reducer from "./app/reducer";
import AppInitialState from "./app/state";
import * as d3 from "d3";
import Main from "./components/Main";
import Aside from "./components/Aside";
import Modal from "./components/modal/Modal";

const App = () => {
  // useEffect(() => {
  //   d3.select(".example")
  //     .append("svg")
  //     .attr("width", 200)
  //     .attr("height", 200)
  //     .attr("class", "svg");
  //   d3.select(".svg")
  //     .append("svg")
  //     .attr("id", "arrow")
  //     .attr("stroke", "currentColor")
  //     .attr("fill", "currentColor")
  //     .attr("stroke-width", 0)
  //     .attr("viewBox", "0 0 512 512")
  //     .attr("x", 100 - 16)
  //     .attr("y", 100 - 16)
  //     .attr("height", "1em")
  //     .attr("width", "1em")
  //     .attr("xmlns", "http://www.w3.org/2000/svg");
  //   d3.select("#arrow")
  //     .append("path")
  //     .attr(
  //       "d",
  //       "M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zM140 300h116v70.9c0 10.7 13 16.1 20.5 8.5l114.3-114.9c4.7-4.7 4.7-12.2 0-16.9l-114.3-115c-7.6-7.6-20.5-2.2-20.5 8.5V212H140c-6.6 0-12 5.4-12 12v64c0 6.6 5.4 12 12 12z"
  //     );
  // }, []);
  const [AppState, dispatch] = useReducer(reducer, AppInitialState);
  return (
    <AppContext.Provider value={{ AppState, dispatch }}>
      {AppState.isFullScreen ? (
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
