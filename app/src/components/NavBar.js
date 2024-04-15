import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
//import Navbar from 'react-bootstrap/Navbar';
//import Nav from 'react-bootstrap/Nav';


const Navbar = () => {
   return (
//   <nav className="nav">
//    <a href="/" className="site-title">Fit-Tech </a>
//    <ul>
//       <li>
//        <href='/dailylog'>Today's Log</a>
//        </li>
//        <li>
//        <href="/recipes">Add A Recipe</a>
//        </li>
//        <li>
//        <href="/allrecipes">View All Recipes</a>
//         </li>
//       </ul>
//       </nav>

       <div>
         <h1>Welcome to Fit-Tech </h1>
           <p><Link to="dailylog">View Today Log</Link></p>
           <p><Link to="recipes">Add a Recipe</Link></p>
           <p><Link to="allrecipes">View All Recipes</Link></p>
            <p><Link to="profile">View Profile</Link></p>
       </div>
     );
   }


export default Navbar;
