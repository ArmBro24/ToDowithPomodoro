import React, { useState, useEffect } from 'react';

function PomodoroTimer({ task }) {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState('Work');
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        let timer;
        if (isRunning && !isPaused) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        if (mode === 'Work') {
                            setMode('Rest');
                            return 5 * 60;
                        } else {
                            setMode('Work');
                            return 25 * 60;
                        }
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning, isPaused]);

    useEffect(() => {
        if (!isRunning && isPaused) {
            setMode('Rest');
        }
    }, [isPaused]);

    const handleStart = () => {
        if (!isRunning) {
            setIsRunning(true);
            if (isPaused) {
                setIsPaused(false);
                setMode('Work');
            }
        }
    };

    const handlePause = () => {
        setIsRunning(false);
        setIsPaused(true);
    };

    const handleReset = () => {
        setIsRunning(false);
        setIsPaused(false);
        setMode('Work');
        setTimeLeft(25 * 60);
    };

    return (
        <div className={"pomodoro-container"}>
            <h2>Pomodoro Timer</h2>
            <p className="task-text">Task: {task.name}</p>
            <h3 className={`mode-text ${mode.toLowerCase()}`}>{mode} Mode</h3>
            <h1 className={"timer-display"}>
                {Math.floor(timeLeft / 60)}:
                {String(timeLeft % 60).padStart(2, '0')}
            </h1>
            <div className={"pomodoro-buttons"}>
                <button onClick={handleStart}>{isRunning ? 'Running' : 'Start'}</button>
                <button onClick={handlePause}>Pause</button>
                <button onClick={handleReset}>Reset</button>
            </div>
        </div>
    );
}

export default PomodoroTimer;
