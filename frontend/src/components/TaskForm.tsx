import type { TaskStatus, TaskPriority } from "../types/task";

interface TaskFormProps {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  submitText: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onStatusChange: (value: TaskStatus) => void;
  onPriorityChange: (value: TaskPriority) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

const TaskForm = ({
  title,
  description,
  status,
  priority,
  submitText,
  onTitleChange,
  onDescriptionChange,
  onStatusChange,
  onPriorityChange,
  onSubmit,
  onCancel,
}: TaskFormProps) => {
  return (
    <div className="form-card">
      <form className="task-form" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
            placeholder="Enter task title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => onDescriptionChange(event.target.value)}
            placeholder="Enter task description"
            rows={5}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>

          <select
            id="status"
            value={status}
            onChange={(event) =>
              onStatusChange(event.target.value as TaskStatus)
            }
          >
            <option value="PENDING">PENDING</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(event) =>
              onPriorityChange(event.target.value as TaskPriority)
            }
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="button" className="secondary-button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="primary-button">
            {submitText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
