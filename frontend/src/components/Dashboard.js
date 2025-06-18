import React from 'react';
import NoteForm from './NoteForm';
import { Link } from 'react-router-dom';

const Dashboard = ({ onLogout }) => {
  const username = localStorage.getItem("username");

  return (
    <div>
      <h2 className='text-center mt-4'>Welcome, {username || "User"}!</h2>
      <h6 className='text-center mt-4'>DON'T GIVE UP, JUST BE PERSISTENT KEEP IT UP!
      </h6>
      <Link to="/summarize">
      <button className="btn btn-primary w-100">Go to Summarizer</button>
      </Link>
    </div>
  );
};

export default Dashboard;
