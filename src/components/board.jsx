import React,{ useState,useEffect }from "react";
import { Cell } from "./cell";
import "./../styles/board.scss";


export const Board = ({size=6,render}) => {
    const renderAllCells = RenderAllCells({size});
    const [positions,setPositions] = useState(null);
    useEffect(()=>{
        if(positions) return;
        setTimeout(() => {
            setPositions(renderAllCells.coordinates)
        }, 1);
    },[positions, renderAllCells.coordinates]);
    return(
        <div className="board-game-wrapper" >
            <div className="board-game" style={{gridTemplateColumns: Array(size).fill('auto').join(' ')}}>
                {renderAllCells.elements}
                {render(positions)}    
            </div>
        </div>
    )
}

const RenderAllCells = ({ size })=>{
    const [...signs] = "ABCDEFGHI";
    const cells = {}
    const coordinates = {};
    useEffect(()=>{
        setTimeout(()=>{
            Object.keys(cells).forEach((name)=>{
                coordinates[name] = {top: cells[name].current?.offsetTop, left: cells[name].current?.offsetLeft}
            });
        },0);
    },[cells, coordinates])
    return {
        elements: signs.slice(0, size).map(sign => Array(size).fill().map((val, index) => {
                const name = `${sign}${index + 1}`;
                cells[name] = React.createRef();
                    return (<Cell
                        name={name}
                        sign={sign}
                        count={index + 1}
                        ref={cells[name]}
                        key={index}
                    />)
                })
            ),
        coordinates
    }    
}