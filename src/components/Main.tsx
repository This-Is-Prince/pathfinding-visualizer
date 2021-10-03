import React, { useContext, useEffect, useRef } from "react";
import AppContext from "../app/AppContext";
import { SpecialNodeType } from "../app/state";
import { VertexType } from "../mazes/dfs";
export let findXY = (id: string) => {
  id = id.substring(5);
  let index = id.search("-");
  let x = id.substring(0, index),
    y = id.substring(index + 1);
  return { x, y };
};

const Main = () => {
  const { AppState, dispatch } = useContext(AppContext);
  const mainRef = useRef<HTMLElement>({} as HTMLElement);
  const startNodeRef = useRef({} as SpecialNodeType);
  const targetNodeRef = useRef({} as SpecialNodeType);

  /**
   *
   * UPDATE SIZE END
   *
   */
  const updateSize = () => {
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
    dispatch({
      type: "CHANGE_SVG",
      payload: { self: nodesContainer, height, width },
    });

    // calculating row and column

    let noOfNodesInRow = Math.floor(height / AppState.nodeMaxWidth),
      noOfNodesInColumn = Math.floor(width / AppState.nodeMaxWidth);

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
        let bg = event.target.style.backgroundColor;
        if (bg === "rgb(0, 34, 51)" || bg === "#002233") {
          event.target.classList.remove("black-node");
        } else {
          event.target.classList.add("black-node");
        }
      }
    };
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

    let row = Math.floor(noOfNodesInRow / 2);
    let startCol = Math.floor(noOfNodesInColumn / 4);
    let targetCol = Math.floor(noOfNodesInColumn / 4) * 3;
    let startNode = document.createElement("img");
    startNode.src = "http://localhost:3000/src/assets/png/start.png";
    let targetNode = document.createElement("img");
    targetNode.src = "http://localhost:3000/src/assets/png/target.png";
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
      type: "ADD_NODES",
      payload: {
        nodes: [],
        width: 0,
        height: 0,
        column: noOfNodesInColumn,
        row: noOfNodesInRow,
      },
    });
    dispatch({
      type: "ADD_SPECIAL_START_NODE",
      payload: { x: row, y: startCol },
    });
    dispatch({
      type: "ADD_SPECIAL_TARGET_NODE",
      payload: { x: row, y: targetCol },
    });

    const startNodeOnMouseEnter = (event: any) => {
      if (!event.target.getAttribute("id")) {
        return;
      }
      event.target.classList.remove("black-node");
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

    startNode.addEventListener("mousedown", startNodeOnMouseDown);
    startNode.addEventListener("mouseup", startNodeOnMouseUp);
    startNode.addEventListener("dblclick", startNodeOnDBLClick);

    const targetNodeOnMouseEnter = (event: any) => {
      if (!event.target.getAttribute("id")) {
        return;
      }
      event.target.classList.remove("black-node");
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
    targetNode.addEventListener("mousedown", targetNodeOnMouseDown);
    targetNode.addEventListener("mouseup", targetNodeOnMouseUp);
    targetNode.addEventListener("dblclick", targetNodeOnDBLClick);
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
  let visitedArrIndexRef = useRef(0);
  let pathArrIndexRef = useRef(0);
  let animationFunRef: any = useRef();
  let animationRef: any = useRef();
  let animateArrRef: any = useRef();
  let animatePathArr = (pathArr: VertexType[]) => {
    return () => {
      animatePath(pathArr);
    };
  };
  let animatePath = (pathArr: VertexType[]) => {
    if (pathArrIndexRef.current >= pathArr.length) {
      dispatch({ type: "CHANGE_PLAY", payload: !AppState.isPlay });
      dispatch({ type: "ANIMATION_COMPLETE", payload: true });
      animationFunRef.current = () => {};
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
      visitedArrIndexRef.current = 0;
      animateArrRef.current = animateVisitedArr(AppState.visitedArr);
    } else {
      let { x, y } = pathArr[pathArrIndexRef.current];
      let node = document.getElementById(`node-${x}-${y}`)!;
      node.classList.remove("visited-node");
      node.classList.add("path-node");
      setTimeout(() => {
        animationRef.current = requestAnimationFrame(animationFunRef.current);
      }, 0);
      pathArrIndexRef.current++;
    }
  };

  let animateVisitedArr = (visitedArr: VertexType[]) => {
    return () => {
      animateVisited(visitedArr);
    };
  };
  let animateVisited = (visitedArr: VertexType[]) => {
    let {
      startNode: { x: sX, y: sY },
      targetNode: { x: tX, y: tY },
    } = AppState.specialNodes;
    if (visitedArrIndexRef.current >= visitedArr.length) {
      visitedArrIndexRef.current = 0;
      pathArrIndexRef.current = 0;
      animateArrRef.current = animatePathArr(AppState.pathArr);
      animationFunRef.current = animateArrRef.current;
      animationRef.current = requestAnimationFrame(animationFunRef.current);
    } else {
      let id = visitedArr[visitedArrIndexRef.current];
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
  // animation complete
  useEffect(() => {
    visitedArrIndexRef.current = 0;
    animateArrRef.current = animateVisitedArr(AppState.visitedArr);
  }, [AppState.algorithm]);
  useEffect(() => {
    if (AppState.isPlay) {
      if (AppState.isAnimationComplete) {
        let row = AppState.nodeInfo.row,
          column = AppState.nodeInfo.column;
        for (let i = 0; i < row; i++) {
          for (let j = 0; j < column; j++) {
            let isVisited = document
              .getElementById(`node-${i}-${j}`)!
              .classList.contains("visited-node");
            if (isVisited) {
              document
                .getElementById(`node-${i}-${j}`)!
                .classList.remove("visited-node");
            }
          }
        }
        dispatch({ type: "ANIMATION_COMPLETE", payload: false });
      }
      console.log("play");

      animationFunRef.current = animateArrRef.current;
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
