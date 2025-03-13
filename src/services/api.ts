import axios from "axios";

// Update this line at the top of your api.ts file
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Function to get all tasks
export const getTasks = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return null;
  }
};

// Function to add a new task
export const addTask = async (task: { text: string; completed: boolean; description: string }) => {
  try {
    console.log('Sending task:', task);
    console.log('To URL:', `${API_BASE_URL}/tasks`);
    const response = await axios.post(`${API_BASE_URL}/tasks`, task);
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
    return null;
  }
};

// Function to update a task (e.g., mark as completed)
export const updateTask = async (id: string, updatedTask: any) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

// Function to delete a task
export const deleteTask = async (id: string) => {
  try {
    await axios.delete(`${API_BASE_URL}/tasks/${id}`);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};
