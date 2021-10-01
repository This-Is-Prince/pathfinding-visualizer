import React, { useContext } from "react";
import { IoMdSpeedometer } from "react-icons/io";
import { FaSitemap, FaRegTimesCircle, FaChessBoard } from "react-icons/fa";
import { GiMaze, GiBrickWall, GiPathDistance, GiWeight } from "react-icons/gi";
import AppContext from "../app/AppContext";
import Modal from "./modal/Modal";
import { mazesPatterns, algorithms, speed } from "../assets/data";

const Settings = () => {
  const { AppState, dispatch } = useContext(AppContext);
  return (
    <section
      className={`settings-section  ${
        AppState.isSettingsOpen ? "settings--open" : ""
      }`}
    >
      <header className="settings-section__header">
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
      <section className="settings-section__content">
        <aside className="settings-types">
          <button
            className="btn setting-btn "
            onClick={() => {
              dispatch({ type: "CHANGE_MODAL_STATE", payload: mazesPatterns });
            }}
          >
            <span className="flex-center">
              <GiMaze />
            </span>
            <span>Mazes & Patterns</span>
          </button>
          <button
            className="btn setting-btn "
            onClick={() => {
              dispatch({ type: "CHANGE_MODAL_STATE", payload: algorithms });
            }}
          >
            <span className="flex-center">
              <FaSitemap />
            </span>
            <span>Algorithms</span>
          </button>
          <button
            className="btn setting-btn "
            onClick={() => {
              dispatch({ type: "CHANGE_MODAL_STATE", payload: speed });
            }}
          >
            <span className="flex-center">
              <IoMdSpeedometer />
            </span>
            <span>Speed</span>
          </button>
          <button className="btn setting-btn ">
            <span className="flex-center">
              <GiWeight />
            </span>
            <span>Add Weight</span>
          </button>
          <button
            className="btn setting-btn "
            onClick={() => {
              dispatch({
                type: "CLEAR_BOARD",
                payload: !AppState.isBoardClear,
              });
            }}
          >
            <span className="flex-center">
              <FaChessBoard />
            </span>
            <span>Clear Board</span>
          </button>
          <button className="btn setting-btn ">
            <span className="flex-center">
              <GiPathDistance />
            </span>
            <span>Clear Path</span>
          </button>
          <button className="btn setting-btn ">
            <span className="flex-center">
              <GiBrickWall />
            </span>
            <span>Clear Walls</span>
          </button>
        </aside>
        {AppState.modalState.name === "mazes" ? (
          <Modal>
            <GiMaze />
          </Modal>
        ) : AppState.modalState.name === "algorithm" ? (
          <Modal>
            <FaSitemap />
          </Modal>
        ) : (
          <Modal>
            <IoMdSpeedometer />
          </Modal>
        )}
      </section>
    </section>
  );
};

export default Settings;
