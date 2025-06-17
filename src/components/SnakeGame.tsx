import React, { useState, useEffect, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 15 };
const INITIAL_DIRECTION = { x: 0, y: -1 };

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [direction, setDirection] = useState<Position>(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const generateFood = useCallback((): Position => {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    return { x, y };
  }, []);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
    setGameStarted(false);
  }, []);

  const moveSnake = useCallback(() => {
    if (!gameStarted || gameOver) return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };
      
      head.x += direction.x;
      head.y += direction.y;

      // Check wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true);
        return currentSnake;
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setFood(generateFood());
        setScore(score+1);
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, gameStarted, generateFood]);


  // const startGame = ()=>  { 
  //   setGameStarted(true)
  // }
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!gameStarted) {
      if (e.key === 'r') {
        setGameStarted(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        setDirection(prev => prev.y === 1 ? prev : { x: 0, y: -1 });
        break;
      case 'ArrowDown':
        e.preventDefault();
        setDirection(prev => prev.y === -1 ? prev : { x: 0, y: 1 });
        break;
      case 'ArrowLeft':
        e.preventDefault();
        setDirection(prev => prev.x === 1 ? prev : { x: -1, y: 0 });
        break;
      case 'ArrowRight':
        e.preventDefault();
        setDirection(prev => prev.x === -1 ? prev : { x: 1, y: 0 });
        break;
      case ' ':
        e.preventDefault();
        if (gameOver) {
          resetGame();
        }
        break;
    }
  }, [gameStarted, gameOver, resetGame]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, 150);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  const renderCell = (x: number, y: number) => {
    const isSnake = snake.some(segment => segment.x === x && segment.y === y);
    const isFood = food.x === x && food.y === y;
    const isHead = snake[0]?.x === x && snake[0]?.y === y;

    let cellClass = 'w-3 h-3 ';
    
    if (isSnake) {
      cellClass += isHead ? 'bg-accent-cyan' : 'bg-accent-cyan/70';
    } else if (isFood) {
      cellClass += 'bg-accent-orange rounded-full';
    } else {
      cellClass += 'bg-transparent';
    }

    return <div key={`${x}-${y}`} className={cellClass} />;
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-20 gap-px bg-slate-700 p-4 rounded-lg" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}>
        {Array.from({ length: GRID_SIZE }, (_, y) =>
          Array.from({ length: GRID_SIZE }, (_, x) => renderCell(x, y))
        )}
      </div>
      
      {!gameStarted && (
        <div className="absolute inset-0 bg-slate-800/90 flex items-center justify-center rounded-lg">
          <div className="text-center">
            <p className="text-accent-cyan font-code mb-2">Press R to start</p>
            <p className="text-slate-400 font-code text-sm">Use arrow keys to move</p>
          </div>
        </div>
      )}
      
      {gameOver && (
        <div className="absolute inset-0 bg-slate-800/90 flex items-center justify-center rounded-lg">
          <div className="text-center">
            <p className="text-red-400 font-code mb-2">Game Over!</p>
            <p className="text-accent-cyan font-code mb-2">Score: {score}</p>
            <p className="text-slate-400 font-code text-sm" >Press SPACE to restart</p>
          </div>
        </div>
      )}
      
      <div className="absolute top-2 left-2 text-accent-cyan font-code text-sm">
        Score: {score}
      </div>
    </div>
  );
};

export default SnakeGame;