import React,{ useState,useEffect,useRef }from "react";
import { Cell } from "./cell";
import { BoardContext } from "./bordContext";

import "./../styles/board.scss";


export const Board = ({size=6}) => {
    const [...signs] = "ABCDEFGHI";
    const coordinates = useRef({})
    const [cellSize,setCellSize] = useState(0);
    useEffect(()=>{
        console.log(cellSize)
    },[cellSize])
    const setCoordinates = (pos = {}) => {
        coordinates.current = {
            ...coordinates.current,
            ...pos
        }
    }
    return(
        <div className="board-game-wrapper" >
                <div className="board-game" style={{gridTemplateColumns: Array(size).fill('auto').join(' ')}}>
                    <BoardContext.Provider  value={{setCellSize,cellSize}}>
                    {signs.slice(0, size).map(sign => Array(size).fill().map((val, index) => (
                            <Cell
                                name={`${sign}${index + 1}`}
                                sign={sign}
                                count={index + 1}
                                setCoordinates={setCoordinates}
                            />)
                        )
                    )}
                    </BoardContext.Provider>
            </div>
        </div>
    )
}
