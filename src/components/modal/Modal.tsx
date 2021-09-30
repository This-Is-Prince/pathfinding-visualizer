import React from "react";
import { IoMdSpeedometer } from "react-icons/io";
import { FaSitemap, FaRegTimesCircle, FaChessBoard } from "react-icons/fa";
import { GiMaze, GiBrickWall, GiPathDistance, GiWeight } from "react-icons/gi";
import { ModalType } from "../Settings";

const Modal: React.FC<ModalType> = ({ icon, title }) => {
  return (
    <section className="modal">
      <header className="modal__header ">
        <p className="modal__heading">
          <span className="flex-center">{icon}</span>
          <span>{title}</span>
        </p>
      </header>
      <article className="modal__content">
        <div className="radio-container">
          <input
            type="radio"
            aria-label="dijkstra's algorithm"
            name="algorithm"
            value="dijkstra"
            className="radio flex-center"
          />
          <p>dijkstra's algorithm</p>
        </div>
        <div className="radio-container">
          <input
            type="radio"
            aria-label="a* search"
            name="algorithm"
            value="a*"
            className="radio flex-center"
          />
          <p>a* search</p>
        </div>
        <div className="radio-container">
          <input
            type="radio"
            aria-label="greedy best-first search"
            name="algorithm"
            value="greedy"
            className="radio flex-center"
          />
          <p>greedy best-first search</p>
        </div>
        <div className="radio-container">
          <input
            type="radio"
            aria-label="swarm algorithm"
            name="algorithm"
            value="swarm"
            className="radio flex-center"
          />
          <p>swarm algorithm</p>
        </div>
        <div className="radio-container">
          <input
            type="radio"
            aria-label="convergent swarm algorithm"
            name="algorithm"
            value="convergent swarm"
            className="radio flex-center"
          />
          <p>convergent swarm algorithm</p>
        </div>
        <div className="radio-container">
          <input
            type="radio"
            aria-label="bidirectional swarm algorithm"
            name="algorithm"
            value="bidirectional swarm"
            className="radio flex-center"
          />
          <p>bidirectional swarm algorithm</p>
        </div>
        <div className="radio-container">
          <input
            type="radio"
            aria-label="breadth-fist search"
            name="algorithm"
            value="bfs"
            className="radio flex-center"
          />
          <p>breadth-fist search</p>
        </div>
        <div className="radio-container">
          <input
            type="radio"
            aria-label="depth-fist search"
            name="algorithm"
            value="dfs"
            className="radio flex-center"
          />
          <p>depth-fist search</p>
        </div>
      </article>
    </section>
  );
};

export default Modal;
