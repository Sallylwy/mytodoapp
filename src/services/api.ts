import axios from "axios";

// Update this line at the top of your api.ts file
const API_BASE_URL = "https://api.ideaspark.me/api";

// Configure axios defaults
axios.defaults.withCredentials = true;

// Function to get all tasks
export const getTasks = async () => {
  try {
    console.log('Fetching tasks from:', `${API_BASE_URL}/tasks`);
    const response = await axios.get(`${API_BASE_URL}/tasks`);
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
    console.log('Adding task:', task);
    const response = await axios.post(`${API_BASE_URL}/tasks`, task);
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
