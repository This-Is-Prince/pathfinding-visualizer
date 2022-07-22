import React from "react";
import { FaWalking } from "react-icons/fa";
import { GiRaceCar, GiTurtle } from "react-icons/gi";
import { ModalType } from "../../types";
import useStore from "../../store";

const Modal: React.FC<ModalType> = ({ children, handleChange, radioState }) => {
  const { modalState } = useStore((store) => ({
    modalState: store.modalState,
  }));
  return (
    <section className="modal">
      <header className="modal__header ">
        <p className="modal__heading">
          <span className="flex-center modal__header__icon">{children}</span>
          <span>{modalState.heading}</span>
        </p>
      </header>
      <article
        className={`modal__content ${
          modalState.name === "speed" ? "modal__speed" : ""
        }`}
      >
        {modalState.list.map(({ title, value, id }) => {
          return (
            <div className="radio-container" key={id}>
              <input
                type="radio"
                aria-label={title}
                name={modalState.name}
                checked={radioState === value}
                value={value}
                onChange={handleChange}
                className={`radio flex-center ${
                  radioState === value ? "selected" : ""
                }`}
              />
              {modalState.name === "speed" && (
                <p
                  className={`speed__icon flex-center ${
                    radioState === value ? "selected" : ""
                  }`}
                >
                  {title === "slow" ? (
                    <GiTurtle />
                  ) : title === "normal" ? (
                    <FaWalking />
                  ) : (
                    <GiRaceCar />
                  )}
                </p>
              )}
              <p className={`${radioState === value ? "selected" : ""}`}>
                {title}
              </p>
            </div>
          );
        })}
      </article>
    </section>
  );
};

export default Modal;
