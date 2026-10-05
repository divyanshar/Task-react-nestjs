import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskForm from "../../components/TaskForm";
import { getTask, updateTask } from "../../services/taskService";
import type { TaskStatus, TaskPriority } from "../../types/task";
const EditTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("PENDING");
  const [priority, setPriority] = useState<TaskPriority>("MEDIUM");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchTask = async () => {
      if (!id) {
        setError("Task ID is missing");
        setLoading(false);
        return;
      }

      try {
        const task = await getTask(id);
        setTitle(task.title);
        setDescription(task.description ?? "");
        setStatus(task.status);
        setPriority(task.priority);
      } catch (error) {
        console.error("Failed to fetch task:", error);
        setError("Failed to fetch task");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id) {
      return;
    }

    setError("");

    try {
      await updateTask(id, {
        title,
        description,
        status,
        priority,
      });

      navigate("/tasks");
    } catch (error) {
      console.error("Failed to update task:", error);

      setError("Failed to update task");
    }
  };

  if (loading) {
    return <div className="loading-message">Loading task...</div>;
  }

  return (
    <div className="form-page">
      <div className="page-header">
        <div>
          <h1>Edit Task</h1>
          <p>Update your task details</p>
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
        submitText="Update Task"
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

export default EditTask;
