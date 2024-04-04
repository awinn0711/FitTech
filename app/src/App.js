import React from 'react';
import './App.css';
import Home from './Home';
import AddRecipe from './AddRecipe';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthLogin from './components/authLogin';
import AuthProfile from './components/authProfile';
import AuthLogout from './components/authLogout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/recipes" element={<AddRecipe />} />
        <Route exact path="/login" element={<AuthLogin />} />
        <Route exact path="/profile" element={<AuthProfile />} />
        <Route exact path="/logout" element={<AuthLogout />} />
      </Routes>
    </Router>
  );
}

export default App;
