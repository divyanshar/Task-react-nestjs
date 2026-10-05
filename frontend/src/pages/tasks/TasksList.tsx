import { deleteTask, getTasks } from "../../services/taskService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DataGrid,
  GridActionsCellItem,
  type GridColDef,
} from '@mui/x-data-grid';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Task } from "../../types/task";

const TasksList = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks({
        search: search || undefined,
        status: status || undefined,
        priority: priority || undefined,
      });
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteTask(id);

      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const columns: GridColDef<Task>[] = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      minWidth: 180,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1.5,
      minWidth: 250,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 130,
    },
    {
      field: "userId",
      headerName: "User",
      flex: 1,
      minWidth: 220,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 120,
      getActions: (params) => [
        <GridActionsCellItem
          key="edit"
          icon={<EditIcon />}
          label="Edit"
          onClick={() => navigate(`/tasks/edit/${params.row.id}`)}
        />,

        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDelete(params.row.id)}
        />,
      ],
    },
  ];

  const handleSearch = () => {
    fetchTasks();
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatus("");
    setPriority("");
    getTasks().then(setTasks).catch(console.error);
  };

  return (
    <div className="tasks-page">
      <div className="page-header">
        <div>
          <h1>Tasks</h1>
          <p>Manage your tasks</p>
        </div>

        <button
          type="button"
          className="primary-button add-task-button"
          onClick={() => navigate("/tasks/add")}
        >
          Add Task
        </button>
      </div>

      <div className="filter-container">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="">All Status</option>
          <option value="PENDING">PENDING</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>

        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value)}>
          <option value="">All Priority</option>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>

        <button type="button" className="primary-button" onClick={handleSearch}>
          Search
        </button>

        <button
          type="button"
          className="secondary-button"
          onClick={handleClearFilters}
        >
          Clear
        </button>
      </div>

      <div className="task-grid">
        <DataGrid
          rows={tasks}
          columns={columns}
          getRowId={(row) => row.id}
          loading={loading}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
                page: 0,
              },
            },
          }}
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default TasksList;
