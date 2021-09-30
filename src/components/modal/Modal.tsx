import React, { useContext } from "react";
import AppContext from "../../app/AppContext";

const Modal = () => {
  const { AppState, dispatch } = useContext(AppContext);
  const changeFullScreen = () => {
    dispatch({ type: "CHANGE_FULLSCREEN", payload: false });
  };
  return (
    <div className="fullscreen-modal flex-center">
      <button className="btn fullscreen-modal__btn" onClick={changeFullScreen}>
        let's go...
      </button>
    </div>
  );
};

export default Modal;
