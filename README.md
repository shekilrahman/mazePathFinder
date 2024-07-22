# Maze Generation and Pathfinding Visualization

This project visualizes the generation of a maze using the Depth-First Search (DFS) algorithm and finds the path from the start to the end of the maze using DFS-based pathfinding. The visualization is implemented using p5.js.

## Live Demo

You can see a live demo of the project [here](https://shekilrahman.github.io/mazePathFinder/).

## Features

- **Maze Generation**: Creates a random maze using the Depth-First Search (DFS) algorithm.
- **Pathfinding**: Finds and visualizes the path from the start to the end of the maze.
- **Interactive Visualization**: Highlights the cells being visited and the final path in real-time.

## Getting Started

### Prerequisites

To run this project locally, you need to have:

- A web browser
- A code editor (optional, for modifications)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/shekilrahman/mazePathFinder.git
    ```

2. Open the `index.html` file in your web browser to view the visualization.

## Project Structure

The project consists of a single JavaScript file (`main.js`) which uses the p5.js library for rendering and animation.

## How It Works

### Maze Generation

The maze generation is based on the Depth-First Search (DFS) algorithm. Here’s a step-by-step breakdown:

1. **Initialization**: The `setup` function initializes the canvas and creates a grid of cells.
2. **Starting Point**: The algorithm starts from the first cell in the grid.
3. **DFS Algorithm**: The `createMaze` function marks the current cell as visited, selects an unvisited neighboring cell, removes the wall between them, and moves to the neighbor cell, pushing the current cell onto a stack.
4. **Backtracking**: If there are no unvisited neighbors, the algorithm backtracks by popping a cell from the stack.
5. **Completion**: The maze is fully generated when all cells have been visited.

### Pathfinding

The pathfinding process is the core focus of this project. It uses a DFS-based algorithm to find a path from the start to the end of the maze:

1. **Initialization**: After maze generation, the `findPath` function initializes with the start cell.
2. **DFS Algorithm**: Similar to maze generation, the algorithm marks the current cell as visited, then selects a neighboring cell that can be visited without crossing walls. It marks the neighbor as part of the path and moves to it, pushing the current cell onto a stack.
3. **Goal Checking**: If the algorithm reaches the end cell, it terminates, having found the path.
4. **Backtracking**: If there are no valid neighbors, the algorithm backtracks by popping a cell from the stack.
5. **Completion**: The pathfinding completes when the end cell is reached, and the path is highlighted.

### Visualization

The p5.js library is used to render the maze and the pathfinding process. Key visual elements include:

- **Grid**: A grid of cells, each with walls on four sides.
- **Visited Cells**: Cells that have been visited during maze generation and pathfinding are highlighted.
- **Path Cells**: Cells that are part of the final path are distinctly colored.
- **Current Cell**: The current cell being processed is highlighted in real-time.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
