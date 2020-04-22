import React,{useEffect,useState} from "react";
import "./../styles/car.scss";

export const Car = ({cellCount, startAt,positions,color}) => {
    
    // const {cellSize,coordinates} = useContext(BoardContext);
    const [positionTop,setPositionTop] = useState(0)
    const [positionLeft,setPositionLeft] = useState(0)
    useEffect(()=>{
        if(positions){
            setPositionTop(positions[startAt]?.top);
            setPositionLeft(positions[startAt]?.left);
        }
    },[positions, startAt])
    return positionTop && setPositionLeft && (<div className="car" style={{height: 40*cellCount+(cellCount * 7 ) ,width: 40,top: positionTop,left: positionLeft}} >
        </div>);

}