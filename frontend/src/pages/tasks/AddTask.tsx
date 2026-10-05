import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../../components/TaskForm";
import { createTask } from "../../services/taskService";
import type { TaskStatus, TaskPriority } from "../../types/task";
const AddTask = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<TaskStatus>("PENDING");
  const [priority, setPriority] = useState<TaskPriority>("MEDIUM");
  const [error, setError] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    try {
      await createTask({title,description,status,priority});
      navigate("/tasks");
    } catch (error) {
      console.error("Failed to create task:", error);
      setError("Failed to create task");
    }
  };

  return (
    <div className="form-page">
      <div className="page-header">
        <div>
          <h1>Add Task</h1>
          <p>Create a new task</p>
        </div>
        <button
          type="button"
          className="secondary-button"
          onClick={() => navigate("/tasks")}
        >
          Back
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <TaskForm
        title={title}
        description={description}
        status={status}
        priority={priority}
        submitText="Create Task"
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
        onStatusChange={setStatus}
        onPriorityChange={setPriority}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/tasks")}
      />
    </div>
  );
};

export default AddTask;
