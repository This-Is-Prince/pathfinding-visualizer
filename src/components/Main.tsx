import React, { useCallback, useContext, useEffect, useRef } from "react";
import bfs from "../algorithm/bfs";
import AppContext from "../app/AppContext";
import { VertexType } from "../mazes/dfs";
import dfsAlgorithm from "../algorithm/dfs";
import dfs from "../mazes/dfs";
import mst from "../mazes/mst";
import dijkstra from "../algorithm/dijkstra";
import gbfs from "../algorithm/gbfs";
import aStar from "../algorithm/a_star";
import circle from "../mazes/circle";

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
  let animateRef: any = useRef();
  let speed = useRef(0);

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
      dispatch({ type: "CHANGE_PLAY", payload: false });
      dispatch({ type: "ANIMATION_COMPLETE", payload: true });
      animateRef.current = animate;
      targetNodeRef.current.self.addEventListener(
        "mousedown",
        animateRef.current
      );
      resetAnimation();
      addAllEventListeners();
    } else {
      let { x, y } = pathArr.current[pathArrIndexRef.current];
      let node = document.getElementById(`node-${x}-${y}`)!;
      node.classList.remove("visited-node");
      node.classList.remove("visited-node-1");
      node.classList.add("path-node");
      setTimeout(() => {
        animationRef.current = requestAnimationFrame(animationFunRef.current);
      }, speed.current);
      pathArrIndexRef.current++;
    }
  };

  let animateVisited = () => {
    if (visitedArrIndexRef.current >= visitedArr.current.length) {
      pathArrIndexRef.current = 0;
      animationArrRef.current = animatePath;
      animationFunRef.current = animationArrRef.current;
      animationRef.current = requestAnimationFrame(animationFunRef.current);
    } else {
      let { x, y } = visitedArr.current[visitedArrIndexRef.current];
      let elm = document.getElementById(`node-${x}-${y}`)!;
      elm.classList.add("visited-node");
      setTimeout(() => {
        animationRef.current = requestAnimationFrame(animationFunRef.current);
      }, speed.current);
      visitedArrIndexRef.current++;
    }
  };
  let animateMaze = () => {
    if (mazeArrIndexRef.current >= mazeArr.current.length) {
      visitedArrIndexRef.current = 0;
      dispatch({ type: "MAZE_ANIMATION_COMPLETE", payload: true });
      dispatch({ type: "CHANGE_PLAY", payload: false });
      visitedArrIndexRef.current = 0;
      addAllEventListeners();

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
  const resetAnimation = () => {
    visitedArrIndexRef.current = 0;
    cancelAnimationFrame(animationRef.current);
    animationRef.current = null;
    animationArrRef.current = animateVisited;
  };
  const resetPathVisitedNode = useCallback(() => {
    document.querySelectorAll(".visited-node").forEach((node) => {
      node.classList.remove("visited-node");
    });
    document.querySelectorAll(".visited-node-1").forEach((node) => {
      node.classList.remove("visited-node-1");
    });
    document.querySelectorAll(".path-node").forEach((node) => {
      node.classList.remove("path-node");
    });
    document.querySelectorAll(".path-node-1").forEach((node) => {
      node.classList.remove("path-node-1");
    });
  }, []);
  let checkAlgorithm = useCallback(
    (
      r: number,
      c: number,
      algo: string,
      startNode: SpecialNodeType,
      targetNode: SpecialNodeType
    ) => {
      let obj = {
        visitedArr: [] as VertexType[],
        pathArr: [] as VertexType[],
      };
      let { x, y } = startNode;
      let { x: tX, y: tY } = targetNode;
      if (algo === "bfs") {
        obj = bfs(r, c, { x, y }, { x: tX, y: tY });
      } else if (algo === "dfs") {
        obj = dfsAlgorithm(r, c, { x, y }, { x: tX, y: tY });
      } else if (algo === "dijkstra") {
        obj = dijkstra(r, c, { x, y }, { x: tX, y: tY });
      } else if (algo === "greedy best-first search") {
        obj = gbfs(r, c, { x, y }, { x: tX, y: tY });
      } else if (algo === "a*") {
        obj = aStar(r, c, { x, y }, { x: tX, y: tY });
      }
      return obj;
    },
    []
  );
  let animate = () => {
    console.log("animation");
    let obj = checkAlgorithm(
      rowRef.current,
      columnRef.current,
      AppState.algorithm,
      startNodeRef.current,
      targetNodeRef.current
    );
    resetPathVisitedNode();
    visitedArr.current = obj.visitedArr;
    pathArr.current = obj.pathArr;
    visitedArr.current.forEach(({ x, y }) => {
      document
        .getElementById(`node-${x}-${y}`)!
        .classList.add("visited-node-1");
    });
    pathArr.current.forEach(({ x, y }) => {
      document.getElementById(`node-${x}-${y}`)!.classList.add("path-node-1");
    });
  };

  /**
   *
   * EVENTS
   *
   */
  const handleMouseEnter = useCallback((event: any) => {
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
  }, []);
  const handleMouseDown = useCallback((event: any) => {
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
  }, []);
  let handleMouseUp = useCallback(() => {
    document.querySelectorAll(".node").forEach((node) => {
      node.removeEventListener("mouseenter", handleMouseEnter);
    });
  }, []);

  const handleTouchEnd = useCallback(() => {
    document.querySelectorAll(".node").forEach((node) => {
      node.removeEventListener("touchstart", handleTouchStartOfStartNode);
      node.removeEventListener("touchstart", handleTouchStartOfTargetNode);
    });
  }, []);

  // start node events

  const startNodeOnMouseEnter = useCallback((event: any) => {
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
  }, []);
  const startNodeOnMouseDown = useCallback(() => {
    document.querySelectorAll(".node").forEach((node) => {
      node.addEventListener("mouseenter", startNodeOnMouseEnter);
    });
  }, []);
  const startNodeOnMouseUp = useCallback(() => {
    document.querySelectorAll(".node").forEach((node) => {
      node.removeEventListener("mouseenter", startNodeOnMouseEnter);
    });
  }, []);
  const handleTouchStartOfStartNode = useCallback((event: any) => {
    startNodeOnMouseEnter(event);
  }, []);
  const startNodeOnDBLClick = useCallback(() => {
    document.querySelectorAll(".node").forEach((node) => {
      node.addEventListener("touchstart", handleTouchStartOfStartNode);
    });
  }, []);

  //  target node events
  const targetNodeOnMouseEnter = useCallback((event: any) => {
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
  }, []);
  const targetNodeOnMouseDown = useCallback(() => {
    document.querySelectorAll(".node").forEach((node) => {
      node.addEventListener("mouseenter", targetNodeOnMouseEnter);
    });
  }, []);
  const targetNodeOnMouseUp = useCallback(() => {
    document.querySelectorAll(".node").forEach((node) => {
      node.removeEventListener("mouseenter", targetNodeOnMouseEnter);
    });
  }, []);
  const handleTouchStartOfTargetNode = useCallback((event: any) => {
    targetNodeOnMouseEnter(event);
  }, []);
  const targetNodeOnDBLClick = useCallback(() => {
    document.querySelectorAll(".node").forEach((node) => {
      node.addEventListener("touchstart", handleTouchStartOfTargetNode);
    });
  }, []);

  /**
   *
   * UPDATE SIZE END
   *
   */
  const updateSize = () => {
    console.log("update size");
    resetAnimation();
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
    dispatch({
      type: "ADD_GRID",
      payload: { row: noOfNodesInRow, column: noOfNodesInColumn },
    });

    rowRef.current = noOfNodesInRow;
    columnRef.current = noOfNodesInColumn;

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

    addSpecialNodeEvents();
    visitedArr.current = [];
    pathArr.current = [];
    animationArrRef.current = animateVisited;
  };
  const removeSpecialNodeEvents = () => {
    startNodeRef.current.self.removeEventListener(
      "mousedown",
      startNodeOnMouseDown
    );
    startNodeRef.current.self.removeEventListener(
      "mouseup",
      startNodeOnMouseUp
    );
    startNodeRef.current.self.removeEventListener(
      "dblclick",
      startNodeOnDBLClick
    );
    targetNodeRef.current.self.removeEventListener(
      "mousedown",
      targetNodeOnMouseDown
    );
    targetNodeRef.current.self.removeEventListener(
      "mousedown",
      animateRef.current
    );
    targetNodeRef.current.self.removeEventListener(
      "mouseup",
      targetNodeOnMouseUp
    );
    targetNodeRef.current.self.removeEventListener(
      "dblclick",
      targetNodeOnDBLClick
    );
  };
  const nodeEventRemove = (node: Element) => {
    node.removeEventListener("mousedown", handleMouseDown);
    node.removeEventListener("mouseup", handleMouseUp);
    node.removeEventListener("touchend", handleTouchEnd);
  };
  const removeAllEventListeners = () => {
    document.querySelectorAll(".node").forEach((node) => {
      nodeEventRemove(node);
    });
    removeSpecialNodeEvents();
  };
  const addSpecialNodeEvents = () => {
    startNodeRef.current.self.addEventListener(
      "mousedown",
      startNodeOnMouseDown
    );
    startNodeRef.current.self.addEventListener("mouseup", startNodeOnMouseUp);
    startNodeRef.current.self.addEventListener("dblclick", startNodeOnDBLClick);
    targetNodeRef.current.self.addEventListener(
      "mousedown",
      targetNodeOnMouseDown
    );
    targetNodeRef.current.self.addEventListener("mouseup", targetNodeOnMouseUp);
    targetNodeRef.current.self.addEventListener(
      "dblclick",
      targetNodeOnDBLClick
    );
  };
  const addAllEventListeners = () => {
    document.querySelectorAll(".node").forEach((node) => {
      node.addEventListener("mousedown", handleMouseDown);
      node.addEventListener("mouseup", handleMouseUp);
      node.addEventListener("touchend", handleTouchEnd);
    });
    addSpecialNodeEvents();
  };
  /**
   *
   * UPDATE SIZE END
   *
   */

  /**
   * all useEffect start
   */

  // useEffect for Speed
  useEffect(() => {
    console.log("useEffect speed");
    speed.current =
      AppState.speed === "fast" ? 0 : AppState.speed === "slow" ? 200 : 100;
  }, [AppState.speed]);

  // useEffect for Maze
  useEffect(() => {
    console.log("useEffect maze");
    if (AppState.maze) {
      console.log("in maze");
      updateSize();
      let vertices: VertexType[] = [];
      let maze = AppState.maze;
      let r = rowRef.current,
        c = columnRef.current;
      let { x, y } = startNodeRef.current;
      let { x: tX, y: tY } = targetNodeRef.current;
      if (maze === "circle pattern") {
        vertices = circle(r, c, { x, y }, { x: tX, y: tY });
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
        nodeEventRemove(node);
        node.classList.add("black-node-1");
      });
      removeSpecialNodeEvents();
      let node = document.getElementById(`node-${x}-${y}`)!;
      node.classList.remove("black-node-1");
      node = document.getElementById(`node-${tX}-${tY}`)!;
      node.classList.remove("black-node-1");
      mazeArrIndexRef.current = 0;
      mazeArr.current = vertices;
      animationFunRef.current = animateMaze;
      animationRef.current = requestAnimationFrame(animationFunRef.current);
    }
  }, [AppState.maze]);

  // useEffect for window resize event

  useEffect(() => {
    console.log("useEffect only one time");
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  // useEffect for isBoardClear,nodeMaxWidth

  useEffect(() => {
    console.log("useEffect isBoardClear nodeMaxWidth");
    updateSize();
  }, [AppState.isBoardClear, AppState.nodeMaxWidth]);

  // useEffect for algorithm

  useEffect(() => {
    console.log("useEffect algorithm");
    if (AppState.algorithm) {
      resetAnimation();
      resetPathVisitedNode();
      let obj = checkAlgorithm(
        rowRef.current,
        columnRef.current,
        AppState.algorithm,
        startNodeRef.current,
        targetNodeRef.current
      );
      if (obj.visitedArr.length > 0) {
        removeAllEventListeners();
      }
      visitedArr.current = obj.visitedArr;
      pathArr.current = obj.pathArr;
      animationArrRef.current = animateVisited;
    }
  }, [AppState.algorithm]);

  // useEffect for Play

  useEffect(() => {
    if (AppState.isPlay) {
      console.log("play");
      if (AppState.isAnimationComplete) {
        resetPathVisitedNode();
        dispatch({ type: "ANIMATION_COMPLETE", payload: false });
      }
      animationFunRef.current = animationArrRef.current;
      animationRef.current = requestAnimationFrame(animationFunRef.current);
    } else {
      console.log("pause");
      animationFunRef.current = () => {};
      cancelAnimationFrame(animationRef.current);
    }
  }, [AppState.isPlay]);
  /**
   * all useEffect end
   */
  return <main ref={mainRef} className="main flex-center"></main>;
};

export default Main;
