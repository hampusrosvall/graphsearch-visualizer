import React from "react";
import "./PathfindingVisualizer.css";
import Node from "./Node/Node.jsx";
import { BreadthFirstSearch } from "./algorithms/BreadthFirstSearch.js";
import { DepthFirstSearch } from "./algorithms/DepthFirstSearch";

const ROWS = 20;
const COLS = 40;
const SOURCE_ROW = 5;
const SOURCE_COL = 5;
const TARGET_ROW = 10;
const TARGET_COL = 38;

const STANDARD_COLOR = "whitesmoke";
const SOURCE_COLOR = "lightgreen";
const TARGET_COLOR = "lightcoral";

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

  reset() {
    const grid = this.state.grid;
    for (const row of grid) {
      for (const node of row) {
        node.sourceNode
          ? markNode(node, SOURCE_COLOR)
          : node.targetNode
          ? markNode(node, TARGET_COLOR)
          : markNode(node, STANDARD_COLOR);
      }
    }
  }

  async BFS() {
    const sourceNode = this.state.grid[SOURCE_ROW][SOURCE_COL];
    const [parents, visitedNodes] = BreadthFirstSearch(
      sourceNode,
      this.state.grid
    );

    for (let node of visitedNodes) {
      await markNode(node, "thistle");
    }

    let inOrderNodes = [];
    let currentNode = this.state.grid[TARGET_ROW][TARGET_COL];
    while (currentNode !== -1) {
      inOrderNodes.push(currentNode);
      currentNode = parents.get(currentNode);
    }
    inOrderNodes.reverse();
    for (let node of inOrderNodes) {
      await markNode(node, "slategray");
    }
  }

  async DFS() {
    const sourceNode = this.state.grid[SOURCE_ROW][SOURCE_COL];
    const [parents, visitedNodes] = DepthFirstSearch(
      sourceNode,
      this.state.grid
    );

    for (let node of visitedNodes) {
      await markNode(node, "thistle");
    }

    let inOrderNodes = [];
    let currentNode = this.state.grid[TARGET_ROW][TARGET_COL];
    while (currentNode !== -1) {
      inOrderNodes.push(currentNode);
      currentNode = parents.get(currentNode);
    }
    inOrderNodes.reverse();
    for (let node of inOrderNodes) {
      await markNode(node, "slategray");
    }
  }

  render() {
    const grid = this.state.grid;
    return (
      <>
        <div className="top-container">
          {" "}
          <button className="button-BFS" onClick={() => this.BFS()}>
            Breadth first search
          </button>
          <button className="button-DFS" onClick={() => this.DFS()}>
            Depth first search
          </button>
          <button className="button-reset" onClick={() => this.reset()}>
            Reset grid
          </button>
        </div>
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
  await sleep(1);
  const row = node.row;
  const col = node.col;
  const visitedNodeStyle = document.getElementById(`${row}-${col}`).style;
  visitedNodeStyle.backgroundColor = color;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
