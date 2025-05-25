import { useState } from "react";
// import { checkAuth } from "../../http/userApi";
import "./styles.scss";
import useCurrentUser from "../../hooks/useCurrentUser";

const UserPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { currentUser, setCurrentUser } = useCurrentUser();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    // setError("You have been logged out");
  };

  // if (loading) {
  //   return <div className="loading">Loading user data...</div>;
  // }

  // if (error) {
  //   return <div className="error">Please try logging in again</div>;
  // }

  if (!currentUser) {
    return (
      <div className="auth-message">
        <p>Please log in to view your profile</p>
        <a href="/login">Go to login page</a>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <div className="profile-info">
        <p>
          <strong>Name:</strong> {currentUser.name || "Not specified"}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email || "Not specified"}
        </p>
        <p>
          <strong>User role:</strong> {currentUser.role || "Not specified"}
        </p>
      </div>
      <button onClick={handleLogout} className="logout-button">
        Log Out
      </button>
    </div>
  );
};

export default UserPage;
