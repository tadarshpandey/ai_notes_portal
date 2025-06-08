import React from 'react';

const Dashboard = ({ onLogout }) => {
  const username = localStorage.getItem("username");

  return (
    <div>
      <h2>Welcome, {username || "User"}!</h2>
      <h6>here's this is the website for AI notes summarizer, better use for students to ready documents, notes pdfs,
        and more to make easier their studies and all...
      </h6>
    </div>
  );
};

export default Dashboard;
