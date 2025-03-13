import React, { useState, useEffect } from "react";
import ToDoList from "./todolist";
import './App.css';
import { getTasks, addTask as apiAddTask } from "./services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from './assets/ideaspark.svg';

type Task = {
  id: string;
  text: string;
  completed: boolean;
  description: string;
};

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState<string>("");

  // Add useEffect to fetch tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getTasks();
    if (data) {
      setTasks(data.map(task => ({ ...task, id: task._id })));
    }
  };

  const addTask = async () => {
    if (taskInput.trim()) {
      try {
        console.log('Attempting to add task:', taskInput);
        const newTask = { 
          text: taskInput, 
          completed: false, 
          description: "" 
        };
        
        const savedTask = await apiAddTask(newTask);
        console.log('Response from backend:', savedTask);
        
        if (savedTask) {
          setTasks(prevTasks => [...prevTasks, savedTask]);
          setTaskInput("");
        }
      } catch (error) {
        console.error('Error in addTask:', error);
        // Optionally show error to user
        alert('Failed to add task. Please try again.');
      }
    }
  };

  // Make sure your form prevents default submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTask();
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
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                onKeyDown={handleKeyDown}
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
