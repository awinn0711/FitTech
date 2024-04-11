import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
// import { Button, Container } from 'reactstrap';
import DailyLog from './/components/DailyLog.js'


const Home = () => {
  return (
    <div>
      <h1>Welcome, User</h1>
        <Link to="dailylog">View Today's Log</Link><br></br>
        <Link to="recipes">Add a Recipe</Link><br></br>
        <Link to="allrecipes">View All Recipes</Link>
    </div>
  );
}

export default Home;