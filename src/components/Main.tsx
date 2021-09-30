import React, { useContext, useEffect, useRef } from "react";
import * as d3 from "d3";
import AppContext from "../app/AppContext";
import { Node } from "../app/state";
const Main = () => {
  const { AppState, dispatch } = useContext(AppContext);
  const mainRef = useRef<HTMLElement>({} as HTMLElement);
  const updateSize = () => {
    // height width of main element
    let width = mainRef.current.getBoundingClientRect().width;
    let height = mainRef.current.getBoundingClientRect().height;

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
      if (width / noOfNodesInColumn >= 20) {
        noOfNodesInColumn++;
      } else {
        row = true;
      }
      if (height / noOfNodesInRow >= 20) {
        noOfNodesInRow++;
      } else {
        column = true;
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
      startColumn = Math.floor(noOfNodesInColumn / 3),
      endX = 0,
      endY = 0,
      endRow = startRow,
      endColumn = Math.floor(noOfNodesInColumn / 3) * 2;
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
          .attr("fill", node.getColor());
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
      );

    // adding target node
    d3.select("#nodes-container")
      .append("svg")
      .attr("id", "end")
      .attr("stroke", "currentColor")
      .attr("fill", "currentColor")
      .attr("stroke-width", 0)
      .attr("viewBox", "0 0 24 24")
      .attr("width", nodeWidth)
      .attr("height", nodeHeight)
      .attr("x", endX)
      .attr("y", endY)
      .attr("xmlns", "http://www.w3.org/2000/svg");
    d3.select("#end")
      .append("path")
      .attr(
        "d",
        "M13,4.069V2h-2v2.069C7.389,4.522,4.522,7.389,4.069,11H2v2h2.069c0.453,3.611,3.319,6.478,6.931,6.931V22h2v-2.069 c3.611-0.453,6.478-3.319,6.931-6.931H22v-2h-2.069C19.478,7.389,16.611,4.522,13,4.069z M12,18c-3.309,0-6-2.691-6-6s2.691-6,6-6 s6,2.691,6,6S15.309,18,12,18z"
      );
    d3.select("#end")
      .append("circle")
      .attr("cx", 12)
      .attr("cy", 12)
      .attr("r", 3);
  };
  useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);
  return <main ref={mainRef} className="main"></main>;
};

export default Main;
