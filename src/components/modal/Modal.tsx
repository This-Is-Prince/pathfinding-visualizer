import React, { useContext } from "react";
import AppContext from "../../app/AppContext";
import { FaWalking } from "react-icons/fa";
import { GiRaceCar, GiTurtle } from "react-icons/gi";

type ModalType = {
  children: any;
};
const Modal: React.FC<ModalType> = ({ children }) => {
  const { AppState } = useContext(AppContext);
  return (
    <section className="modal">
      <header className="modal__header ">
        <p className="modal__heading">
          <span className="flex-center">{children}</span>
          <span>{AppState.modalState.heading}</span>
        </p>
      </header>
      <article
        className={`modal__content ${
          AppState.modalState.name === "speed" ? "modal__speed" : ""
        }`}
      >
        {AppState.modalState.list.map(({ title, value, id }) => {
          return (
            <div className="radio-container" key={id}>
              <input
                type="radio"
                aria-label={title}
                name={AppState.modalState.name}
                value={value}
                className="radio flex-center"
              />
              {AppState.modalState.name === "speed" && (
                <p className="speed__icon flex-center">
                  {title === "slow" ? (
                    <GiTurtle />
                  ) : title === "normal" ? (
                    <FaWalking />
                  ) : (
                    <GiRaceCar />
                  )}
                </p>
              )}
              <p>{title}</p>
            </div>
          );
        })}
      </article>
    </section>
  );
};

export default Modal;
