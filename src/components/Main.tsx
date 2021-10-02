import React, { useContext, useEffect, useRef } from "react";
import * as d3 from "d3";
import AppContext from "../app/AppContext";
import { Node } from "../app/state";
import { VertexType } from "../mazes/dfs";

const changeNode = (
  e: any,
  stroke: string,
  fill: string,
  isSpecial: boolean
) => {
  if (isSpecial) {
    d3.select(`#${e.target.getAttribute("id")}`)
      .attr("stroke-width", 0.2)
      .attr("stroke", stroke)
      .attr("fill", fill);
  } else {
    d3.select(`#${e.target.getAttribute("id")}`)
      .transition()
      .duration(200)
      .attr("rx", 10)
      .attr("stroke-width", 0.2)
      .attr("stroke", stroke)
      .attr("fill", fill);
  }
};
const changeNodeToSquare = (e: any, stroke: string, fill: string) => {
  d3.select(`#${e.target.getAttribute("id")}`)
    .transition()
    .duration(200)
    .delay(500)
    .attr("rx", 0)
    .attr("stroke-width", 0.2)
    .attr("stroke", stroke)
    .attr("fill", fill);
};

const eventListener = (
  id: string,
  dispatch: any,
  nodes: {
    startNode: { x: number; y: number };
    targetNode: { x: number; y: number };
  }
) => {
  d3.selectAll(".node").on("mouseenter", (e) => {
    changeNode(e, "#0066ff", "#fff", true);
    const posX = e.target.getAttribute("x");
    const posY = e.target.getAttribute("y");
    d3.select(`#${id}`).attr("x", posX).attr("y", posY);
    let nodeID = e.target.getAttribute("id").substring(5);
    let ch = nodeID.search("-");
    let x = parseInt(nodeID.substr(0, ch));
    let y = parseInt(nodeID.substring(ch + 1));
    if (id === "end") {
      dispatch({ type: "ADD_SPECIAL_END_NODE", payload: { x, y } });
    } else {
      dispatch({ type: "ADD_SPECIAL_START_NODE", payload: { x, y } });
    }
  });
};
type PrevNodeType = {
  e: any;
  stroke: string;
  fill: string;
};
const Main = () => {
  const { AppState, dispatch } = useContext(AppContext);
  // main reference
  const prevNodeRef = useRef<PrevNodeType | null>(null);
  let startNodeRef = useRef<HTMLElement | SVGElement>({} as SVGElement);
  let endNodeRef = useRef<HTMLElement | SVGElement>({} as SVGElement);
  const mainRef = useRef<HTMLElement>({} as HTMLElement);
  const updateSize = () => {
    prevNodeRef.current = null;
    // height width of main element
    let width = mainRef.current.getBoundingClientRect().width - 20;
    let height = mainRef.current.getBoundingClientRect().height - 20;

    // removing svg nodes-container
    d3.select("#nodes-container").remove();

    //adding svg nodes-container
    let self = d3
      .select(".main")
      .append("svg")
      .attr("id", "nodes-container")
      .attr("width", width)
      .attr("height", height);

    //tell react that svg (nodes-container) is added
    dispatch({ type: "CHANGE_SVG", payload: { self, height, width } });

    //removing all node from nodes-container
    d3.selectAll(".node").remove();

    //finding row,column,nodeWidth,nodeHeight
    let noOfNodesInRow = 1,
      noOfNodesInColumn = 1,
      row = false,
      column = false;
    while (true) {
      if (width / noOfNodesInColumn >= AppState.nodeMaxWidth) {
        noOfNodesInColumn++;
      } else {
        column = true;
      }
      if (height / noOfNodesInRow >= AppState.nodeMaxWidth) {
        noOfNodesInRow++;
      } else {
        row = true;
      }
      if (row && column) {
        break;
      }
    }
    noOfNodesInColumn--;
    noOfNodesInRow--;
    let nodeWidth = width / noOfNodesInColumn,
      nodeHeight = height / noOfNodesInRow,
      nodes: Node[] = [],
      startX = 0,
      startY = 0,
      startRow = Math.floor(noOfNodesInRow / 2),
      startColumn = Math.floor(noOfNodesInColumn / 6),
      endX = 0,
      endY = 0,
      endRow = startRow,
      endColumn = Math.floor(noOfNodesInColumn / 6) * 5;

    for (let i = 0; i < noOfNodesInRow; i++) {
      for (let j = 0; j < noOfNodesInColumn; j++) {
        let node = new Node(
          `node-${i}-${j}`,
          nodeWidth * j,
          nodeHeight * i,
          "#fff"
        );
        // finding x and y for start node
        if (startRow === i && startColumn === j) {
          startX = node.getX();
          startY = node.getY();
        }
        // finding x and y for target node
        if (endRow === i && endColumn === j) {
          endX = node.getX();
          endY = node.getY();
        }
        // append rect to nodes-container means adding new node
        d3.select("#nodes-container")
          .append("rect")
          .attr("class", "node")
          .attr("width", nodeWidth)
          .attr("height", nodeHeight)
          .attr("id", node.getID())
          .attr("x", node.getX())
          .attr("y", node.getY())
          .attr("fill", node.getColor())
          .attr("stroke-width", 0.2)
          .attr("stroke", "#0066ff")
          .on("touchend", () => {
            d3.selectAll(".node").on("touchstart", null);
          })
          .on("mousedown", (e) => {
            const clickNodeX = e.target.getAttribute("x");
            const clickNodeY = e.target.getAttribute("y");
            const startNode = startNodeRef.current;
            const endNode = endNodeRef.current;
            const allNodes = d3.selectAll(".node");

            if (
              !(
                (clickNodeX === endNode.getAttribute("x") &&
                  clickNodeY === endNode.getAttribute("y")) ||
                (clickNodeX === startNode.getAttribute("x") &&
                  clickNodeY === startNode.getAttribute("y"))
              )
            ) {
              allNodes.on("mouseenter", (e) => {
                const x = e.target.getAttribute("x");
                const y = e.target.getAttribute("y");
                if (
                  (x === endNode.getAttribute("x") &&
                    y === endNode.getAttribute("y")) ||
                  (x === startNode.getAttribute("x") &&
                    y === startNode.getAttribute("y"))
                ) {
                  if (prevNodeRef.current !== null) {
                    const { e, fill, stroke } = prevNodeRef.current;
                    changeNodeToSquare(e, stroke, fill);
                  }
                  prevNodeRef.current = { e, stroke: "#0066ff", fill: "#fff" };
                  changeNode(e, "#0066ff", "#fff", false);
                } else {
                  if (prevNodeRef.current !== null) {
                    const { e, fill, stroke } = prevNodeRef.current;
                    changeNodeToSquare(e, stroke, fill);
                  }
                  prevNodeRef.current = {
                    e,
                    stroke: "#fff",
                    fill: "#002233",
                  };
                  changeNode(e, "#fff", "#002233", false);
                }
              });
              if (prevNodeRef.current !== null) {
                const { e, fill, stroke } = prevNodeRef.current;
                changeNodeToSquare(e, stroke, fill);
              }
              let fill = e.target.getAttribute("fill");
              if (fill === "rgb(0, 34, 51)" || fill === "#002233") {
                prevNodeRef.current = {
                  e,
                  stroke: "#0066ff",
                  fill: "#fff",
                };
                changeNode(e, "#0066ff", "#fff", false);
              } else {
                prevNodeRef.current = {
                  e,
                  stroke: "#fff",
                  fill: "#002233",
                };
                changeNode(e, "#fff", "#002233", false);
              }
            }
          })
          .on("mouseup", () => {
            if (prevNodeRef.current !== null) {
              const { e, fill, stroke } = prevNodeRef.current;
              changeNodeToSquare(e, stroke, fill);
            }
            d3.selectAll(".node").on("mouseenter", null);
          });
        nodes.push(node);
      }
    }
    // telling react that nodes is added
    dispatch({
      type: "ADD_NODES",
      payload: {
        nodes,
        width: nodeWidth,
        height: nodeHeight,
        column: noOfNodesInColumn,
        row: noOfNodesInRow,
      },
    });
    // adding start node
    d3.select("#nodes-container")
      .append("svg")
      .attr("id", "start")
      .attr("stroke", "currentColor")
      .attr("fill", "currentColor")
      .attr("stroke-width", 0)
      .attr("viewBox", "0 0 512 512")
      .attr("width", nodeWidth)
      .attr("height", nodeHeight)
      .attr("x", startX)
      .attr("y", startY)
      .attr("xmlns", "http://www.w3.org/2000/svg");
    d3.select("#start")
      .append("path")
      .attr(
        "d",
        "M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zM140 300h116v70.9c0 10.7 13 16.1 20.5 8.5l114.3-114.9c4.7-4.7 4.7-12.2 0-16.9l-114.3-115c-7.6-7.6-20.5-2.2-20.5 8.5V212H140c-6.6 0-12 5.4-12 12v64c0 6.6 5.4 12 12 12z"
      )
      .on("mousedown", () => {
        eventListener("start", dispatch, {
          startNode: AppState.specialNodes.startNode,
          targetNode: AppState.specialNodes.targetNode,
        });
      })
      .on("mouseup", () => {
        d3.selectAll(".node").on("mouseenter", null);
      })
      .on("dblclick", (e) => {
        d3.selectAll(".node").on("touchstart", (e) => {
          changeNode(e, "#0066ff", "#fff", true);
          const posX = e.target.getAttribute("x");
          const posY = e.target.getAttribute("y");
          d3.select(`#start`).attr("x", posX).attr("y", posY);
          let nodeID = e.target.getAttribute("id").substring(5);
          let ch = nodeID.search("-");
          let x = parseInt(nodeID.substr(0, ch));
          let y = parseInt(nodeID.substring(ch + 1));
          dispatch({ type: "ADD_SPECIAL_START_NODE", payload: { x, y } });
        });
      });

    // adding target node
    d3.select("#nodes-container")
      .append("svg")
      .attr("id", "end")
      .attr("stroke", "currentColor")
      .attr("fill", "currentColor")
      .attr("stroke-width", 0)
      .attr("viewBox", "0 0 16 16")
      .attr("width", nodeWidth)
      .attr("height", nodeHeight)
      .attr("x", endX)
      .attr("y", endY)
      .attr("xmlns", "http://www.w3.org/2000/svg");
    d3.select("#end")
      .append("path")
      .attr(
        "d",
        "M16 7h-1.577c-0.432-2.785-2.638-4.991-5.423-5.423v-1.577h-2v1.577c-2.785 0.432-4.991 2.638-5.423 5.423h-1.577v2h1.577c0.432 2.785 2.638 4.991 5.423 5.423v1.577h2v-1.577c2.785-0.432 4.991-2.638 5.423-5.423h1.577v-2zM12.388 7h-1.559c-0.301-0.852-0.977-1.528-1.829-1.829v-1.559c1.68 0.383 3.005 1.708 3.388 3.388zM8 9c-0.552 0-1-0.448-1-1s0.448-1 1-1c0.552 0 1 0.448 1 1s-0.448 1-1 1zM7 3.612v1.559c-0.852 0.301-1.528 0.977-1.829 1.829h-1.559c0.383-1.68 1.708-3.005 3.388-3.388zM3.612 9h1.559c0.301 0.852 0.977 1.528 1.829 1.829v1.559c-1.68-0.383-3.005-1.708-3.388-3.388zM9 12.388v-1.559c0.852-0.301 1.528-0.977 1.829-1.829h1.559c-0.383 1.68-1.708 3.005-3.388 3.388z"
      )
      .on("mousedown", () => {
        eventListener("end", dispatch, {
          startNode: AppState.specialNodes.startNode,
          targetNode: AppState.specialNodes.targetNode,
        });
      })
      .on("mouseup", () => {
        d3.selectAll(".node").on("mouseenter", null);
      })
      .on("dblclick", (e) => {
        d3.selectAll(".node").on("touchstart", (e) => {
          changeNode(e, "#0066ff", "#fff", true);
          const posX = e.target.getAttribute("x");
          const posY = e.target.getAttribute("y");
          d3.select(`#end`).attr("x", posX).attr("y", posY);
          let nodeID = e.target.getAttribute("id").substring(5);
          let ch = nodeID.search("-");
          let x = parseInt(nodeID.substr(0, ch));
          let y = parseInt(nodeID.substring(ch + 1));
          dispatch({ type: "ADD_SPECIAL_END_NODE", payload: { x, y } });
        });
      });

    dispatch({
      type: "ADD_SPECIAL_END_NODE",
      payload: { x: endRow, y: endColumn },
    });
    dispatch({
      type: "ADD_SPECIAL_START_NODE",
      payload: { x: startRow, y: startColumn },
    });
    startNodeRef.current = document.getElementById("start")!;
    endNodeRef.current = document.getElementById("end")!;
  };
  const removeListeners = () => {
    d3.selectAll(".node").on("mouseenter", null);
    d3.selectAll(".node").on("mousedown", null);
    d3.selectAll(".node").on("mouseup", null);
    d3.selectAll(".node").on("touchstart", null);
    d3.select("#start").on("dblclick", null);
    d3.select("#end").on("dblclick", null);
  };
  useEffect(() => {
    removeListeners();
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);
  useEffect(() => {
    removeListeners();
    updateSize();
  }, [AppState.isBoardClear, AppState.nodeMaxWidth]);
  // animation ref
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
      let { x, y } = pathArr[pathArrIndexRef.current - 1];
      d3.select(`#node-${x}-${y}`)
        .transition()
        .duration(250)
        .delay(0)
        .attr("fill", "#FFE900");
      dispatch({ type: "CHANGE_PLAY", payload: !AppState.isPlay });
      dispatch({ type: "ANIMATION_COMPLETE", payload: true });
      animationFunRef.current = () => {};
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
      visitedArrIndexRef.current = 0;
      animateArrRef.current = animateVisitedArr(AppState.visitedArr);
    } else {
      let { x, y } = pathArr[pathArrIndexRef.current];
      if (pathArrIndexRef.current > 0) {
        let { x, y } = pathArr[pathArrIndexRef.current - 1];
        d3.select(`#node-${x}-${y}`)
          .transition()
          .duration(250)
          .delay(0)
          .attr("fill", "#FFE900");
      }
      d3.select(`#node-${x}-${y}`)
        .transition()
        .duration(250)
        .attr("fill", "#F24236")
        .on("end", () => {
          animationRef.current = requestAnimationFrame(animationFunRef.current);
        });
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
      if (visitedArrIndexRef.current > 0) {
        let prevID = visitedArr[visitedArrIndexRef.current - 1];
        if (
          !(
            (prevID.x === sX && prevID.y === sY) ||
            (prevID.x === tX && prevID.y === tY)
          )
        ) {
          d3.select(`#node-${prevID.x}-${prevID.y}`)
            .transition()
            .delay(500)
            .duration(250)
            .attr("fill", "#0066ff")
            .attr("stroke", "#fff");
        }
      }
      if (visitedArrIndexRef.current > 1) {
        let prevID = visitedArr[visitedArrIndexRef.current - 2];
        if (
          !(
            (prevID.x === sX && prevID.y === sY) ||
            (prevID.x === tX && prevID.y === tY)
          )
        ) {
          d3.select(`#node-${prevID.x}-${prevID.y}`)
            .transition()
            .duration(250)
            .delay(1000)
            .attr("fill", "#0066ff")
            .attr("stroke", "#fff");
        }
      }
      visitedArrIndexRef.current = 0;
      pathArrIndexRef.current = 0;
      animateArrRef.current = animatePathArr(AppState.pathArr);
      animationFunRef.current = animateArrRef.current;
      animationRef.current = requestAnimationFrame(animationFunRef.current);
    }
    let id = visitedArr[visitedArrIndexRef.current];
    if (visitedArrIndexRef.current > 0) {
      let prevID = visitedArr[visitedArrIndexRef.current - 1];
      if (
        !(
          (prevID.x === sX && prevID.y === sY) ||
          (prevID.x === tX && prevID.y === tY)
        )
      ) {
        d3.select(`#node-${prevID.x}-${prevID.y}`)
          .transition()
          .delay(500)
          .duration(250)
          .attr("fill", "#00ffff")
          .attr("stroke", "#0066ff");
      }
    }
    if (visitedArrIndexRef.current > 1) {
      let prevID = visitedArr[visitedArrIndexRef.current - 2];
      if (
        !(
          (prevID.x === sX && prevID.y === sY) ||
          (prevID.x === tX && prevID.y === tY)
        )
      ) {
        d3.select(`#node-${prevID.x}-${prevID.y}`)
          .transition()
          .delay(1000)
          .duration(250)
          .attr("fill", "#0066ff")
          .attr("stroke", "#fff");
      }
    }
    if (!((id.x === sX && id.y === sY) || (id.x === tX && id.y === tY))) {
      d3.select(`#node-${id.x}-${id.y}`)
        .transition()
        .duration(0)
        .attr("fill", "#ffd803")
        .attr("stroke", "#0066ff")
        .on("end", () => {
          animationRef.current = requestAnimationFrame(animationFunRef.current);
        });
    } else {
      animationRef.current = requestAnimationFrame(animationFunRef.current);
    }
    visitedArrIndexRef.current++;
  };

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
            let fill = document
              .getElementById(`node-${i}-${j}`)
              ?.getAttribute("fill");
            if (fill !== "rgb(0, 34, 51)" && fill !== "#002233") {
              d3.select(`#node-${i}-${j}`)
                .attr("fill", "#fff")
                .attr("stroke", "#0066ff");
            }
          }
        }
        dispatch({ type: "ANIMATION_COMPLETE", payload: false });
      }
      animationFunRef.current = animateArrRef.current;
      animationRef.current = requestAnimationFrame(animationFunRef.current);
    } else {
      animationFunRef.current = () => {};
      cancelAnimationFrame(animationRef.current);
    }
  }, [AppState.isPlay]);
  return <main ref={mainRef} className="main flex-center"></main>;
};

export default Main;
