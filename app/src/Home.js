import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import DailyLog from './components/DailyLogComponents/DailyLog.js'
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const Home = () => {

const { user, isAuthenticated, isLoading } = useAuth0();

  if (!isAuthenticated) {
    return <div><authLogin /> </div>;
  }

  return (
    <div>
      <h1>Welcome, User</h1>
        <p><Link to="dailylog"><Button variant="primary">View Today's Log</Button></Link></p>
        <p><Link to="recipes"><Button variant="primary">Add a Recipe</Button></Link></p>
        <p><Link to="allrecipes"><Button variant="primary">View All Recipes</Button></Link></p>
    </div>
  );
}

export default Home;