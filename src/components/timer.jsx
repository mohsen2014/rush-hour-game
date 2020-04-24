import  React,{useEffect} from "react";
import Timer from "react-compound-timer"
export const TimerClock = ({startImmediately,startTimer=false, stopTimer=false, restartTimer=false})=>{
    let fnStartTimer;
    let fnRestartTimer;
    let fnStopTimer;
    useEffect(()=>{
        if(startTimer){
            fnStartTimer()
        }
    },[startTimer]);
    useEffect(()=>{
        if(restartTimer){
            fnStopTimer()
            fnRestartTimer()
            fnStartTimer();
        }
    },[restartTimer]);
    useEffect(()=>{
        if(stopTimer){
            fnStopTimer()
        }
    },[stopTimer]);
    return(
        <Timer
            startImmediately={false}
            onStart={() => console.log('onStart hook')}
            onStop={() => console.log('onStop hook')}
            onReset={() => console.log('onReset hook')}
        >
            {({start, resume, pause, stop, reset, timerState})=>{
                fnStartTimer = start;
                fnStopTimer = stop;
                fnRestartTimer = reset;
               return (<>
                    <Timer.Minutes />&nbsp;:&nbsp;
                    <Timer.Seconds /> 
                </>)
            }}
        </Timer>
    )
}