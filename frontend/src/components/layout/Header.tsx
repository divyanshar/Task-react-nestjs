import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <header className="header">
      <h1>Smart Work Tracker</h1>
      <button type="button" className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default Header;
