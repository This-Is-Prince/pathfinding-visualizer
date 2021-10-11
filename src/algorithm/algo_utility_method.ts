import { FindNeighbourType, NeighbourType } from "../types";
import { AStarNode } from "./a_star";
import { DijkstraNode } from "./dijkstra";
import { GBFSNode } from "./gbfs";

export const findNeighbour: FindNeighbourType = (
  x,
  y,
  row,
  column,
  which,
  vertices,
  visited,
  targetVertex
) => {
  if (x >= 0 && x < row && y >= 0 && y < column) {
    let isBlack: boolean, elm: HTMLElement;
    elm = document.getElementById(`node-${x}-${y}`)!;
    isBlack =
      elm.classList.contains("black-node-1") ||
      elm.classList.contains("black-node");
    if (which === "bfs" || which === "dfs") {
      if (!isBlack && !visited[`node-${x}-${y}`]) {
        vertices.push({ x, y });
      }
    } else {
      if (!isBlack) {
        if (visited[`node-${x}-${y}`]) {
          vertices.push(visited[`node-${x}-${y}`]);
        } else {
          let dataWeight = elm.getAttribute("data-weight");
          let weight = 1;
          if (dataWeight) {
            weight = parseInt(dataWeight);
          }
          if (targetVertex) {
            if (which === "gbfs") {
              vertices.push(
                new GBFSNode(
                  { x, y },
                  null,
                  Math.abs(x - targetVertex.x) +
                    Math.abs(y - targetVertex.y) +
                    weight
                )
              );
            } else {
              vertices.push(
                new AStarNode(
                  { x, y },
                  null,
                  weight,
                  Math.abs(x - targetVertex.x) + Math.abs(y - targetVertex.y)
                )
              );
            }
          } else {
            vertices.push(
              new DijkstraNode({ x, y }, Number.MAX_VALUE, null, weight)
            );
          }
        }
      }
    }
  }
};
export const neighbour: NeighbourType = (
  vertex,
  row,
  column,
  which,
  vertices,
  visited,
  targetVertex
) => {
  let x = vertex.x - 1,
    y = vertex.y;
  findNeighbour(x, y, row, column, which, vertices, visited, targetVertex);
  x = vertex.x;
  y = vertex.y + 1;
  findNeighbour(x, y, row, column, which, vertices, visited, targetVertex);

  y = vertex.y - 1;
  findNeighbour(x, y, row, column, which, vertices, visited, targetVertex);

  x = vertex.x + 1;
  y = vertex.y;
  findNeighbour(x, y, row, column, which, vertices, visited, targetVertex);
  return vertices;
};
