import axios from "axios";

// Update this line at the top of your api.ts file
const API_BASE_URL = "https://api.ideaspark.me/api";

// Remove credentials from axios defaults
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Function to get all tasks
export const getTasks = async () => {
  try {
    console.log('Fetching tasks from:', `${API_BASE_URL}/tasks`);
    const response = await api.get('/tasks');
    console.log('Tasks response:', response.data);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

// Function to add a new task
export const addTask = async (task: { text: string; completed: boolean; description: string }) => {
  try {
    console.log('Sending task:', task);
    const response = await api.post('/tasks', task);
    console.log('Add task response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

// Function to update a task (e.g., mark as completed)
export const updateTask = async (id: string, updatedTask: any) => {
  try {
    const response = await api.put(`/tasks/${id}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

// Function to delete a task
export const deleteTask = async (id: string) => {
  try {
    await api.delete(`/tasks/${id}`);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};
