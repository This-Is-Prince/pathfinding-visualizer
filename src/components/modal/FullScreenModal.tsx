import useStore from "../../store";

const FullScreenModal = () => {
  const { changeFullscreenModal } = useStore((store) => ({
    changeFullscreenModal: store.changeFullscreenModal,
  }));
  const changeFullScreen = () => {
    const fullScreenCheck = () => {
      if (document.fullscreenElement) return;
      return document.documentElement.requestFullscreen();
    };

    const rotate = async () => {
      try {
        if (
          screen.orientation.type !== "landscape-secondary" &&
          screen.orientation.type !== "landscape-primary"
        ) {
          await fullScreenCheck();
          await screen.orientation.lock("landscape");
        }
        changeFullscreenModal(false);
      } catch (error) {
        console.log(error);
      }
    };
    rotate();
  };
  return (
    <div className="fullscreen-modal flex-center">
      <button className="btn fullscreen-modal__btn" onClick={changeFullScreen}>
        let's go...
      </button>
    </div>
  );
};

export default FullScreenModal;
