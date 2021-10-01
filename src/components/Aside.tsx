import React, { useContext } from "react";
import { IoMdSpeedometer } from "react-icons/io";
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
        aria-label="speed"
        onClick={() => {
          console.log("speed");
        }}
      >
        <IoMdSpeedometer />
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
          dispatch({ type: "CHANGE_PLAY", payload: !AppState.isPlay });
        }}
      >
        {AppState.isPlay ? <FaPauseCircle /> : <FaPlayCircle />}
      </button>
    </aside>
  );
};

export default Aside;
