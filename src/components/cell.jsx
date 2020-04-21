import  React,{useEffect,useRef, useContext} from "react";
import { BoardContext } from "./bordContext";

import "./../styles/cell.scss";

export const Cell = ({...props}) => {
    const ref = useRef(null); 
    const {setCellSize,cellSize} = useContext(BoardContext);
    useEffect(()=>{
        if(!cellSize){
            setCellSize(ref.current.clientHeight);
        }
    },[cellSize, setCellSize]);

    useEffect(()=>{
        props.setCoordinates({[props.name]: { top: ref.current.offsetTop, left: ref.current.offsetLeft}});
    }, [props]);
    return(
        <div className="cell" name={props.name} ref={ref}>
        </div>
    )
}