import React, { useState, useEffect } from "react";

// Define Task type
type Task = {
  id: string;
  text: string;
  completed: boolean;
  description: string;
};

// Define TaskItemProps
type TaskItemProps = {
  task: Task;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
  editTask: (id: string, newText: string) => void;
  editDescription: (id: string, newDescription: string) => void;
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

  useEffect(() => {
    setEditText(task.text);
    setDescription(task.description);
  }, [task.text, task.description]);

  const handleSaveText = async () => {
    if (editText.trim() && editText !== task.text) {
      editTask(task.id, editText);
      setIsEditing(false);
    } else if (!editText.trim()) {
      // If empty, revert to original text
      setEditText(task.text);
      setIsEditing(false);
    } else {
      // If no changes, just exit edit mode
      setIsEditing(false);
    }
  };
  
  const handleSaveDescription = () => {
    if (description.trim() !== task.description) {
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

  const handleTextClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-header">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) => {
            e.stopPropagation();
            toggleComplete(task.id);
          }}
          className="task-checkbox"
        />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSaveText}
            onKeyDown={(e) => handleKeyDown(e, handleSaveText)}
            onClick={(e) => e.stopPropagation()}
            autoFocus
            style={{ flex: 1 }}
          />
        ) : (
          <span
            onClick={handleTextClick}
            style={{ cursor: "pointer", flex: 1 }}
          >
            {task.text}
          </span>
        )}
        <div className="task-actions">
          {/* Description toggle button with tooltip */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            style={{ 
              background: "transparent", 
              border: "none", 
              cursor: "pointer",
              padding: "4px"
            }}
            title="Add notes"
          >
            <i className={`bi bi-chat-square-text${isExpanded ? '-fill' : ''}`} style={{ color: "#4769ff", fontSize: "16px" }}></i>
          </button>
          {/* Delete button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              deleteTask(task.id);
            }}
            style={{ 
              background: "transparent", 
              border: "none", 
              cursor: "pointer",
              padding: "4px"
            }}
          >
            <i className="bi bi-x" style={{ color: '#4769ff' }}></i>
          </button>
        </div>
      </div>
      
      {/* Description section */}
      {isExpanded && !task.completed && (
        <div className="description-container" style={{ marginTop: '8px' }}>
          <textarea
            className="task-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, handleSaveDescription)}
            placeholder="Add description or goals..."
            style={{
              width: '100%',
              minHeight: '60px',
              padding: '8px',
              marginBottom: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          />
          <button
            onClick={handleSaveDescription}
            style={{
              background: '#4769ff',
              color: 'white',
              border: 'none',
              padding: '4px 12px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
