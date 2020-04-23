import React,{useState} from "react";
import {
    Board
} from "./components/board";
import "./styles/app.scss"
import {Car} from "./components/car";
export const App = () => {
    const [cars,setCars] = useState([{
        startAt: "A1",
        cellCount: 3,
        color: "blue",
        isVertical: false
    }, {
        startAt: "B1",
        cellCount: 2,
        color: "purple",
        isVertical: true
    }, {
        startAt: "A4",
        cellCount: 2,
        color: "gray",
        isVertical: true
    }, {
        startAt: "A5",
        cellCount: 3,
        color: "yellow",
        isVertical: true
    }, {
        startAt: "A6",
        cellCount: 2,
        color: "green",
        isVertical: true
    }, {
        startAt: "C3",
        cellCount: 2,
        color: "red",
        isVertical: false
    }, {
        startAt: "D1",
        cellCount: 2,
        color: "forestgreen",
        isVertical: false
    }, {
        startAt: "E2",
        cellCount: 2,
        color: "blue",
        isVertical: true
    }, {
        startAt: "D3",
        cellCount: 2,
        color: "orange",
        isVertical: true
    }, {
        startAt: "F3",
        cellCount: 2,
        color: "yellow",
        isVertical: false
    }, {
        startAt: "F5",
        cellCount: 2,
        color: "black",
        isVertical: false
    }, {
        startAt: "E5",
        cellCount: 2,
        color: "slategray",
        isVertical: false
    },]);
    return ( 
        <Board size={6} setCars={setCars} cars={cars} render = {
            (positions) => cars.map((car,index) => (<Car 
                startAt = {car.startAt}
                cellCount = {car.cellCount}
                positions = {positions}
                color = {car.color}
                isVertical = {car.isVertical}
                key = {car.startAt}
                index={index}
                
                />
            ))
        }>
        </Board>
    )
}