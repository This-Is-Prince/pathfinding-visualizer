import { useEffect } from "react";
import "./App.css";
import Main from "./components/Main";
import Aside from "./components/Aside";
import FullScreenModal from "./components/modal/FullScreenModal";
import Settings from "./components/Settings";
import AsideModal from "./components/modal/AsideModal";
import useStore from "./store";

const App = () => {
  const { changeFullscreenModal, isFullScreenModelOpen } = useStore(
    (store) => ({
      changeFullscreenModal: store.changeFullscreenModal,
      isFullScreenModelOpen: store.isFullScreenModelOpen,
    })
  );
  const checkScreen = () => {
    if (document.fullscreenElement) return;
    changeFullscreenModal(true);
  };
  useEffect(() => {
    document.addEventListener("fullscreenchange", checkScreen);
    return () => {
      document.removeEventListener("fullscreenchange", checkScreen);
    };
  }, []);
  return (
    <>
      {isFullScreenModelOpen ? (
        <FullScreenModal />
      ) : (
        <>
          <Aside />
          <Main />
          <Settings />
          <AsideModal />
        </>
      )}
    </>
  );
};

export default App;
