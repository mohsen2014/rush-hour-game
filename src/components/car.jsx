import React,{useContext} from "react";
import { BoardContext } from "./bordContext";
export const Car = ({cellCount}) => {
    
    const {cellSize} = useContext(BoardContext);

    return (
        <div className="car" style={{height: cellSize,width: cellSize}}>
            
        </div>
    )
}