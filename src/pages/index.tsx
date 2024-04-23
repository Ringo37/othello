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
    //塗り替える関数
    const reverse = (x: number, y: number, board: number[][], direction: number[]) => {
      for (let i = 1; i < 8; i++) {
        const X = x + i * direction[0];
        const Y = y + i * direction[1];
        //X,Yが0~7以外でブレーク
        if (X < 0 || X >= 8 || Y < 0 || Y >= 8) {
          break;
        }
        //自分の色以外を塗り替え
        if (board[Y][X] !== turnColor) {
          board[Y][X] = turnColor;
        } else {
          break;
        }
        //クリックした場所を塗り替え
        board[y][x] = turnColor;
        setTurnColor(2 / turnColor);
        setBoard(board);
      }
    };
    //おけるかブールで返す関数
    const placeable = (
      x: number,
      y: number,
      board: number[][],
      color: number,
      direction: number[],
    ) => {
      for (let i = 1; i < 8; i++) {
        const X = x + i * direction[0];
        const Y = y + i * direction[1];
        //X,Yが0~7以外でブレーク
        if (X < 0 || X >= 8 || Y < 0 || Y >= 8) {
          break;
          //セルが0か3の時にブレーク
        } else if (board[Y][X] === 0 || board[Y][X] === 3) {
          break;
          //同じ色かつ距離が1より大きいときにtrueを返す
        } else if (board[Y][X] === color) {
          if (i > 1) {
            return true;
          }
          break;
        }
      }
      return false;
    };
    //候補地の関数
    const checkPlaceable = () => {
      //初期化
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
              //placeableでtrueのセルを3にする
              if (placeable(x, y, newBoard, 2 / turnColor, direction)) {
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
        //placeableでtrueのセルをreverseの引数として呼び出し
        if (placeable(x, y, newBoard, turnColor, direction)) {
          reverse(x, y, newBoard, direction);
        }
      }
      checkPlaceable();
    }
  };

  const count = (color: number) => {
    let result = 0;
    for (const value of board.flat()) {
      value === color && result++;
    }
    return result;
  };
  return (
    <div className={styles.container}>
      <div className={styles.pointStyle}>
        <p>
          White:{count(2)}-{count(1)}:Black
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
