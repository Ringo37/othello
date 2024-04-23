import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 3, 2, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 3, 0, 0],
    [0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const directions = [
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  const clickHandler = (x: number, y: number) => {
    console.log(x, y);
    const newBoard = structuredClone(board);
    const reverse = (x: number, y: number, board: number[][], direction: number[]) => {
      for (let i = 1; i < 8; i++) {
        const X = x + i * direction[0];
        const Y = y + i * direction[1];
        if (X < 0 || X >= 8 || Y < 0 || Y >= 8) {
          break;
        }
        if (board[Y][X] !== turnColor) {
          board[Y][X] = turnColor;
        } else {
          break;
        }
        board[y][x] = turnColor;
        setTurnColor(2 / turnColor);
        setBoard(board);
      }
    };
    const reversible = (
      x: number,
      y: number,
      board: number[][],
      color: number,
      direction: number[],
    ) => {
      for (let i = 1; i < 8; i++) {
        const X = x + i * direction[0];
        const Y = y + i * direction[1];
        if (X < 0 || X >= 8 || Y < 0 || Y >= 8) {
          break;
        } else if (board[Y][X] === 0 || board[Y][X] === 3) {
          break;
        } else if (board[Y][X] === color) {
          if (i > 1) {
            return true;
          }
          break;
        }
      }
      return false;
    };
    const check = () => {
      for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
          if (newBoard[y][x] === 3) {
            newBoard[y][x] = 0;
          }
        }
      }
      for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
          console.log(newBoard);
          if (newBoard[y][x] === 0) {
            for (const direction of directions) {
              if (reversible(x, y, newBoard, 2 / turnColor, direction)) {
                newBoard[y][x] = 3;
              }
            }
          }
        }
      }
      setBoard(newBoard);
      console.log(newBoard);
    };
    //ここから実行
    if (newBoard[y][x] === 3) {
      for (const direction of directions) {
        if (reversible(x, y, newBoard, turnColor, direction)) {
          reverse(x, y, newBoard, direction);
        }
      }
      check();
    }
  };

  const point = (a: number) => board.flat().filter((b) => b === a).length;
  return (
    <div className={styles.container}>
      <div className={styles.pointStyle}>
        <p>
          White:{point(2)}-{point(1)}:Black
        </p>
        <p>{turnColor === 1 ? 'Black' : 'White'}</p>
      </div>
      <div className={styles.boardStyle}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cellStyle} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stoneStyle}
                  style={{
                    background: color === 1 ? '#000' : color === 2 ? '#fff' : '#ff21ec',
                    width: color === 3 ? '20px' : '56px',
                    height: color === 3 ? '20px' : '56px',
                  }}
                />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Home;
