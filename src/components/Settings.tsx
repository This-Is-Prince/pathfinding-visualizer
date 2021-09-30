import React, { useContext, useEffect } from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import AppContext from "../app/AppContext";

const Settings = () => {
  const { AppState, dispatch } = useContext(AppContext);
  return (
    <section
      className={`settings ${AppState.isSettingsOpen ? "settings--open" : ""}`}
    >
      <header className="settings__header">
        <h2 className="settings__heading">Settings</h2>
        <button
          className="btn settings__close-btn flex-center"
          onClick={() => {
            dispatch({ type: "OPEN_SETTINGS", payload: false });
          }}
        >
          <FaRegTimesCircle />
        </button>
      </header>
    </section>
  );
};

export default Settings;
