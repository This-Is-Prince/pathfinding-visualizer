import React, { useCallback, useContext, useEffect, useRef } from "react";
import bfs from "../algorithm/bfs";
import AppContext from "../app/AppContext";
import dfsAlgorithm from "../algorithm/dfs";
import dfs from "../mazes/dfs";
import mst from "../mazes/mst";
import dijkstra from "../algorithm/dijkstra";
import gbfs from "../algorithm/gbfs";
import aStar from "../algorithm/a_star";
import circle from "../mazes/circle";
import { VertexType } from "../types";

let findXY = (id: string) => {
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
  const startNodeRef = useRef<SpecialNodeType>({} as SpecialNodeType);
  const targetNodeRef = useRef<SpecialNodeType>({} as SpecialNodeType);
  const whichSpecialNode = useRef<"target" | "start">("target");
  const rowRef = useRef(0);
  const columnRef = useRef(0);
  let animateRef: any = useRef();
  let speed = useRef(0);

  // path arr
  let pathArr = useRef<VertexType[]>([]);
  let pathArrIndexRef = useRef(0);
  // visited arr
  let visitedArr = useRef<VertexType[]>([]);
  let visitedArrIndexRef = useRef(0);

  // maze arr
  let mazeArr = useRef<VertexType[]>([]);
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
      document.querySelectorAll(".node").forEach((node) => {
        node.addEventListener("drop", animateRef.current);
      });
      resetAnimation();
      addAllEventListeners();
    } else {
      let { x, y } = pathArr.current[pathArrIndexRef.current];
      let node = document.getElementById(`node-${x}-${y}`)!;
      node.classList.remove("visited-node");
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
    console.log("reset animation");
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
    console.log("instant animation");
    let obj = checkAlgorithm(
      rowRef.current,
      columnRef.current,
      AppState.algorithm,
      startNodeRef.current,
      targetNodeRef.current
    );
    resetPathVisitedNode();
    if (!AppState.isFindAnimationNodes) {
      dispatch({ type: "CHANGE_FIND_ANIMATION_NODES", payload: true });
    }
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
  const mainMouseOverEvent = useCallback((event: any) => {
    let classList = event.target.classList;
    let isNode =
      classList.contains("node") && !classList.contains("black-node");
    if (isNode) {
      classList.add("black-node");
    }
  }, []);

  /**
   * target node event
   */
  let targetDragStart = useCallback((event: any) => {
    whichSpecialNode.current = "target";
    event.dataTransfer!.setData("text", event.target.id);
  }, []);
  /**
   * start node event
   */
  let startDragStart = useCallback((event: any) => {
    whichSpecialNode.current = "start";
    event.dataTransfer!.setData("text", event.target.id);
  }, []);
  /**
   * Node Mouse Down event
   */

  const handleMouseDown = useCallback((event: any) => {
    let id = event.target.getAttribute("id");
    if (!id || id === "startNode" || id === "targetNode") {
      return;
    }
    mainRef.current.addEventListener("mouseover", mainMouseOverEvent);
    let isBlack =
      event.target.classList.contains("black-node") ||
      event.target.classList.contains("black-node-1");
    if (isBlack) {
      event.target.classList.remove("black-node-1");
      event.target.classList.remove("black-node");
    } else {
      event.target.classList.add("black-node");
    }
  }, []);

  /**
   * Node Drag Over event
   */
  let handleDragOver = useCallback((event: any) => {
    event.preventDefault();
    let elm = event.target,
      id = elm.getAttribute("id"),
      s = startNodeRef.current,
      t = targetNodeRef.current;
    let isBlack =
      elm.classList.contains("black-node") ||
      elm.classList.contains("black-node-1");
    if (isBlack) {
      elm.classList.remove("black-node");
      elm.classList.remove("black-node-1");
    }
    if (elm.innerHTML.length > 0) {
      elm.textContent = "";
      elm.removeAttribute("data-weight");
    }
    if (
      elm.classList.contains("node") &&
      id !== `node-${t.x}-${t.y}` &&
      id !== `node-${s.x}-${s.y}`
    ) {
      let { x, y } = findXY(id);
      if (whichSpecialNode.current === "target") {
        targetNodeRef.current = {
          ...targetNodeRef.current,
          x,
          y,
        };
      } else {
        startNodeRef.current = {
          ...startNodeRef.current,
          x,
          y,
        };
      }
    }
  }, []);
  /**
   * Node Drop event
   */
  let handleDrop = useCallback((event: any) => {
    event.preventDefault();
    let id = event.dataTransfer.getData("text");
    let elm = event.target;
    let parentID = elm.id;
    if (parentID !== "startNode" && parentID !== "targetNode") {
      let isBlack =
        elm.classList.contains("black-node") ||
        elm.classList.contains("black-node-1");
      if (isBlack) {
        elm.classList.remove("black-node");
        elm.classList.remove("black-node-1");
      }
      if (elm.innerHTML.length > 0) {
        elm.textContent = "";
        elm.removeAttribute("data-weight");
      }
      elm.appendChild(document.getElementById(id));
      let { x, y } = findXY(event.target.getAttribute("id"));
      if (id === "startNode") {
        startNodeRef.current = { ...startNodeRef.current, x, y };
      } else {
        targetNodeRef.current = { ...targetNodeRef.current, x, y };
      }
    }
  }, []);
  /**
   * Node Mouse Up event
   */

  let handleMouseUp = useCallback(() => {
    mainRef.current.removeEventListener("mouseover", mainMouseOverEvent);
  }, []);

  /**
   * Update Size
   */
  const updateSize = () => {
    console.log("update size");
    resetAnimation();
    if (AppState.maze) {
      dispatch({ type: "CHANGE_MAZE", payload: "" });
    }
    if (AppState.isPlay) {
      dispatch({ type: "CHANGE_PLAY", payload: false });
    }
    if (!AppState.isMazeAnimationComplete) {
      dispatch({ type: "MAZE_ANIMATION_COMPLETE", payload: true });
    }
    if (!AppState.isFindAnimationNodes) {
      dispatch({ type: "CHANGE_FIND_ANIMATION_NODES", payload: true });
    }
    if (!AppState.isAnimationComplete) {
      dispatch({ type: "ANIMATION_COMPLETE", payload: true });
    }

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
    let startNode = document.createElement("div");
    startNode.title = "Starting Node";
    startNode.id = "startNode";
    startNode.draggable = true;
    let targetNode = document.createElement("div");
    targetNode.title = "Target Node";
    targetNode.draggable = true;
    targetNode.id = "targetNode";
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
          node.appendChild(startNode);
          startNodeRef.current = { x: row, y: startCol, self: startNode };
        } else if (i === row && j === targetCol) {
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
    mazeArr.current = [];
    pathArrIndexRef.current = 0;
    mazeArrIndexRef.current = 0;
  };

  /**
   * add special node event
   */
  let addSpecialNodeEvents = () => {
    targetNodeRef.current.self.addEventListener("dragstart", targetDragStart);
    startNodeRef.current.self.addEventListener("dragstart", startDragStart);
  };
  /**
   * remove special node event
   */
  let removeSpecialNodeEvents = () => {
    targetNodeRef.current.self.removeEventListener(
      "dragstart",
      targetDragStart
    );
    startNodeRef.current.self.removeEventListener("dragstart", startDragStart);
  };
  /**
   * add all event
   */
  const addAllEventListeners = () => {
    console.log("add all listeners");
    document.querySelectorAll(".node").forEach(nodeEventAdd);
    addSpecialNodeEvents();
  };
  /**
   * remove all events
   */
  const removeAllEventListeners = () => {
    console.log("remove all listeners");
    document.querySelectorAll(".node").forEach(nodeEventRemove);
    removeSpecialNodeEvents();
  };
  /**
   * add node event
   */
  const nodeEventAdd = (node: Element) => {
    node.addEventListener("mousedown", handleMouseDown);
    node.addEventListener("mouseup", handleMouseUp);
    node.addEventListener("dragover", handleDragOver);
    node.addEventListener("drop", handleDrop);
  };
  /**
   * remove node event
   */
  const nodeEventRemove = (node: Element) => {
    node.removeEventListener("mousedown", handleMouseDown);
    node.removeEventListener("mouseup", handleMouseUp);
    node.removeEventListener("dragover", handleDragOver);
    node.removeEventListener("drop", handleDrop);
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
      resetAnimation();
      if (AppState.isPlay) {
        dispatch({ type: "CHANGE_PLAY", payload: false });
      }
      if (AppState.isMazeAnimationComplete) {
        dispatch({ type: "MAZE_ANIMATION_COMPLETE", payload: false });
      }
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
        if (node.innerHTML.length < 5) {
          node.textContent = "";
          node.removeAttribute("data-weight");
        }
        node.classList.remove("black-node-1");
        node.classList.remove("black-node");
        node.classList.remove("visited-node");
        node.classList.remove("visited-node-1");
        node.classList.remove("path-node");
        node.classList.remove("path-node-1");
        node.classList.add("black-node-1");
      });
      visitedArr.current = [];
      pathArr.current = [];
      mazeArrIndexRef.current = 0;
      let node = document.getElementById(`node-${sX}-${sY}`)!;
      node.classList.remove("black-node-1");
      node = document.getElementById(`node-${tX}-${tY}`)!;
      node.classList.remove("black-node-1");
      mazeArr.current = vertices;
      animationFunRef.current = animateMazeNode;
      animationRef.current = requestAnimationFrame(animationFunRef.current);
      dispatch({ type: "CHANGE_FIND_ANIMATION_NODES", payload: true });
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

  // finding animation nodes Arr
  const findAnimationNodes = (algo: string) => {
    console.log("algorithm", algo);
    console.log("find animation nodes");
    let obj = checkAlgorithm(
      rowRef.current,
      columnRef.current,
      algo,
      startNodeRef.current,
      targetNodeRef.current
    );
    visitedArr.current = obj.visitedArr;
    pathArr.current = obj.pathArr;
    animationArrRef.current = animateVisitedNode;
  };

  // useEffect for Play

  useEffect(() => {
    if (AppState.isPlay) {
      console.log("play");
      if (AppState.isAnimationComplete || AppState.isFindAnimationNodes) {
        console.log("animation complete in play");
        resetPathVisitedNode();
        removeAllEventListeners();
        dispatch({ type: "ANIMATION_COMPLETE", payload: false });
      }
      if (AppState.isFindAnimationNodes) {
        resetAnimation();
        findAnimationNodes(AppState.algorithm);
        dispatch({ type: "CHANGE_FIND_ANIMATION_NODES", payload: false });
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
