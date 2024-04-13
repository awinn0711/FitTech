import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
   return (
       <div>
         <h1>Welcome, {} </h1>
           <p><Link to="dailylog"><Button variant="primary">View Today's Log</Button></Link></p>
           <p><Link to="recipes"><Button variant="primary">Add a Recipe</Button></Link></p>
           <p><Link to="allrecipes"><Button variant="primary">View All Recipes</Button></Link></p>
       </div>
     );
   }


export default Navbar;
