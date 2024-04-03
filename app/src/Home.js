import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
// import { Button, Container } from 'reactstrap';
import DailyLog from './/components/DailyLog.js'

const Home = () => {
  return (
    <div>
      <h1>Welcome, User</h1>
        <DailyLog />

    </div>
  );
}

export default Home;