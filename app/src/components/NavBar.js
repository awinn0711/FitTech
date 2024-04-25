import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
//import Navbar from 'react-bootstrap/Navbar';
//import Nav from 'react-bootstrap/Nav';


const Navbar = () => {
const { user, isAuthenticated, isLoading } = useAuth0();
   return (


       <div className="NavBar">
                <h1>Welcome to Fit-Tech</h1>
                <p><Link to="/">Home</Link></p>
                  <p><Link to="dailylog">View Today's Log</Link></p>
                  <p><Link to="loghistory">View History</Link></p>
                  <p><Link to="recipes">Add a Recipe</Link></p>
                  <p><Link to="allrecipes">View All Recipes</Link></p>
                   <p><Link to="profile">View Profile</Link></p>
                   <p><Link to="logout">LogOut</Link></p>
                  <p><Link to="feedback">Feedback</Link></p>
              </div>


   )
}


export default Navbar;