import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from './components/NavBar.js'



const Home = () => {

const { user, isAuthenticated, isLoading } = useAuth0();

  if (!isAuthenticated) {
    return <div><authLogin /> </div>;
  }


  return (
    <div>
      <h1>Welcome to Fit-Tech, {user.name}</h1>


    </div>
  );
}

export default Home;