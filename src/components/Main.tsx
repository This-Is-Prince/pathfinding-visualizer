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

let findXY = (event: any) => {
  let id = event.target.getAttribute("id");
  id = id.substring(5);
  let index = id.search("-");
  let x = id.substring(0, index),
    y = id.substring(index + 1);
  return { x: parseInt(x), y: parseInt(y) };
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
   * Path Node Animation
   */
  let animatePathNode = () => {
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

  /**
   * Visited Node Animation
   */

  let animateVisitedNode = () => {
    if (visitedArrIndexRef.current >= visitedArr.current.length) {
      pathArrIndexRef.current = 0;
      animationArrRef.current = animatePathNode;
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

  /**
   * Maze Animation
   */

  let animateMazeNode = () => {
    if (mazeArrIndexRef.current >= mazeArr.current.length) {
      visitedArrIndexRef.current = 0;
      dispatch({ type: "MAZE_ANIMATION_COMPLETE", payload: true });
      dispatch({ type: "CHANGE_PLAY", payload: false });
      addAllEventListeners();
      resetAnimation();
    } else {
      let { x, y } = mazeArr.current[mazeArrIndexRef.current];
      let node = document.getElementById(`node-${x}-${y}`)!;
      node.classList.remove("black-node-1");
      animationRef.current = requestAnimationFrame(animationFunRef.current);
      mazeArrIndexRef.current++;
    }
  };

  /**
   * Reset Animation
   */
  const resetAnimation = () => {
    visitedArrIndexRef.current = 0;
    cancelAnimationFrame(animationRef.current);
    animationRef.current = null;
    animationArrRef.current = animateVisitedNode;
  };

  /**
   * Reset Path Visited Node
   */

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

  /**
   * Algorithm Check
   */

  let checkAlgorithm = useCallback(
    (
      r: number,
      c: number,
      algo: string,
      { x, y }: SpecialNodeType,
      { x: tX, y: tY }: SpecialNodeType
    ) => {
      switch (algo) {
        case "bfs":
          return bfs(r, c, { x, y }, { x: tX, y: tY });
        case "dfs":
          return dfsAlgorithm(r, c, { x, y }, { x: tX, y: tY });
        case "dijkstra":
          return dijkstra(r, c, { x, y }, { x: tX, y: tY });
        case "greedy best-first search":
          return gbfs(r, c, { x, y }, { x: tX, y: tY });
        case "a*":
          return aStar(r, c, { x, y }, { x: tX, y: tY });
        default:
          return { visitedArr: [], pathArr: [] };
      }
    },
    []
  );
  /**
   * Instant Animation
   */
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

  const specialNodeXY = () => {
    let { x: sX, y: sY } = startNodeRef.current;
    let { x: tX, y: tY } = targetNodeRef.current;
    return { sX, sY, tX, tY };
  };
  /**
   * Node Mouse Enter event
   */
  const handleMouseEnter = useCallback((event: any) => {
    let { x, y } = findXY(event);
    const { sX, sY, tX, tY } = specialNodeXY();
    if ((x === sX && y === sY) || (x === tX && y === tY)) {
      event.target.classList.remove("black-node");
      event.target.classList.remove("black-node-1");
    } else {
      event.target.classList.add("black-node");
    }
  }, []);

  /**
   * Node Mouse Down event
   */

  const handleMouseDown = useCallback((event: any) => {
    if (!event.target.getAttribute("id")) {
      return;
    }
    let { x, y } = findXY(event);
    const { sX, sY, tX, tY } = specialNodeXY();
    if (!((x === sX && y === sY) || (x === tX && y === tY))) {
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

  /**
   * Node Mouse Up event
   */

  let handleMouseUp = useCallback(() => {
    document.querySelectorAll(".node").forEach((node) => {
      node.removeEventListener("mouseenter", handleMouseEnter);
    });
  }, []);

  /**
   * Node Touch End event
   */

  const handleTouchEnd = useCallback(() => {
    document.querySelectorAll(".node").forEach((node) => {
      node.removeEventListener("touchstart", handleStartNodeMouseEnter);
      node.removeEventListener("touchstart", handleTargetNodeMouseEnter);
    });
  }, []);

  /**
   * Change Special node position
   */
  const changeSpecialNodePosition = (
    event: any,
    specialNode: SpecialNodeType
  ) => {
    if (!event.target.getAttribute("id")) {
      return;
    }
    event.target.classList.remove("black-node");
    event.target.classList.remove("black-node-1");
    const { x, y } = findXY(event);
    let currParentOfTargetNode = document.getElementById(`node-${x}-${y}`)!;
    if (!currParentOfTargetNode.hasChildNodes()) {
      let prevParentOfTargetNode = document.getElementById(
        `node-${specialNode.x}-${specialNode.y}`
      )!;
      prevParentOfTargetNode.removeChild(specialNode.self);
      currParentOfTargetNode.appendChild(specialNode.self);
      return {
        ...specialNode,
        x,
        y,
      };
    }
    return null;
  };
  /**
   * Start Node Mouse Enter Event
   */
  const handleStartNodeMouseEnter = (event: any) => {
    let specialNode = changeSpecialNodePosition(event, startNodeRef.current);
    if (specialNode) {
      startNodeRef.current = specialNode;
    }
  };

  /**
   * Start Node Mouse Down event
   */

  const startNodeOnMouseDown = useCallback(() => {
    document.querySelectorAll(".node").forEach((node) => {
      node.addEventListener("mouseenter", handleStartNodeMouseEnter);
    });
  }, []);

  /**
   * Start Node Mouse Up event
   */

  const startNodeOnMouseUp = useCallback(() => {
    document.querySelectorAll(".node").forEach((node) => {
      node.removeEventListener("mouseenter", handleStartNodeMouseEnter);
    });
  }, []);
  /**
   * Start Node Double Click event
   */

  const startNodeOnDBLClick = useCallback(() => {
    document.querySelectorAll(".node").forEach((node) => {
      node.addEventListener("touchstart", handleStartNodeMouseEnter);
    });
  }, []);

  /**
   * Target Node Mouse Enter event
   */

  const handleTargetNodeMouseEnter = (event: any) => {
    let specialNode = changeSpecialNodePosition(event, targetNodeRef.current);
    if (specialNode) {
      targetNodeRef.current = specialNode;
    }
  };

  /**
   * Target Node Mouse Down event
   */
  const targetNodeOnMouseDown = useCallback(() => {
    document.querySelectorAll(".node").forEach((node) => {
      node.addEventListener("mouseenter", handleTargetNodeMouseEnter);
    });
  }, []);
  /**
   * Target Node Mouse Up event
   */
  const targetNodeOnMouseUp = useCallback(() => {
    document.querySelectorAll(".node").forEach((node) => {
      node.removeEventListener("mouseenter", handleTargetNodeMouseEnter);
    });
  }, []);
  /**
   * Target Node Double Click event
   */
  const targetNodeOnDBLClick = useCallback(() => {
    document.querySelectorAll(".node").forEach((node) => {
      node.addEventListener("touchstart", handleTargetNodeMouseEnter);
    });
  }, []);

  /**
   * Update Size
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
        nodeEventAdd(node);
      }
    }
    addSpecialNodeEvents();
    visitedArr.current = [];
    pathArr.current = [];
    animationArrRef.current = animateVisitedNode;
  };
  /**
   * add all event
   */
  const addAllEventListeners = () => {
    document.querySelectorAll(".node").forEach(nodeEventAdd);
    addSpecialNodeEvents();
  };
  /**
   * remove all events
   */
  const removeAllEventListeners = () => {
    document.querySelectorAll(".node").forEach(nodeEventRemove);
    removeSpecialNodeEvents();
  };
  /**
   * add node event
   */
  const nodeEventAdd = (node: Element) => {
    node.addEventListener("mousedown", handleMouseDown);
    node.addEventListener("mouseup", handleMouseUp);
    node.addEventListener("touchend", handleTouchEnd);
  };
  /**
   * remove node event
   */
  const nodeEventRemove = (node: Element) => {
    node.removeEventListener("mousedown", handleMouseDown);
    node.removeEventListener("mouseup", handleMouseUp);
    node.removeEventListener("touchend", handleTouchEnd);
  };

  /**
   * add special node event
   */
  const addSpecialNodeEvents = () => {
    let target = targetNodeRef.current.self;
    let start = startNodeRef.current.self;
    start.addEventListener("mousedown", startNodeOnMouseDown);
    start.addEventListener("mouseup", startNodeOnMouseUp);
    start.addEventListener("dblclick", startNodeOnDBLClick);
    target.addEventListener("mousedown", targetNodeOnMouseDown);
    target.addEventListener("mouseup", targetNodeOnMouseUp);
    target.addEventListener("dblclick", targetNodeOnDBLClick);
  };
  /**
   * remove special node event
   */

  const removeSpecialNodeEvents = () => {
    let target = targetNodeRef.current.self;
    let start = startNodeRef.current.self;
    start.removeEventListener("mousedown", startNodeOnMouseDown);
    start.removeEventListener("mouseup", startNodeOnMouseUp);
    start.removeEventListener("dblclick", startNodeOnDBLClick);
    target.removeEventListener("mousedown", targetNodeOnMouseDown);
    target.removeEventListener("mouseup", targetNodeOnMouseUp);
    target.removeEventListener("dblclick", targetNodeOnDBLClick);
  };

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
      let { sX, sY, tX, tY } = specialNodeXY();
      if (maze === "circle pattern") {
        vertices = circle(r, c, { x: sX, y: sY }, { x: tX, y: tY });
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
      let node = document.getElementById(`node-${sX}-${sY}`)!;
      node.classList.remove("black-node-1");
      node = document.getElementById(`node-${tX}-${tY}`)!;
      node.classList.remove("black-node-1");
      mazeArrIndexRef.current = 0;
      mazeArr.current = vertices;
      animationFunRef.current = animateMazeNode;
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
      animationArrRef.current = animateVisitedNode;
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
