import { useRef } from "react";
import { IoMdSpeedometer } from "react-icons/io";
import { FaSitemap, FaRegTimesCircle } from "react-icons/fa";
import { GiMaze, GiBrickWall, GiPathDistance, GiWeight } from "react-icons/gi";
import Modal from "./modal/Modal";
import { mazesPatterns, algorithms, speed as speeds } from "../assets/data";
import { VertexType } from "../types";
import useStore from "../store";

const Settings = () => {
  const weightArr = useRef([] as VertexType[]);
  const {
    algorithm,
    changeAlgorithm,
    changeFindAnimationNodes,
    changeMaze,
    changeModalState,
    changeSpeed,
    grid,
    isAnimationComplete,
    isMazeAnimationComplete,
    isSettingsOpen,
    maze,
    mazeAnimationComplete,
    modalState,
    openSettings,
    speed,
  } = useStore((store) => ({
    maze: store.maze,
    grid: store.grid,
    speed: store.speed,
    algorithm: store.algorithm,
    modalState: store.modalState,
    isSettingsOpen: store.isSettingsOpen,
    isAnimationComplete: store.isAnimationComplete,
    isMazeAnimationComplete: store.isMazeAnimationComplete,

    // Action
    changeMaze: store.changeMaze,
    changeSpeed: store.changeSpeed,
    openSettings: store.openSettings,
    changeAlgorithm: store.changeAlgorithm,
    changeModalState: store.changeModalState,
    mazeAnimationComplete: store.mazeAnimationComplete,
    changeFindAnimationNodes: store.changeFindAnimationNodes,
  }));
  return (
    <section
      className={`settings-section  ${isSettingsOpen ? "settings--open" : ""}`}
    >
      <header className="settings-section__header">
        <h2 className="settings__heading">Settings</h2>
        <button
          className="btn settings__close-btn flex-center"
          aria-label="settings close "
          title="Settings Close"
          onClick={() => {
            openSettings(false);
          }}
        >
          <FaRegTimesCircle />
        </button>
      </header>
      <section className="settings-section__content">
        <aside className="settings-types">
          <button
            className={`btn setting-btn ${
              modalState.heading === "mazes & patterns" ? "selected" : ""
            }`}
            aria-label="choose mazes"
            title="Choose Mazes"
            onClick={() => {
              changeModalState(mazesPatterns);
            }}
          >
            <span className="flex-center">
              <GiMaze />
            </span>
            <span>Mazes & Patterns</span>
          </button>
          <button
            className={`btn setting-btn ${
              modalState.heading === "algorithms" ? "selected" : ""
            }`}
            aria-label="Choose Algorithm"
            title="Choose Algorithm"
            onClick={() => {
              changeModalState(algorithms);
            }}
          >
            <span className="flex-center">
              <FaSitemap />
            </span>
            <span>Algorithms</span>
          </button>
          <button
            className={`btn setting-btn ${
              modalState.heading === "speed" ? "selected" : ""
            }`}
            aria-label="Change Speed"
            title="Change Speed"
            onClick={() => {
              changeModalState(speeds);
            }}
          >
            <span className="flex-center">
              <IoMdSpeedometer />
            </span>
            <span>Speed</span>
          </button>
          <button
            className="btn setting-btn "
            aria-label="Add Weight"
            title="Add Weight"
            onClick={(event) => {
              if (!isMazeAnimationComplete || !isAnimationComplete) {
                event.preventDefault();
                return;
              }
              weightArr.current.forEach(({ x, y }) => {
                let elm = document.getElementById(`node-${x}-${y}`)!;
                elm.textContent = "";
                elm.removeAttribute("data-weight");
              });
              weightArr.current = [];
              let { row, column } = grid,
                r = 0,
                c = 0,
                weight = 0,
                elm: HTMLElement;
              for (let i = 0; i < 100; i++) {
                r = Math.floor(Math.random() * row);
                c = Math.floor(Math.random() * column);
                elm = document.getElementById(`node-${r}-${c}`)!;
                let isValid =
                  !elm.hasChildNodes() &&
                  !elm.classList.contains("black-node") &&
                  !elm.classList.contains("black-node-1");
                if (isValid) {
                  weight = Math.floor(Math.random() * 40) + 10;
                  weightArr.current.push({ x: r, y: c });
                  elm.setAttribute("data-weight", `${weight}`);
                  elm.textContent = `${weight}`;
                }
              }
              changeFindAnimationNodes(true);
            }}
          >
            <span className="flex-center">
              <GiWeight />
            </span>
            <span>Add Weight</span>
          </button>
          <button
            className="btn setting-btn "
            aria-label="Clear Path"
            title="Clear Path"
            onClick={(event) => {
              if (!isMazeAnimationComplete || !isAnimationComplete) {
                event.preventDefault();
                return;
              }
              document.querySelectorAll(".path-node").forEach((node) => {
                node.classList.remove("visited-node");
                node.classList.remove("path-node");
              });
              document.querySelectorAll(".visited-node").forEach((node) => {
                node.classList.remove("visited-node");
              });
              document.querySelectorAll(".path-node-1").forEach((node) => {
                node.classList.remove("visited-node-1");
                node.classList.remove("path-node-1");
              });
              document.querySelectorAll(".visited-node-1").forEach((node) => {
                node.classList.remove("visited-node-1");
              });
            }}
          >
            <span className="flex-center">
              <GiPathDistance />
            </span>
            <span>Clear Path</span>
          </button>
          <button
            className="btn setting-btn "
            aria-label="Clear Walls"
            title="Clear Walls"
            onClick={(event) => {
              if (!isMazeAnimationComplete || !isAnimationComplete) {
                event.preventDefault();
                return;
              }
              document.querySelectorAll(".black-node").forEach((node) => {
                node.classList.remove("black-node");
              });
              document.querySelectorAll(".black-node-1").forEach((node) => {
                node.classList.remove("black-node-1");
              });
              changeFindAnimationNodes(true);
              mazeAnimationComplete(true);
              changeMaze("");
            }}
          >
            <span className="flex-center">
              <GiBrickWall />
            </span>
            <span>Clear Walls</span>
          </button>
        </aside>
        {modalState.name === "mazes" ? (
          <Modal
            radioState={maze}
            handleChange={(e) => {
              changeFindAnimationNodes(true);
              openSettings(true);
              mazeAnimationComplete(false);
              changeMaze(e.target.value);
            }}
          >
            <GiMaze />
          </Modal>
        ) : modalState.name === "algorithm" ? (
          <Modal
            radioState={algorithm}
            handleChange={(e) => {
              changeFindAnimationNodes(true);
              changeAlgorithm(e.target.value);
            }}
          >
            <FaSitemap />
          </Modal>
        ) : (
          <Modal
            radioState={speed}
            handleChange={(e) => {
              changeSpeed(e.target.value);
            }}
          >
            <IoMdSpeedometer />
          </Modal>
        )}
      </section>
    </section>
  );
};

export default Settings;
