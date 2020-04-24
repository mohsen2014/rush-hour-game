import React,{useState} from "react";
import {
    Board
} from "./components/board";
import "./styles/app.scss"
import {Car} from "./components/car";
import { TimerClock } from "./components/timer";
import { TimerContext } from "./components/bordContext";
export const App = () => {
    const primaryCarsPositions = [{
        startAt: "A1",
        cellCount: 3,
        color: "blue",
        isVertical: false
    // }, {
    //     startAt: "B1",
    //     cellCount: 2,
    //     color: "purple",
    //     isVertical: true
    // }, {
    //     startAt: "A4",
    //     cellCount: 2,
    //     color: "gray",
    //     isVertical: true
    // }, {
    //     startAt: "A5",
    //     cellCount: 3,
    //     color: "yellow",
    //     isVertical: true
    // }, {
    //     startAt: "A6",
    //     cellCount: 2,
    //     color: "green",
    //     isVertical: true
    }, {
        startAt: "C3",
        cellCount: 2,
        color: "red",
        isVertical: false
    // }, {
    //     startAt: "D1",
    //     cellCount: 2,
    //     color: "forestgreen",
    //     isVertical: false
    // }, {
    //     startAt: "E2",
    //     cellCount: 2,
    //     color: "blue",
    //     isVertical: true
    // }, {
    //     startAt: "D3",
    //     cellCount: 2,
    //     color: "orange",
    //     isVertical: true
    // }, {
    //     startAt: "F3",
    //     cellCount: 2,
    //     color: "yellow",
    //     isVertical: false
    // }, {
    //     startAt: "F5",
    //     cellCount: 2,
    //     color: "black",
    //     isVertical: false
    }, {
        startAt: "E5",
        cellCount: 2,
        color: "slategray",
        isVertical: false
    },];
    const [cars,setCars] = useState(JSON.parse(JSON.stringify(primaryCarsPositions)));
    const [startTimer,setStartTimer] = useState(false);
    const [stopTimer,setStopTimer] = useState(false);
    const [restartTimer,setRestartTimer] = useState(false);
    return ( 
        <TimerContext.Provider value={{setStartTimer,setStopTimer,setRestartTimer, startTimer,stopTimer,restartTimer}}>
            <div>
                Time: < TimerClock startImmediately={startTimer} startTimer = {
                    startTimer
                }
                startTimer = {
                    startTimer
                }
                stopTimer = {
                    stopTimer
                }
                restartTimer = {
                    restartTimer
                }
                />
            </div>
            <Board size={6} setCars={setCars} cars={cars} primaryCarsPositions={primaryCarsPositions} render = {
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
        </TimerContext.Provider>
    )
}