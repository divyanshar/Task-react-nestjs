import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <button
        type="button"
        className="sidebar-item"
        onClick={() => navigate('/dashboard')}
      >
        Dashboard
      </button>

      <button
        type="button"
        className="sidebar-item"
        onClick={() => navigate('/tasks')}
      >
        Tasks
      </button>
    </aside>
  );
};

export default Sidebar;