import React from 'react';
import './App.css';
import Home from './Home';
import AddRecipe from './AddRecipe';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const baseUrl = process.env.REACT_APP_BASEURL;


const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/recipes" element={<AddRecipe />} />
      </Routes>
    </Router>
  )
}

export default App;
