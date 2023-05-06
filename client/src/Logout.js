// Logout.js
import React from "react";
import { auth } from "./firebaseConfig";
import { Link } from "react-router-dom"; // Import the Link component

const Logout = () => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    // Use the Link component and apply the quiz-cta-btn class to the Logout button
    <Link to="#" className="quiz-cta-btn" onClick={handleLogout}>
      Logout
    </Link>
  );
};

export default Logout;
