import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import { getTasks } from "../services/taskService";
import type { Task } from "../types/task";
const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch dashboard tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((task) => task.status === "PENDING").length;

  const completedTasks = tasks.filter(
    (task) => task.status === "COMPLETED",
  ).length;

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "HIGH",
  ).length;

  if (loading) {
    return <div className="loading-message">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Here's an overview of your tasks.</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard title="All Tasks" value={totalTasks} description="Total tasks"/>
        <StatCard title="Pending Tasks" value={pendingTasks} description="Tasks waiting to be completed"/>
        <StatCard title="Completed Tasks" value={completedTasks} description="Tasks completed"/>
        <StatCard title="High Priority" value={highPriorityTasks} description="High priority tasks"/>
      </div>
    </div>
  );
};

export default Dashboard;
