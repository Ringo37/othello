import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
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
    if (newBoard[y][x] === 0) {
      for (const direction of directions) {
        for (let i = 1; i < 8; i++) {
          if (newBoard[y + i * direction[1]] === undefined) {
            break;
          } else if (newBoard[y + i * direction[1]][x + i * direction[0]] === undefined) {
            break;
          } else if(newBoard[y+direction[1]][x+direction[0]]===turnColor){
            break;
          } else if (newBoard[y + direction[1] * i][x + direction[0] * i] === 0) {
            break;
          } else if (newBoard[y + direction[1] * i][x + direction[0] * i] === turnColor) {
            for (let j = i; j > 0; j--) {
              newBoard[y + direction[1] * j][x + direction[0] * j] = turnColor;
            }
            newBoard[y][x]=turnColor
            setTurnColor(2 / turnColor);
            setBoard(newBoard);
          }
        }
      }
    }
  };
  const point = (a:number)=>board.flat().filter((b)=>b===a).length;
  return (
    <div className={styles.container}>
      <div className={styles.pointStyle}><p>White:{point(2)}-{point(1)}:Black</p><p>{['','Blackのターン','Whiteのターン'][turnColor]}</p></div>
      <div className={styles.boardStyle}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cellStyle} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stoneStyle}
                  style={{ background: color === 1 ? '#000' : color === 2 ?'#fff' : '#ff21ec', width: color ===3 ? '20px': '56px', height: color ===3 ? '20px': '56px'}}
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
