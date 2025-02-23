import axios from "axios";

// Make sure this matches your backend port
const API_URL = "http://178.62.33.81:5001/api/tasks";

// Function to get all tasks
export const getTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks", error);
    return [];
  }
}

// Function to add a new task
export const addTask = async (task: { text: string; completed: boolean; description: string }) => {
  try {
    const response = await axios.post(API_URL, task); // FIXED: Changed API_BASE_URL to API_URL
    return response.data;
  } catch (error) {
    console.error("Error adding task", error);
    return null;
  }
};

// Function to update a task (e.g., mark as completed)
export const updateTask = async (id: string, updatedTask: any) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

// Function to delete a task
export const deleteTask = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};
