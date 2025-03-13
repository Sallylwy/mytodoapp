import React, { useState, useEffect } from "react";
import ToDoList from "./todolist";
import './App.css';
import { getTasks, addTask as apiAddTask } from "./services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from './assets/ideaspark.svg';

interface Task {
  _id: string;
  text: string;
  completed: boolean;
  description: string;
}

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState<string>("");
  const [error, setError] = useState("");

  // Load tasks when component mounts
  useEffect(() => {
    const loadTasks = async () => {
      try {
        console.log('Loading initial tasks...');
        const fetchedTasks = await getTasks();
        console.log('Loaded tasks:', fetchedTasks);
        setTasks(fetchedTasks);
        setError("");
      } catch (err) {
        console.error('Failed to load tasks:', err);
        setError("Failed to load tasks");
        setTasks([]); // Ensure we have an empty array
      }
    };
    loadTasks();
  }, []); // Empty dependency array means this runs once on mount

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (taskInput.trim()) {
      try {
        const newTask = await apiAddTask({
          text: taskInput,
          completed: false,
          description: ""
        });
        console.log('Task added successfully:', newTask);
        // Reload all tasks instead of just appending
        const updatedTasks = await getTasks();
        setTasks(updatedTasks);
        setTaskInput("");
        setError("");
      } catch (err) {
        console.error('Failed to add task:', err);
        setError("Failed to add task");
      }
    }
  };

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container-fluid">
          {/* Logo */}
          <a className="navbar-brand" href="#">
            <img 
              src={logo} 
              alt="Logo" 
              className="nav-logo"
            />
          </a>

          {/* Dropdown Menu */}
          <div className="dropdown">
            <button 
              className="menu-button" 
              type="button" 
              id="dropdownMenuButton" 
              data-bs-toggle="dropdown" 
              aria-expanded="false"
            >
              Menu
            </button>
            <ul className="dropdown-menu custom-dropdown" aria-labelledby="dropdownMenuButton">
              <li><a className="dropdown-item" href="#">To-do List</a></li>
              <li><a className="dropdown-item" href="#">Idea Backlog</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="app">
        <div className="todo-card">
          <div className="status-count">
            <span>Completed: {completedCount}</span>
          </div>
          <h1>Hey Sal, what would you like to achieve today 🚀</h1>
          {error && <div style={{color: 'red'}}>{error}</div>}
          <form onSubmit={handleAddTask}>
            <div className="input-container">
              <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="Enter a task..."
              />
              <button type="submit">Add</button>
            </div>
          </form>
          <ToDoList tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
    </div>
  );
};

export default App;
