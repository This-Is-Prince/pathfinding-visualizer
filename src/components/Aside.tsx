import { GiResize } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import { FaChessBoard, FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import useStore from "../store";
const Aside = () => {
  const {changeAsideModal,changePlay,clearBoard,isBoardClear,isMazeAnimationComplete,isPlay,openSettings}=useStore((store)=>({
    isPlay:store.isPlay,
    isBoardClear:store.isBoardClear,
    isMazeAnimationComplete:store.isMazeAnimationComplete,
    openSettings: store.openSettings,
    changeAsideModal: store.changeAsideModal,
    clearBoard: store.clearBoard,
    changePlay: store.changePlay,
  }))
  return (
    <aside className="aside">
      <button
        className="flex-center btn aside-btn"
        aria-label="settings"
        title="Settings"
        onClick={() => {
          openSettings(true);
        }}
      >
        <FiSettings />
      </button>
      <button
        className="flex-center btn aside-btn"
        aria-label="resize"
        title="Resize"
        onClick={() => {
          changeAsideModal(true);
        }}
      >
        <GiResize />
      </button>
      <button
        className="flex-center btn aside-btn"
        aria-label="clear board"
        title="Clear Board"
        onClick={() => {
          clearBoard(!isBoardClear);
        }}
      >
        <FaChessBoard />
      </button>
      <button
        className="flex-center btn aside-btn"
        aria-label="play/pause"
        title="Play / Pause"
        onClick={() => {
          if (isMazeAnimationComplete) {
            changePlay(!isPlay)
          }
        }}
      >
        {isMazeAnimationComplete ? (
          isPlay ? (
            <FaPauseCircle />
          ) : (
            <FaPlayCircle />
          )
        ) : (
          <FaPlayCircle />
        )}
      </button>
    </aside>
  );
};

export default Aside;
