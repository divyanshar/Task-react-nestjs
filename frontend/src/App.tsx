import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import TasksList from "./pages/tasks/TasksList";
import AddTask from "./pages/tasks/AddTask";
import EditTask from "./pages/tasks/EditTask";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/common/ProtectedRoute";
function App() {
  const token = localStorage.getItem('accessToken');
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={token?(<Navigate to="/dashboard" replace/>):(<Login />)} />
        <Route path="/signup" element={token?(<Navigate to="/dashboard" replace/>):(<Signup />)} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<TasksList />} />
            <Route path="/tasks/add" element={<AddTask />} />
            <Route path="/tasks/edit/:id" element={<EditTask />} />
          </Route>
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
