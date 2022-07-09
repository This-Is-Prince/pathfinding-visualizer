import { FaTimesCircle } from "react-icons/fa";
import useStore from "../../store";

const AsideModal = () => {
  const {
    isAsideModalOpen,
    changeAsideModal,
    nodeMaxWidth,
    changeNodeMaxWidth,
  } = useStore((store) => ({
    isAsideModalOpen: store.isAsideModalOpen,
    changeAsideModal: store.changeAsideModal,
    nodeMaxWidth: store.nodeMaxWidth,
    changeNodeMaxWidth: store.changeNodeMaxWidth,
  }));
  return (
    <div
      className={`aside-modal__wrapper flex-center ${
        isAsideModalOpen ? "open--aside-modal" : ""
      }`}
    >
      <section className="aside-modal">
        <header className="aside-modal__header ">
          <p>Resize</p>
          <button
            className="btn flex-center aside-modal__close-btn"
            aria-label="close"
            onClick={() => {
              changeAsideModal(false);
            }}
          >
            <FaTimesCircle />
          </button>
        </header>
        <article className="aside-modal__content">
          <output className="output">{nodeMaxWidth}</output>
          <input
            type="range"
            min={window.innerHeight < 500 ? "15" : "25"}
            max={window.innerHeight < 500 ? "30" : "50"}
            value={nodeMaxWidth}
            onChange={(e) => {
              changeNodeMaxWidth(parseInt(e.target.value));
            }}
            className="range"
          />
        </article>
      </section>
    </div>
  );
};

export default AsideModal;
