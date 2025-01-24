import React, { useState, useEffect } from "react";

// Define Task type
type Task = {
  id: number;
  text: string;
  completed: boolean;
  description: string;
};

// Define TaskItemProps
type TaskItemProps = {
  task: Task;
  deleteTask: (id: number) => void;
  toggleComplete: (id: number) => void;
  editTask: (id: number, newText: string) => void;
  editDescription: (id: number, newDescription: string) => void;
};

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  deleteTask,
  toggleComplete,
  editTask,
  editDescription,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [description, setDescription] = useState(task.description);

  useEffect(() => {
    if (task.completed) {
      setIsExpanded(false); // Automatically collapse description when completed
    }
  }, [task.completed]);

  const handleSaveText = () => {
    if (editText.trim()) {
      editTask(task.id, editText);
    }
    setIsEditing(false);
  };

  const handleSaveDescription = () => {
    if (description.trim()) {
      editDescription(task.id, description);
    }
    setIsExpanded(false); // Collapse after saving
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    saveFn: () => void
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent line breaks
      saveFn();
    }
  };

  const toggleExpand = () => {
    if (!task.completed) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-header" onClick={toggleExpand}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) => {
            e.stopPropagation(); // Prevent toggleExpand when checkbox is clicked
            toggleComplete(task.id);
          }}
        />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSaveText}
            onKeyDown={(e) => handleKeyDown(e, handleSaveText)}
            autoFocus
          />
        ) : (
          <span
            onDoubleClick={(e) => {
              e.stopPropagation(); // Prevent toggleExpand on double-click
              setIsEditing(true);
            }}
            style={{ cursor: "pointer" }}
          >
            {task.text}
          </span>
        )}
        <div
          className="task-actions"
          onClick={(e) => e.stopPropagation()} // Prevent expand toggle when clicking buttons
        >
          <button
  onClick={(e) => {
    e.stopPropagation();
    setIsEditing(true); // Enable editing mode
  }}
  style={{ background: "transparent", border: "none", cursor: "pointer" }} // Optional inline styles for styling
>
  <i className="bi bi-pencil-fill" style={{ color: "#4769ff", fontSize: "16px" }}></i>
</button>
          <button onClick={() => deleteTask(task.id)}>
          <i className="bi bi-x" style={{ color: '#4769ff' }}></i>
          </button>
        </div>
      </div>
      {isExpanded && !task.completed && (
        <textarea
          className="task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={handleSaveDescription}
          onKeyDown={(e) => handleKeyDown(e, handleSaveDescription)}
          placeholder="Add description or goals..."
          autoFocus
        />
      )}
    </div>
  );
};

export default TaskItem;
