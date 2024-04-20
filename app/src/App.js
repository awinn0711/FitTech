import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import AddRecipe from './components/AddRecipe';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthLogin from './components/authLogin';
import AuthProfile from './components/authProfile';
import AuthLogout from './components/authLogout';
import DailyLog from './components/DailyLogComponents/DailyLog';
import AllRecipes from './components/AllRecipes';
import EditRecipe from './components/EditRecipe'


const baseUrl = process.env.REACT_APP_BASEURL;

const App = () => {
  return (
    <Router>
      <div className='container'>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/dailylog" element={<DailyLog />}/>
        <Route exact path="/recipes" element={<AddRecipe />} />
        <Route exact path="allrecipes" element={<AllRecipes />}/>
        <Route exact path="/login" element={<AuthLogin />} />
        <Route exact path="/profile" element={<AuthProfile />} />
        <Route exact path="/logout" element={<AuthLogout />} />
        <Route path="/editrecipe/:recipeId" element={<EditRecipe />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
