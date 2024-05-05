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
    //X,Yが0~7以外ならtrue
    const checkXY = (X: number, Y: number) => {
      return [X < 0, X >= 8, Y < 0, Y >= 8].some((element) => element);
    };
    //塗り替える関数
    const reverse = (x: number, y: number, board: number[][], direction: number[]) => {
      for (let i = 1; i < 8; i++) {
        const X = x + i * direction[0];
        const Y = y + i * direction[1];
        //X,Yが0~7以外でブレーク
        if (checkXY(X, Y)) {
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
    //おけるかをブールで返す関数
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
        if (checkXY(X, Y)) {
          break;
          //セルが0か3の時にブレーク
        } else if ([board[Y][X] === 0, board[Y][X] === 3].some((element) => element)) {
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
    const checkPlaceable = (color: number) => {
      //初期化
      [...Array(8)].map((_, x) => {
        [...Array(8)].map((_, y) => {
          if (newBoard[y][x] === 3) {
            newBoard[y][x] = 0;
          }
        });
      });
      [...Array(8)].map((_, x) => {
        [...Array(8)].map((_, y) => {
          if (newBoard[y][x] === 0) {
            for (const direction of directions) {
              //placeableでtrueのセルを3にする
              if (placeable(x, y, newBoard, 2 / color, direction)) {
                newBoard[y][x] = 3;
              }
            }
          }
        });
      });
      setBoard(newBoard);
    };

    const skip = () => {
      if (count(3, newBoard) === 0) {
        console.log('skip');
        setTurnColor(turnColor);
        checkPlaceable(2 / turnColor);
        if (count(3, newBoard) === 0) {
          console.log('END');
          setEnd(true);
        }
      }
    };

    //ここから実行
    if (newBoard[y][x] === 3) {
      for (const direction of directions) {
        //placeableでtrueのセルをreverseの引数として呼び出し
        if (placeable(x, y, newBoard, turnColor, direction)) {
          reverse(x, y, newBoard, direction);
        }
      }
      checkPlaceable(turnColor);
      skip();
    }
  };

  //ゲーム終了判定用
  const [gameEnd, setEnd] = useState(false);

  //カウント
  const count = (color: number, board: number[][]) => {
    return board.flat().filter((a) => a === color).length;
  };

  return (
    <div className={styles.container}>
      <div className={styles.pointStyle}>
        <p>
          黒:{count(1, board)}-{count(2, board)}:白
        </p>
        <p>
          {gameEnd
            ? `${['白の勝ち', '黒の勝ち', '引き分け'][+(count(1, board) >= count(2, board)) + +(count(1, board) === count(2, board))]}です`
            : `${['', '黒', '白'][turnColor]}の番です`}
        </p>
      </div>
      <div className={styles.boardStyle}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cellStyle} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              <div
                className={styles.stoneStyle}
                style={{
                  background: ['transparent', '#000', '#fff', '#ff21ec'][color],
                  width: ['', '56px', '56px', '20px'][color],
                  height: ['', '56px', '56px', '20px'][color],
                }}
              />
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Home;
