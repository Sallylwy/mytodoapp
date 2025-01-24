import React, { useState } from "react";
import TaskItem from "./taskitem";

type Task = {
  id: number;
  text: string;
  completed: boolean;
  description: string;
};

type ToDoListProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const ToDoList: React.FC<ToDoListProps> = ({ tasks, setTasks }) => {
  const [filter, setFilter] = useState<"All" | "Active" | "Completed">("All");

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const toggleComplete = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const clearAllTasks = () => {
    setTasks([]); // Clear the tasks array
  };

  const editTask = (id: number, newText: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
  };

  const filteredTasks =
    filter === "All"
      ? tasks
      : filter === "Active"
      ? tasks.filter((task) => !task.completed)
      : tasks.filter((task) => task.completed);

const editDescription = (id: number, newDescription: string) => {
  const updatedTasks = tasks.map((task) =>
    task.id === id ? { ...task, description: newDescription } : task
  );
  setTasks(updatedTasks);
};

  return (
    <div className="todo-list">
      <div className="task-list">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleComplete={toggleComplete}
            editTask={editTask}
            editDescription={editDescription} // Pass the editDescription function
          />
        ))}
      </div>
  
      <div className="footer">
        {/* Filters */}
        <div className="filters">
          <button
            className={filter === "All" ? "active" : ""}
            onClick={() => setFilter("All")}
          >
            All
          </button>
          <button
            className={filter === "Active" ? "active" : ""}
            onClick={() => setFilter("Active")}
          >
            Active
          </button>
          <button
            className={filter === "Completed" ? "active" : ""}
            onClick={() => setFilter("Completed")}
          >
            Completed
          </button>
        </div>

        {/* Clear all tasks */}
      <button className="clear-button" onClick={clearAllTasks}>
        Clear All
      </button>
      </div>
    </div>
  );
};

export default ToDoList;
