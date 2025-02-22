import React, { useState } from "react";
import TaskItem from "./taskitem";
import { deleteTask as apiDeleteTask, updateTask as apiUpdateTask } from "./services/api";

type Task = {
  id: string;
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

  const deleteTask = async (id: string) => {
    try {
      await apiDeleteTask(id); // Call API to delete from database
      setTasks(tasks.filter((task) => task.id !== id)); // Update UI correctly
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };  

  const toggleComplete = async (id: string) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      if (!taskToUpdate) return;
  
      const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
  
      const response = await apiUpdateTask(id, updatedTask);
  
      if (response) {
        setTasks(prevTasks => 
          prevTasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
          )
        );
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };  

  const clearAllTasks = async () => {
    try {
      // You'll need to add this API endpoint to your backend
      for (const task of tasks) {
        await apiDeleteTask(task.id);
      }
      setTasks([]); // Clear the UI state after successful deletion
    } catch (error) {
      console.error("Error clearing tasks:", error);
    }
  };

  const editTask = async (id: string, newText: string) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      if (!taskToUpdate) return;
  
      const updatedTask = { ...taskToUpdate, text: newText };
      const response = await apiUpdateTask(id, updatedTask);
  
      if (response) {
        setTasks(tasks.map(task => 
          task.id === id ? { ...response, id: response._id } : task
        ));
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const editDescription = async (id: string, newDescription: string) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      if (!taskToUpdate) return;

      const updatedTask = { ...taskToUpdate, description: newDescription };
      const response = await apiUpdateTask(id, updatedTask);

      if (response) {
        setTasks(tasks.map(task => 
          task.id === id ? { ...response, id: response._id } : task
        ));
      }
    } catch (error) {
      console.error("Error updating task description:", error);
    }
  };
    

  const filteredTasks =
  filter === "All"
    ? tasks
    : filter === "Active"
    ? tasks.filter((task) => !task.completed)
    : tasks.filter((task) => task.completed);

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
