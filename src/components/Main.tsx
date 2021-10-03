import React, { useContext, useEffect, useRef } from "react";
import bfs from "../algorithm/bfs";
import AppContext from "../app/AppContext";
import { VertexType } from "../mazes/dfs";
import stair from "../mazes/stair";
import dfsAlgorithm from "../algorithm/dfs";
import dfs from "../mazes/dfs";
import mst from "../mazes/mst";

export let findXY = (id: string) => {
  id = id.substring(5);
  let index = id.search("-");
  let x = id.substring(0, index),
    y = id.substring(index + 1);
  return { x, y };
};

export type SpecialNodeType = {
  x: number;
  y: number;
  self: HTMLElement;
};

const Main = () => {
  const { AppState, dispatch } = useContext(AppContext);
  const mainRef = useRef<HTMLElement>({} as HTMLElement);
  const startNodeRef = useRef({} as SpecialNodeType);
  const targetNodeRef = useRef({} as SpecialNodeType);
  const rowRef = useRef(0);
  const columnRef = useRef(0);

  // path arr
  let pathArr = useRef([] as VertexType[]);
  let pathArrIndexRef = useRef(0);
  // visited arr
  let visitedArr = useRef([] as VertexType[]);
  let visitedArrIndexRef = useRef(0);

  // maze arr
  let mazeArr = useRef([] as VertexType[]);
  let mazeArrIndexRef = useRef(0);

  // animation function
  let animationFunRef: any = useRef();
  let animationRef: any = useRef();
  let animationArrRef: any = useRef();
  /**
   *
   * ANIMATION FUNCTION START
   *
   */

  let animatePath = () => {
    if (pathArrIndexRef.current >= pathArr.current.length) {
      visitedArrIndexRef.current = 0;
      dispatch({ type: "CHANGE_PLAY", payload: false });
      dispatch({ type: "ANIMATION_COMPLETE", payload: true });
      visitedArrIndexRef.current = 0;
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
      animationArrRef.current = animateVisited;
    } else {
      let { x, y } = pathArr.current[pathArrIndexRef.current];
      let node = document.getElementById(`node-${x}-${y}`)!;
      node.classList.remove("visited-node");
      node.classList.add("path-node");
      setTimeout(() => {
        animationRef.current = requestAnimationFrame(animationFunRef.current);
      }, 0);
      pathArrIndexRef.current++;
    }
  };

  let animateVisited = () => {
    let { x: sX, y: sY } = startNodeRef.current;
    let { x: tX, y: tY } = targetNodeRef.current;
    if (visitedArrIndexRef.current >= visitedArr.current.length) {
      pathArrIndexRef.current = 0;
      animationArrRef.current = animatePath;
      animationFunRef.current = animationArrRef.current;
      animationRef.current = requestAnimationFrame(animationFunRef.current);
    } else {
      let id = visitedArr.current[visitedArrIndexRef.current];
      if (!((id.x === sX && id.y === sY) || (id.x === tX && id.y === tY))) {
        document
          .getElementById(`node-${id.x}-${id.y}`)!
          .classList.add("visited-node");
        setTimeout(() => {
          animationRef.current = requestAnimationFrame(animationFunRef.current);
        }, 0);
      } else {
        setTimeout(() => {
          animationRef.current = requestAnimationFrame(animationFunRef.current);
        }, 0);
      }
      visitedArrIndexRef.current++;
    }
  };
  let animateMaze = () => {
    if (mazeArrIndexRef.current >= mazeArr.current.length) {
      visitedArrIndexRef.current = 0;
      dispatch({ type: "MAZE_ANIMATION_COMPLETE", payload: true });
      dispatch({ type: "CHANGE_PLAY", payload: false });
      visitedArrIndexRef.current = 0;
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
      animationArrRef.current = animateVisited;
    } else {
      let { x, y } = mazeArr.current[mazeArrIndexRef.current];
      let node = document.getElementById(`node-${x}-${y}`)!;
      node.classList.remove("black-node-1");
      animationRef.current = requestAnimationFrame(animationFunRef.current);
      mazeArrIndexRef.current++;
    }
  };
  useEffect(() => {
    updateSize();
    let vertices: VertexType[] = [];
    let maze = AppState.maze;
    let r = rowRef.current,
      c = columnRef.current;
    if (maze === "stair pattern") {
      vertices = stair(r, c);
    } else if (
      maze === "recursive division" ||
      maze === "recursive division (vertical skew)" ||
      maze === "recursive division (horizontal skew)"
    ) {
      vertices = dfs(r, c, maze);
    } else if (maze === "mst maze") {
      vertices = mst(r, c);
    }
    document.querySelectorAll(".node").forEach((node) => {
      node.classList.add("black-node-1");
    });
    let { x, y } = startNodeRef.current;
    let node = document.getElementById(`node-${x}-${y}`)!;
    node.classList.remove("black-node-1");
    let { x: tX, y: tY } = targetNodeRef.current;
    node = document.getElementById(`node-${tX}-${tY}`)!;
    node.classList.remove("black-node-1");
    mazeArrIndexRef.current = 0;
    mazeArr.current = vertices;
    animationFunRef.current = animateMaze;
    animationRef.current = requestAnimationFrame(animationFunRef.current);
  }, [AppState.maze]);
  /**
   *
   * EVENTS
   *
   */
  const handleMouseEnter = (event: any) => {
    let { x: sX, y: sY } = findXY(event.target.getAttribute("id"));
    let x = parseInt(sX),
      y = parseInt(sY);
    const { x: startNodeX, y: startNodeY } = startNodeRef.current;
    const { x: targetNodeX, y: targetNodeY } = targetNodeRef.current;
    if (
      (x === startNodeX && y === startNodeY) ||
      (x === targetNodeX && y === targetNodeY)
    ) {
      event.target.classList.remove("black-node");
      event.target.classList.remove("black-node-1");
    } else {
      event.target.classList.add("black-node");
    }
  };
  let handleMouseUp = () => {
    document.querySelectorAll(".node").forEach((node) => {
      node.removeEventListener("mouseenter", handleMouseEnter);
    });
  };

  const handleTouchEnd = () => {
    document.querySelectorAll(".node").forEach((node) => {
      node.removeEventListener("touchstart", handleTouchStartOfStartNode);
      node.removeEventListener("touchstart", handleTouchStartOfTargetNode);
    });
  };

  // start node events

  const startNodeOnMouseEnter = (event: any) => {
    if (!event.target.getAttribute("id")) {
      return;
    }
    event.target.classList.remove("black-node");
    event.target.classList.remove("black-node-1");

    const { x, y } = findXY(event.target.getAttribute("id"));
    let currParentOfStartNode = document.getElementById(`node-${x}-${y}`)!;
    if (!currParentOfStartNode.hasChildNodes()) {
      let prevParentOfStartNode = document.getElementById(
        `node-${startNodeRef.current.x}-${startNodeRef.current.y}`
      )!;
      prevParentOfStartNode.removeChild(startNodeRef.current.self);
      startNodeRef.current = {
        ...startNodeRef.current,
        x: parseInt(x),
        y: parseInt(y),
      };
      currParentOfStartNode.appendChild(startNodeRef.current.self);
      dispatch({
        type: "ADD_SPECIAL_START_NODE",
        payload: { x: parseInt(x), y: parseInt(y) },
      });
    }
  };
  const startNodeOnMouseDown = () => {
    document.querySelectorAll(".node").forEach((node) => {
      node.addEventListener("mouseenter", startNodeOnMouseEnter);
    });
  };
  const startNodeOnMouseUp = () => {
    document.querySelectorAll(".node").forEach((node) => {
      node.removeEventListener("mouseenter", startNodeOnMouseEnter);
    });
  };
  const handleTouchStartOfStartNode = (event: any) => {
    startNodeOnMouseEnter(event);
  };
  const startNodeOnDBLClick = () => {
    document.querySelectorAll(".node").forEach((node) => {
      node.addEventListener("touchstart", handleTouchStartOfStartNode);
    });
  };

  //  target node events
  const targetNodeOnMouseEnter = (event: any) => {
    if (!event.target.getAttribute("id")) {
      return;
    }
    event.target.classList.remove("black-node");
    event.target.classList.remove("black-node-1");
    const { x, y } = findXY(event.target.getAttribute("id"));
    let currParentOfTargetNode = document.getElementById(`node-${x}-${y}`)!;
    if (!currParentOfTargetNode.hasChildNodes()) {
      let prevParentOfTargetNode = document.getElementById(
        `node-${targetNodeRef.current.x}-${targetNodeRef.current.y}`
      )!;
      prevParentOfTargetNode.removeChild(targetNodeRef.current.self);
      targetNodeRef.current = {
        ...targetNodeRef.current,
        x: parseInt(x),
        y: parseInt(y),
      };
      currParentOfTargetNode.appendChild(targetNodeRef.current.self);
      dispatch({
        type: "ADD_SPECIAL_TARGET_NODE",
        payload: { x: parseInt(x), y: parseInt(y) },
      });
    }
  };
  const targetNodeOnMouseDown = () => {
    document.querySelectorAll(".node").forEach((node) => {
      node.addEventListener("mouseenter", targetNodeOnMouseEnter);
    });
  };
  const targetNodeOnMouseUp = () => {
    document.querySelectorAll(".node").forEach((node) => {
      node.removeEventListener("mouseenter", targetNodeOnMouseEnter);
    });
  };
  const handleTouchStartOfTargetNode = (event: any) => {
    targetNodeOnMouseEnter(event);
  };
  const targetNodeOnDBLClick = () => {
    document.querySelectorAll(".node").forEach((node) => {
      node.addEventListener("touchstart", handleTouchStartOfTargetNode);
    });
  };
  /**
   *
   * UPDATE SIZE END
   *
   */
  const updateSize = () => {
    cancelAnimationFrame(animationRef.current);
    dispatch({ type: "CHANGE_PLAY", payload: false });
    dispatch({ type: "CHANGE_ALGORITHM", payload: "" });
    let width = mainRef.current.getBoundingClientRect().width - 20;
    let height = mainRef.current.getBoundingClientRect().height - 20;

    let prevNodesContainer = document.getElementById("nodes-container");
    if (prevNodesContainer) {
      document.querySelectorAll(".node").forEach((node) => {
        node.remove();
      });
      prevNodesContainer.remove();
    }
    let main = mainRef.current;
    let nodesContainer = document.createElement("section");
    nodesContainer.setAttribute("id", "nodes-container");
    nodesContainer.style.width = `${width}px`;
    nodesContainer.style.height = `${height}px`;
    main.appendChild(nodesContainer);

    // calculating row and column

    let noOfNodesInRow = Math.floor(height / AppState.nodeMaxWidth),
      noOfNodesInColumn = Math.floor(width / AppState.nodeMaxWidth);
    rowRef.current = noOfNodesInRow;
    columnRef.current = noOfNodesInColumn;
    const handleMouseDown = (event: any) => {
      if (!event.target.getAttribute("id")) {
        return;
      }
      let { x: sX, y: sY } = findXY(event.target.getAttribute("id"));
      let clickNodeX = parseInt(sX),
        clickNodeY = parseInt(sY);
      const { x: startNodeX, y: startNodeY } = startNodeRef.current;
      const { x: targetNodeX, y: targetNodeY } = targetNodeRef.current;
      if (
        !(
          (clickNodeX === startNodeX && clickNodeY === startNodeY) ||
          (clickNodeX === targetNodeX && clickNodeY === targetNodeY)
        )
      ) {
        document.querySelectorAll(".node").forEach((node) => {
          node.addEventListener("mouseenter", handleMouseEnter);
        });
        let isBlack =
          event.target.classList.contains("black-node") ||
          event.target.classList.contains("black-node-1");
        if (isBlack) {
          event.target.classList.remove("black-node-1");
          event.target.classList.remove("black-node");
        } else {
          event.target.classList.add("black-node");
        }
      }
    };

    let row = Math.floor(noOfNodesInRow / 2);
    let startCol = Math.floor(noOfNodesInColumn / 4);
    let targetCol = Math.floor(noOfNodesInColumn / 4) * 3;
    let startNode = document.createElement("img");
    startNode.src = "http://localhost:3000/src/assets/start.png";
    startNode.title = "Starting Node";
    startNode.alt = "Starting Node Image";
    let targetNode = document.createElement("img");
    targetNode.src = "http://localhost:3000/src/assets/target.png";
    targetNode.title = "Target Node";
    targetNode.alt = "Target Node Image";
    // making all nodes
    for (let i = 0; i < noOfNodesInRow; i++) {
      let nodesRow = document.createElement("article");
      nodesRow.classList.add("nodes-row");
      nodesContainer.appendChild(nodesRow);
      for (let j = 0; j < noOfNodesInColumn; j++) {
        let node = document.createElement("div");
        node.setAttribute("id", `node-${i}-${j}`);
        node.setAttribute("class", "node");
        if (i === row && j === startCol) {
          startNode.classList.add("startNode");
          node.appendChild(startNode);
          startNodeRef.current = { x: row, y: startCol, self: startNode };
        } else if (i === row && j === targetCol) {
          targetNode.classList.add("endNode");
          node.appendChild(targetNode);
          targetNodeRef.current = { x: row, y: targetCol, self: targetNode };
        }
        nodesRow.appendChild(node);
        node.addEventListener("mousedown", handleMouseDown);
        node.addEventListener("mouseup", handleMouseUp);
        node.addEventListener("touchend", handleTouchEnd);
      }
    }
    dispatch({
      type: "ADD_SPECIAL_START_NODE",
      payload: { x: row, y: startCol },
    });
    dispatch({
      type: "ADD_SPECIAL_TARGET_NODE",
      payload: { x: row, y: targetCol },
    });

    startNode.addEventListener("mousedown", startNodeOnMouseDown);
    startNode.addEventListener("mouseup", startNodeOnMouseUp);
    startNode.addEventListener("dblclick", startNodeOnDBLClick);

    targetNode.addEventListener("mousedown", targetNodeOnMouseDown);
    targetNode.addEventListener("mouseup", targetNodeOnMouseUp);
    targetNode.addEventListener("dblclick", targetNodeOnDBLClick);
    visitedArrIndexRef.current = 0;
    visitedArr.current = [];
    pathArr.current = [];
    animationArrRef.current = animateVisited;
  };

  /**
   *
   * UPDATE SIZE END
   *
   */
  useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);
  useEffect(() => {
    updateSize();
  }, [AppState.isBoardClear, AppState.nodeMaxWidth]);

  // animation for algorithm

  // animation complete
  useEffect(() => {
    visitedArrIndexRef.current = 0;
    let obj = { visitedArr: [] as VertexType[], pathArr: [] as VertexType[] };
    let algo = AppState.algorithm;
    if (algo === "bfs") {
      obj = bfs(
        rowRef.current,
        columnRef.current,
        startNodeRef.current,
        targetNodeRef.current
      );
    } else if (algo === "dfs") {
      obj = dfsAlgorithm(
        rowRef.current,
        columnRef.current,
        startNodeRef.current,
        targetNodeRef.current
      );
    }
    visitedArr.current = obj.visitedArr;
    pathArr.current = obj.pathArr;
    animationArrRef.current = animateVisited;
  }, [AppState.algorithm]);
  useEffect(() => {
    if (AppState.isPlay) {
      if (AppState.isAnimationComplete) {
        let row = rowRef.current,
          column = columnRef.current;
        for (let i = 0; i < row; i++) {
          for (let j = 0; j < column; j++) {
            let elm = document.getElementById(`node-${i}-${j}`)!;
            let isVisited = elm.classList.contains("visited-node");
            let isPath = elm.classList.contains("path-node");
            if (isVisited) {
              document
                .getElementById(`node-${i}-${j}`)!
                .classList.remove("visited-node");
            }
            if (isPath) {
              document
                .getElementById(`node-${i}-${j}`)!
                .classList.remove("path-node");
            }
          }
        }
        dispatch({ type: "ANIMATION_COMPLETE", payload: false });
      }
      console.log("play");
      animationFunRef.current = animationArrRef.current;
      animationRef.current = requestAnimationFrame(animationFunRef.current);
    } else {
      console.log("pause");
      animationFunRef.current = () => {};
      cancelAnimationFrame(animationRef.current);
    }
  }, [AppState.isPlay]);
  return <main ref={mainRef} className="main flex-center"></main>;
};

export default Main;
