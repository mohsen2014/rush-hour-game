import React,{useEffect,useState,useContext} from "react";
import { BoardContext } from "./bordContext";
import "./../styles/car.scss";

export const Car = ({cellCount, startAt,positions,color,isVertical,index}) => {
    // console.log(cellCount, startAt,positions,color,isVertical)
    const [positionTop,setPositionTop] = useState(0)
    const [positionLeft,setPositionLeft] = useState(0);
    const ref = React.createRef();
    const { selectedCar, setSelectedCar,cars,setCars } = useContext(BoardContext)
    useEffect(()=>{
        if(positions){
            setPositionTop(positions[startAt]?.top);
            setPositionLeft(positions[startAt]?.left);
        }
    },[positions, startAt]);

    const handleClick = () => {
        setSelectedCar(startAt);
    }
    const arrows = {down: 'ArrowDown', up: 'ArrowUp', left: 'ArrowLeft', right: 'ArrowRight'};
    const [...rowsLetters] = "ABCDEF"
    const handleKey = (e) =>{
        if(Object.values(arrows).indexOf(e.key) === -1) return;
        const key = e.key;
        if(isVertical && (key === arrows.left || key === arrows.right)) return;
        if(!isVertical && (key === arrows.up || key === arrows.down)) return;
        const {itWillStartAt, nextCell} = calculateNextCell(isVertical,startAt,cellCount, key);debugger;
        if(isValidMove(cars, nextCell)){
            itWillStartAt && setCars(cars.map(car => {
                if(car.startAt === startAt){
                    car.startAt = itWillStartAt
                }
                return car
            }));
        }
    }
    const isValidMove = (cars, nextCell) =>{
        const currentCar = startAt;
        let isValid = true;
        cars.forEach(({startAt, cellCount,isVertical}) => {
            if(currentCar !== startAt){
                const reservedCells = calcReservedCells({startAt, cellCount,isVertical})
                if(reservedCells.indexOf(nextCell) > -1){
                    isValid = false;
                }
            }
        });
        return isValid
    }

    const calcReservedCells = ({startAt,cellCount, isVertical}) => {
        // let cells = [];
        const rowName = startAt.slice(0,1);
        const colNumner = startAt.slice(1);
        if(isVertical){
            const startCellIndex =  rowsLetters.indexOf(rowName);
            return Array(cellCount).fill().map((val,index)=>`${rowsLetters[startCellIndex + index]}${colNumner}`);
        }else{
            const startCellIndex = +colNumner;
            return Array(cellCount).fill().map((val,index)=>`${rowName}${+colNumner+index}`);
        }
    }

    const calculateNextCell = (isVertical,startAt,cellCount, key) =>{
        const rowName = startAt.slice(0,1);
        const colNumner = startAt.slice(1);
        const result = (startAt,nextCell) => ({itWillStartAt: startAt,nextCell});

        if(isVertical){
            const startCellIndex =  rowsLetters.indexOf(rowName);
            const lastCellIndex = rowsLetters.indexOf(rowName)+cellCount-1;
            if(key === arrows.up){
                // limited by roof
                if(startCellIndex === 0) return result(null,null);
                // else 
                return result(
                    `${rowsLetters[startCellIndex-1]}${colNumner}`
                    ,`${rowsLetters[startCellIndex-1]}${colNumner}`);
            }else if(key === arrows.down){
                // limited by floor
                if(lastCellIndex === 5) return result(null,null);
                // else
                return result(
                    `${rowsLetters[startCellIndex+1]}${colNumner}`
                    ,`${rowsLetters[lastCellIndex+1]}${colNumner}`);
            }
        }else{
            const columnCount = rowsLetters.length;
            const startCellIndex = +colNumner
            const lastCellIndex = +colNumner+(+cellCount)-1
            // console.log(startCellIndex,lastCellIndex)
            if(key === arrows.left){
                // Limited by left wall
                if(startCellIndex === 1) return result(null,null);
                // else
                return result(
                    `${rowName}${startCellIndex-1}`,
                    `${rowName}${startCellIndex-1}`
                )
            }else if(key === arrows.right){
                // Limited by right wall
                if(lastCellIndex === 6) return result(null,null);
                // else 
                return result(
                    `${rowName}${startCellIndex+1}`,
                    `${rowName}${lastCellIndex+1}`
                )
            }
        }
    }

    const getHeight = () =>isVertical ? 40 * cellCount + (cellCount * 7) : 40;
    const getWidth = () => isVertical ? 40 : 40 * cellCount + (cellCount * 7);
    const style = {
        height: getHeight(),
        width: getWidth(),
        top: positionTop,
        left: positionLeft,
        backgroundColor: color 
    }

    return positionTop && setPositionLeft && (<div tabIndex={index} onKeyDown={handleKey} ref={ref} onClick={handleClick} className={`car ${selectedCar === startAt ? 'selected' : ''}`} style={style} >
        </div>);

}