import React, { useState } from "react";
import ToDoList from "./todolist";
import './App.css';

type Task = {
  id: number;
  text: string;
  completed: boolean;
  description: string;
};

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]); // Specify that tasks is an array of Task objects
  const [taskInput, setTaskInput] = useState<string>(""); // Specify that taskInput is a string

const addTask = () => {
  if (taskInput.trim()) {
    setTasks([
      ...tasks,
      { id: Date.now(), text: taskInput, completed: false, description: "" }, // Include description
    ]);
    setTaskInput("");
  }
};

const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") {
    addTask(); // Call addTask when the Enter key is pressed
  }
};

const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="app">
      <div className="todo-card">
      <div className="status-count">
          <span>Completed: {completedCount}</span>
        </div>
        <h1>Hey Sal, what would you like to achieve today 🚀</h1>
        <div className="input-container">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write them here!"
          />
          <button onClick={addTask}>+</button>
        </div>
        <ToDoList tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
};

export default App;
