import React from 'react';
import './App.css';
import { TaskProvider } from './context/TaskContext';
import ToDoList from './components/ToDoList';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


function App() {
    return (
        <TaskProvider>
            <Navbar />

            <div className={"app-container"}>
                <ToDoList />
            </div>

            <Footer />
        </TaskProvider>
    );
}

export default App;
