import React from "react";
import { Board } from "./components/board";
import "./styles/app.scss"
import { Car } from "./components/car";
export const App = () => (
    <Board size={6} render={(positions)=>{
        return <Car startAt="A4" cellCount={2} positions={positions}/>
    }}>
    </Board>
)
