import React from "react";
import "./PathfindingVisualizer.css";
import Node from "./Node/Node.jsx";
import { BreadthFirstSearch } from "./algorithms/BreadthFirstSearch.js";

const ROWS = 20;
const COLS = 40;
const SOURCE_ROW = 0;
const SOURCE_COL = 0;
const TARGET_ROW = 19;
const TARGET_COL = 39;

export default class PathFindingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
    };
  }

  componentDidMount() {
    const grid = [];
    for (let row = 0; row < ROWS; row++) {
      let currentRow = [];
      for (let col = 0; col < COLS; col++) {
        const currentNode = {
          row: row,
          col: col,
          sourceNode: row === SOURCE_ROW && col === SOURCE_COL,
          targetNode: row === TARGET_ROW && col === TARGET_COL,
        };
        currentRow.push(currentNode);
      }
      grid.push(currentRow);
    }
    this.setState({ grid: grid });
  }

  async BFS() {
    const sourceNode = this.state.grid[SOURCE_ROW][SOURCE_COL];
    const [parents, visitedNodes] = BreadthFirstSearch(
      sourceNode,
      this.state.grid
    );

    for (let node of visitedNodes) {
      await markNode(node, "turquoise");
    }

    let inOrderNodes = [];
    let currentNode = this.state.grid[TARGET_ROW][TARGET_COL];
    while (currentNode !== -1) {
      inOrderNodes.push(currentNode);
      currentNode = parents.get(currentNode);
    }
    inOrderNodes.reverse();
    for (let node of inOrderNodes) {
      await markNode(node, "yellow");
    }
  }

  render() {
    const grid = this.state.grid;
    return (
      <>
        <button onClick={() => this.BFS()}>BFS</button>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { sourceNode, targetNode } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      row={rowIdx}
                      col={nodeIdx}
                      sourceNode={sourceNode}
                      targetNode={targetNode}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

async function markNode(node, color) {
  await sleep(10);
  const row = node.row;
  const col = node.col;
  const visitedNodeStyle = document.getElementById(`${row}-${col}`).style;
  visitedNodeStyle.backgroundColor = color;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}