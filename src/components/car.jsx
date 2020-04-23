import React,{useEffect,useState,useContext} from "react";
import { BoardContext } from "./bordContext";
import "./../styles/car.scss";

export const Car = ({cellCount, startAt,positions,color,isVertical,index}) => {
    const cellDim = 40;
    // car position top and left
    const [positionTop,setPositionTop] = useState(0)
    const [positionLeft,setPositionLeft] = useState(0);
    const element = React.createRef();
    const { selectedCar, setSelectedCar,cars,setCars } = useContext(BoardContext)
    // set height and widht for car
    const getHeight = () =>isVertical ? cellDim * cellCount + (cellCount * 7) : cellDim;
    const getWidth = () => isVertical ? cellDim : cellDim * cellCount + (cellCount * 7);
    const arrows = {down: 'ArrowDown', up: 'ArrowUp', left: 'ArrowLeft', right: 'ArrowRight'};
    const [...rowsLetters] = "ABCDEF"
    const handleClick = () => {
        setSelectedCar(startAt);
    }
    const handleKey = (e) =>{
        const key = e.key;
        if(isArrowKey(arrows, e)) return;
        const isUpAndDownKey = (key === arrows.left || key === arrows.right);
        if(isVertical && isUpAndDownKey) return;
        const isLeftAndRightKey = (key === arrows.up || key === arrows.down);
        if(!isVertical && isLeftAndRightKey) return;
        const {itWillStartAt, nextCell} = calculateNextCell(isVertical,startAt,cellCount, key);
        if(isValidMove(cars, nextCell)){
            if(isWinningMove(nextCell)){
                console.log("You Win");
            } 
            // lets move
            if(itWillStartAt){
                setCars(cars.map(car => {
                    if(car.startAt === startAt){
                        car.startAt = itWillStartAt
                    }
                    return car
                }));
                setSelectedCar(itWillStartAt);
                // console.log(element.current.click)
                // element.current.click();
            }
        }
    }
    const isWinningMove = (nextMove) =>{
        return nextMove === "C6" && color === "red";
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
    const style = {
        height: getHeight(),
        width: getWidth(),
        top: positionTop,
        left: positionLeft,
        backgroundColor: color 
    }
// Set Position Fro Each Car
    useEffect(()=>{
        setTimeout(() => {
            selectedCar === startAt && element.current && element.current.focus();
        }, 1);
    });
    useEffect(()=>{
        if(positions){
            setPositionTop(positions[startAt]?.top);
            setPositionLeft(positions[startAt]?.left);
        }
    },[positions, startAt]);

    return positionTop 
        && setPositionLeft 
        && (<div 
            tabIndex={index} 
            onKeyDown={handleKey} 
            onClick={handleClick} 
            className={`car ${selectedCar === startAt ? 'selected' : ''}`} 
            style={style}
            ref={element}
            >
            
        </div>);

}

function isArrowKey(arrows, e) {
    return Object.values(arrows).indexOf(e.key) === -1;
}
