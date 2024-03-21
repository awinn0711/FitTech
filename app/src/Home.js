import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import DailyLog from './/components/DailyLog.js'

const Home = () => {
  return (
    <div>
        <DailyLog />

    </div>
  );
}

export default Home;