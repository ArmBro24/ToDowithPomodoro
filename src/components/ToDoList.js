import React, { useState, useEffect, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import PomodoroTimer from "./PomodoroTimer";

function ToDoList() {
    const { tasks, setTasks, filter, setFilter } = useContext(TaskContext);
    const [taskInput, setTaskInput] = useState("");
    const [taskDeadline, setTaskDeadline] = useState("");

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (taskInput.trim() === "") return;
        setTasks([
            ...tasks,
            {
                id: Date.now(),
                name: taskInput,
                deadline: taskDeadline,
                completed: false,
                usePomodoro: false,
            },
        ]);
        setTaskInput("");
        setTaskDeadline("");
    };

    const toggleTaskStatus = (id) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id
                    ? { ...task, completed: !task.completed, usePomodoro: false }
                    : task
            )
        );
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const togglePomodoroForTask = (id) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, usePomodoro: !task.usePomodoro } : task
            )
        );
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === "Completed") return task.completed;
        if (filter === "In Progress") return !task.completed;
        return true;
    });

    return (
        <div>
            <h2>To-Do List</h2>
            <div className="task-input">
                <input
                    type="text"
                    placeholder="Add a task..."
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                />
            </div>
            <div className="task-actions">
                <input
                    type="date"
                    className="task-date"
                    value={taskDeadline}
                    onChange={(e) => setTaskDeadline(e.target.value)}
                />
                <button onClick={addTask}>Add Task</button>
            </div>

            <div className="filters">
                <button onClick={() => setFilter("All")} disabled={filter === "All"}>
                    All
                </button>
                <button
                    onClick={() => setFilter("Completed")}
                    disabled={filter === "Completed"}
                >
                    Completed
                </button>
                <button
                    onClick={() => setFilter("In Progress")}
                    disabled={filter === "In Progress"}
                >
                    In Progress
                </button>
            </div>

            <ul className="task-list">
                {filteredTasks.map((task) => (
                    <React.Fragment key={task.id}>
                        <li className="task-item"
                            style={{
                                textDecoration: task.completed ? 'line-through' : 'none',
                            }}
                        >
                            <span onClick={() => toggleTaskStatus(task.id)}>
                                {task.name} {task.deadline && `(Deadline: ${task.deadline})`}
                            </span>
                            <button onClick={() => deleteTask(task.id)}>Delete</button>
                            <button onClick={() => togglePomodoroForTask(task.id)}>
                                {task.usePomodoro ? "Disable Pomodoro" : "Enable Pomodoro"}
                            </button>
                        </li>
                        {task.usePomodoro && <PomodoroTimer task={task} />}
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
}

export default ToDoList;