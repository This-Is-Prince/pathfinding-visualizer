import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
const Main = () => {
  const mainRef = useRef<HTMLElement>({} as HTMLElement);
  const updateSize = () => {
    console.log("updated");
    let width = mainRef.current.getBoundingClientRect().width;
    let height = mainRef.current.getBoundingClientRect().height;
    d3.select("#nodes-container").remove();
    d3.select(".main")
      .append("svg")
      .attr("id", "nodes-container")
      .attr("width", width)
      .attr("height", height);
    d3.selectAll(".node").remove();
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
    let nodeWidth = width / noOfNodesInColumn;
    let nodeHeight = height / noOfNodesInRow;
    console.log(nodeWidth);
    console.log(nodeHeight);

    for (let i = 0; i < noOfNodesInRow; i++) {
      for (let j = 0; j < noOfNodesInColumn; j++) {
        console.log("hi");

        d3.select("#nodes-container")
          .append("rect")
          .attr("class", "node")
          .attr("width", nodeWidth)
          .attr("height", nodeHeight)
          .attr("x", nodeWidth * j)
          .attr("y", nodeHeight * i);
      }
    }
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
