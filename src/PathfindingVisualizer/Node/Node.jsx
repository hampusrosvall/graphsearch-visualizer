import React from "react";
import "./Node.css";

const STANDARD_COLOR = "whitesmoke";
const SOURCE_COLOR = "blue";
const TARGET_COLOR = "red";
export default class Node extends React.Component {
  render() {
    const { row, col, sourceNode, targetNode } = this.props;
    const color = sourceNode
      ? SOURCE_COLOR
      : targetNode
      ? TARGET_COLOR
      : STANDARD_COLOR;

    return (
      <div
        className="node"
        id={`${row}-${col}`}
        style={{ backgroundColor: color }}
      ></div>
    );
  }
}
