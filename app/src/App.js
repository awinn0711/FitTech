import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import AddRecipe from './components/AddRecipe';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthLogin from './components/AuthLogin';
import AuthProfile from './components/AuthProfile';
import AuthLogout from './components/AuthLogout';
import DailyLog from './components/DailyLogComponents/DailyLog';
import AllRecipes from './components/AllRecipes';
import EditRecipe from './components/EditRecipe'
import NavBar from './components/NavBar.js'
import Feedback from './components/Feedback.js'
import background from './background/AppHomePage.png'
import { useAuth0 } from "@auth0/auth0-react";
import LogHistory from './components/DailyLogComponents/LogHistory.js';


const baseUrl = process.env.REACT_APP_BASEURL;



const App = () => {
const { user, isAuthenticated, isLoading } = useAuth0();
  if (!isAuthenticated) {
    return <div><AuthLogin /> </div>;
  }
  return (
    <Router>

        <NavBar />
      <div style={{ backgroundImage:`url(${background})`,backgroundRepeat:"no-repeat",backgroundSize:"cover", width: "100vw", height: "100vw"}}className='container'>

      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/dailylog" element={<DailyLog />}/>
        <Route exact path="/recipes" element={<AddRecipe />} />
        <Route exact path="allrecipes" element={<AllRecipes />}/>
        <Route exact path="/login" element={<AuthLogin />} />
        <Route exact path="/profile" element={<AuthProfile />} />
        <Route exact path="/logout" element={<AuthLogout />} />
        <Route path="/editrecipe/:recipeId" element={<EditRecipe />} />
        <Route exact path="/feedback" element={<Feedback />} />
        <Route path="/loghistory" element={<LogHistory />} />
       </Routes>
      </div>

    </Router>
  );
}

export default App;