let cols, rows;
const cellSize = 40;
let grid = [];
let stack = [];
let current;
let mazeLoop;
let pathLoop;
let end;

// Setup function initializes the canvas and creates the grid of cells.
function setup() {
    createCanvas(800, 800);
    cols = floor(width / cellSize);
    rows = floor(height / cellSize);

    // Create the grid of cells
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            grid.push(new Cell(i, j));
        }
    }

    current = grid[0];
    mazeLoop = setInterval(createMaze, 0);
}

// Returns the index of the cell at position (i, j) in the grid array.
function index(i, j) {
    return (i < 0 || j < 0 || i >= cols || j >= rows) ? -1 : i + j * cols;
}

// Draw function is called in each frame to display the grid and highlight the path.
function draw() {
    background(51);
    grid.forEach(cell => cell.show());
}

// createMaze function generates the maze using Depth-First Search (DFS) algorithm.
function createMaze() {
    current.visited = true;
    let next = current.checkNeighbors();
    if (next) {
        stack.push(current);
        current.removeWallsBetween(next.cell, next.from, next.to);
        current = next.cell;
    } else if (stack.length > 0) {
        current = stack.pop();
    } else {
        clearInterval(mazeLoop);
        grid.forEach(cell => cell.visited = false);
        current = grid[0];
        current.isPath = true;
        stack.push(current);
        end = grid[grid.length - 1];
        pathLoop = setInterval(findPath, 0);
    }
    current.highlight();
}

// findPath function finds the path from the start to the end of the maze using DFS.
function findPath() {
    current.visited = true;
    let next = current.getNeighboursWithoutWalls();
    if (next) {
        stack.push(current);
        next.isPath = true;
        if (next === end) {
            clearInterval(pathLoop);
        }
        current = next;
    } else if (stack.length > 0) {
        current.isPath = false;
        current = stack.pop();
    } else {
        clearInterval(pathLoop);
    }
    current.highlight();
}

// Cell class represents each cell in the grid with its position, walls, and visited status.
class Cell {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.visited = false;
        this.walls = { top: true, right: true, bottom: true, left: true };
        this.isPath = false;
    }

    // Removes the walls between this cell and a neighboring cell.
    removeWallsBetween(neighbor, from, to) {
        this.walls[from] = false;
        neighbor.walls[to] = false;
    }

    // Checks the neighboring cells and returns an unvisited neighbor if available.
    checkNeighbors() {
        const neighbors = [];
        const directions = {
            top: grid[index(this.i, this.j - 1)],
            right: grid[index(this.i + 1, this.j)],
            bottom: grid[index(this.i, this.j + 1)],
            left: grid[index(this.i - 1, this.j)]
        };

        for (let dir in directions) {
            let neighbor = directions[dir];
            if (neighbor && !neighbor.visited) {
                neighbors.push({ from: dir, to: this.opposite(dir), cell: neighbor });
            }
        }

        return neighbors.length > 0 ? random(neighbors) : undefined;
    }

    
    // Returns the neighbors of this cell that can be visited without crossing walls.
    getNeighboursWithoutWalls() {
        const neighbors = [];
        const directions = {
            top: grid[index(this.i, this.j - 1)],
            right: grid[index(this.i + 1, this.j)],
            bottom: grid[index(this.i, this.j + 1)],
            left: grid[index(this.i - 1, this.j)]
        };

        for (let dir in directions) {
            let neighbor = directions[dir];
            if (neighbor && !this.walls[dir] && !neighbor.visited) {
                neighbors.push(neighbor);
            }
        }

        return neighbors.length > 0 ? random(neighbors) : undefined;
    }

    
    // Draws the cell and its walls on the canvas.
    show() {
        const x = this.i * cellSize;
        const y = this.j * cellSize;
        stroke(255);
        strokeWeight(2);

        if (this.walls.top) line(x, y, x + cellSize, y);
        if (this.walls.right) line(x + cellSize, y, x + cellSize, y + cellSize);
        if (this.walls.bottom) line(x + cellSize, y + cellSize, x, y + cellSize);
        if (this.walls.left) line(x, y + cellSize, x, y);

        if (this.visited) {
            noStroke();
            fill(255, 0, 100, 50);
            rect(x, y, cellSize, cellSize);
        }
        if (this.isPath) {
            noStroke();
            fill(155, 200, 100, 200);
            rect(x + cellSize / 4, y + cellSize / 4, cellSize / 2, cellSize / 2);
        }
    }

    // Highlights the cell by drawing a rectangle over it.
    highlight() {
        const x = this.i * cellSize;
        const y = this.j * cellSize;
        noStroke();
        fill(0, 255, 0, 150);
        rect(x, y, cellSize, cellSize);
    }

    // Returns the opposite direction of the given direction.
    opposite(direction) {
        return { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[direction];
    }
}