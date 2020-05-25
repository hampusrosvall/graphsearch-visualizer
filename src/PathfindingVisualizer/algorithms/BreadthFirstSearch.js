export const BreadthFirstSearch = (sourceNode, grid) => {
  let visitedNodesInOrder = [];
  let queue = [];
  let parents = new Map();
  parents.set(sourceNode, -1);
  queue.push(sourceNode);

  while (queue.length > 0) {
    const currentNode = queue.shift();
    visitedNodesInOrder.push(currentNode);
    if (currentNode.targetNode) break;
    for (const adjacentNode of getAdjacentNodes(currentNode, grid)) {
      if (!parents.has(adjacentNode)) {
        parents.set(adjacentNode, currentNode);
        queue.push(adjacentNode);
      }
    }
  }
  return [parents, visitedNodesInOrder];
};

function getAdjacentNodes(node, grid) {
  const deltas = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [-1, 0],
  ];
  let adjacentNodes = [];
  for (const delta of deltas) {
    const [drow, dcol] = delta;
    const row = node.row + drow;
    const col = node.col + dcol;
    if (isValid(row, col, grid)) adjacentNodes.push(grid[row][col]);
  }
  return adjacentNodes;
}

function isValid(row, col, grid) {
  const maxRow = grid.length - 1;
  const maxCol = grid[0].length - 1;
  return row >= 0 && row <= maxRow && col >= 0 && col <= maxCol;
}

export default BreadthFirstSearch;
