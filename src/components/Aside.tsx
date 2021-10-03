import React, { useContext } from "react";
import { GiResize } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import { FaPauseCircle, FaPlayCircle, FaSitemap } from "react-icons/fa";
import AppContext from "../app/AppContext";
const Aside = () => {
  const { AppState, dispatch } = useContext(AppContext);
  return (
    <aside className="aside">
      <button
        className="flex-center btn aside-btn"
        aria-label="settings"
        onClick={() => {
          console.log("settings");
          dispatch({ type: "OPEN_SETTINGS", payload: true });
        }}
      >
        <FiSettings />
      </button>
      <button
        className="flex-center btn aside-btn"
        aria-label="resize"
        onClick={() => {
          dispatch({ type: "CHANGE_ASIDE_MODAL", payload: true });
        }}
      >
        <GiResize />
      </button>
      <button
        className={`flex-center btn aside-btn`}
        aria-label="algorithm"
        onClick={() => {
          console.log("algorithm");
        }}
      >
        <FaSitemap />
      </button>
      <button
        className="flex-center btn aside-btn"
        aria-label="play/pause"
        onClick={() => {
          if (AppState.isMazeAnimationComplete) {
            dispatch({ type: "CHANGE_PLAY", payload: !AppState.isPlay });
          }
        }}
      >
        {AppState.isPlay ? <FaPauseCircle /> : <FaPlayCircle />}
      </button>
    </aside>
  );
};

export default Aside;
