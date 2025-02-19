import React, { useEffect, useRef, useState } from 'react';
import { Circle } from 'lucide-react';

interface MazeGameProps {
  teamName: string;
  onDirectionSelect: (directions: { up: boolean; down: boolean; left: boolean; right: boolean; lastMove: 'up' | 'down' | 'left' | 'right' | null }) => void;
  canMove: boolean;
  selectedDirection: string | null;
}

// Define types for maze cell and maze constructor
interface MazeCell {
  n: boolean;
  s: boolean;
  e: boolean;
  w: boolean;
  visited: boolean;
  priorPos: { x: number; y: number; } | null;
}

interface MazeConstructor {
  map: () => MazeCell[][];
  startCoord: () => { x: number; y: number };
  endCoord: () => { x: number; y: number };
}

interface PlayerPosition {
  x: number;
  y: number;
}

interface MoveHistory {
  direction: 'up' | 'down' | 'left' | 'right';
  position: PlayerPosition;
}

const MazeGame: React.FC<MazeGameProps> = ({ 
  teamName, 
  onDirectionSelect, 
  canMove,
  selectedDirection 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [playerPos, setPlayerPos] = useState<PlayerPosition>(() => {
    const stored = localStorage.getItem(`maze_${teamName}_player`);
    if (stored) return JSON.parse(stored);
    const start = localStorage.getItem(`maze_${teamName}_start`);
    if (start) return JSON.parse(start);
    return { x: 0, y: 0 };
  });
  const [lastMove, setLastMove] = useState<'up' | 'down' | 'left' | 'right' | null>(null);
  const [moveHistory, setMoveHistory] = useState<MoveHistory[]>(() => {
    const stored = localStorage.getItem(`maze_${teamName}_history`);
    return stored ? JSON.parse(stored) : [];
  });

  // Update available directions whenever player position changes
  useEffect(() => {
    const mazeData = JSON.parse(localStorage.getItem(`maze_${teamName}`) || '[]');
    if (!mazeData.length) return;

    const currentCell = mazeData[playerPos.x][playerPos.y];
    
    onDirectionSelect({
      up: currentCell.n,
      down: currentCell.s,
      left: currentCell.w,
      right: currentCell.e,
      lastMove
    });
  }, [playerPos.x, playerPos.y, teamName, lastMove]);

  // Move player when direction is selected
  useEffect(() => {
    if (!canMove || !selectedDirection) return;

    let newPos = { ...playerPos };
    let newLastMove: typeof lastMove = null;

    if (selectedDirection === 'back' && moveHistory.length > 0) {
      const previousMove = moveHistory[moveHistory.length - 1];
      newPos = previousMove.position;
    } else {
      switch (selectedDirection) {
        case 'up': newPos.y--; newLastMove = 'up'; break;
        case 'down': newPos.y++; newLastMove = 'down'; break;
        case 'left': newPos.x--; newLastMove = 'left'; break;
        case 'right': newPos.x++; newLastMove = 'right'; break;
      }
    }

    setPlayerPos(newPos);
    setLastMove(newLastMove);
    localStorage.setItem(`maze_${teamName}_player`, JSON.stringify(newPos));
  }, [canMove, selectedDirection, teamName]);

  // Update movement history when player moves
  useEffect(() => {
    if (lastMove && lastMove !== 'back') {
      const newHistory = [...moveHistory, { direction: lastMove, position: playerPos }];
      setMoveHistory(newHistory);
      localStorage.setItem(`maze_${teamName}_history`, JSON.stringify(newHistory));
    }
  }, [lastMove, playerPos.x, playerPos.y, teamName]);

  // Handle going back
  useEffect(() => {
    if (selectedDirection === 'back' && moveHistory.length > 0) {
      const newHistory = [...moveHistory];
      newHistory.pop();
      setMoveHistory(newHistory);
      localStorage.setItem(`maze_${teamName}_history`, JSON.stringify(newHistory));
    }
  }, [selectedDirection, teamName]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set fixed size for the maze container
    canvas.width = 200;
    canvas.height = 200;

    // Initialize maze generation function with proper typing
    function Maze(width: number, height: number): MazeConstructor {
      const maze: MazeCell[][] = Array(width).fill(null).map(() => 
        Array(height).fill(null).map(() => ({
          n: false, s: false, e: false, w: false,
          visited: false, priorPos: null
        }))
      );

      let startCoord = { x: 0, y: 0 };
      let endCoord = { x: width - 1, y: height - 1 };

      type Direction = 'n' | 's' | 'e' | 'w';
      const directions: Direction[] = ['n', 's', 'e', 'w'];
      
      interface DirModifier {
        y: number;
        x: number;
        o: Direction;
      }

      const modDir: Record<Direction, DirModifier> = {
        n: { y: -1, x: 0, o: 's' },
        s: { y: 1, x: 0, o: 'n' },
        e: { y: 0, x: 1, o: 'w' },
        w: { y: 0, x: -1, o: 'e' }
      };

      const generateMaze = (x: number, y: number): void => {
        maze[x][y].visited = true;
        
        [...directions]
          .sort(() => Math.random() - 0.5)
          .forEach((dir) => {
            const nx = x + modDir[dir].x;
            const ny = y + modDir[dir].y;
            
            if (nx >= 0 && nx < width && ny >= 0 && ny < height && !maze[nx][ny].visited) {
              // Safely type the property access
              const cellProp = dir as keyof Pick<MazeCell, 'n' | 's' | 'e' | 'w'>;
              const oppositeProp = modDir[dir].o as keyof Pick<MazeCell, 'n' | 's' | 'e' | 'w'>;
              
              maze[x][y][cellProp] = true;
              maze[nx][ny][oppositeProp] = true;
              generateMaze(nx, ny);
            }
          });
      };

      generateMaze(0, 0);

      return {
        map: () => maze,
        startCoord: () => startCoord,
        endCoord: () => endCoord
      };
    }

    const getMazeData = () => {
      const storedMaze = localStorage.getItem(`maze_${teamName}`);
      if (storedMaze) {
        return JSON.parse(storedMaze);
      }
      
      const maze = Maze(12, 12);
      localStorage.setItem(`maze_${teamName}`, JSON.stringify(maze.map()));
      localStorage.setItem(`maze_${teamName}_start`, JSON.stringify(maze.startCoord()));
      localStorage.setItem(`maze_${teamName}_end`, JSON.stringify(maze.endCoord()));
      return maze.map();
    };

    const drawMaze = () => {
      const mazeData = getMazeData();
      const cellSize = canvas.width / 12;
      
      ctx.strokeStyle = '#4a5568';
      ctx.lineWidth = 2;

      // Draw the maze
      for (let x = 0; x < 12; x++) {
        for (let y = 0; y < 12; y++) {
          const cell = mazeData[x][y];
          const xPos = x * cellSize;
          const yPos = y * cellSize;

          if (!cell.n) {
            ctx.beginPath();
            ctx.moveTo(xPos, yPos);
            ctx.lineTo(xPos + cellSize, yPos);
            ctx.stroke();
          }
          if (!cell.s) {
            ctx.beginPath();
            ctx.moveTo(xPos, yPos + cellSize);
            ctx.lineTo(xPos + cellSize, yPos + cellSize);
            ctx.stroke();
          }
          if (!cell.e) {
            ctx.beginPath();
            ctx.moveTo(xPos + cellSize, yPos);
            ctx.lineTo(xPos + cellSize, yPos + cellSize);
            ctx.stroke();
          }
          if (!cell.w) {
            ctx.beginPath();
            ctx.moveTo(xPos, yPos);
            ctx.lineTo(xPos, yPos + cellSize);
            ctx.stroke();
          }
        }
      }

      // Draw start and end points
      const start = JSON.parse(localStorage.getItem(`maze_${teamName}_start`) || '{"x":0,"y":0}');
      const end = JSON.parse(localStorage.getItem(`maze_${teamName}_end`) || '{"x":11,"y":11}');

      ctx.fillStyle = '#48bb78';
      ctx.fillRect(start.x * cellSize + 2, start.y * cellSize + 2, cellSize - 4, cellSize - 4);

      ctx.fillStyle = '#f56565';
      ctx.fillRect(end.x * cellSize + 2, end.y * cellSize + 2, cellSize - 4, cellSize - 4);
    };

    // Add player marker drawing
    const drawPlayer = () => {
      const cellSize = canvas.width / 12;
      ctx.fillStyle = '#4299e1'; // Blue color for player
      ctx.beginPath();
      ctx.arc(
        playerPos.x * cellSize + cellSize / 2,
        playerPos.y * cellSize + cellSize / 2,
        cellSize / 3,
        0,
        Math.PI * 2
      );
      ctx.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawMaze();
      drawPlayer();
    };

    render();
  }, [teamName, playerPos]);

  return (
    <div className="relative">
      <canvas 
        ref={canvasRef}
        className="w-80 h-80 bg-white rounded-lg shadow-lg"
        tabIndex={0} // Make canvas focusable
      />
    </div>
  );
};

export default MazeGame;