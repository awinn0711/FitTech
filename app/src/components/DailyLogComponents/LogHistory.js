import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import CalorieCounter from './CalorieCounter';
import Table from 'react-bootstrap/esm/Table';
import Spinner from 'react-bootstrap/esm/Spinner';

export default function LogHistory() {

    const { user, isAuthenticated, isLoading } = useAuth0();
    const [loading, setLoading] = useState(false);
    const [logs, setLogs] = useState([]);

    async function fetchLogs() {
        if(isLoading) {
            const timer = setTimeout(() => {
            }, 1000);
            return () => clearTimeout(timer);
        }
        let response = await fetch('http://localhost:8080/api/dailylog/' + user.email + '/getall'); 
        let data = await response.json() 
        .then( data => {
            setLogs(data);
            setLoading(false);
        });
    };


    useEffect(() => {
        setLoading(true);
        fetchLogs();
    },[]);

    function mealList(recipes, ingredients) {
        const meals = [];

        recipes.map((recipe) => {
            meals.push(recipe.name);
        });
        ingredients.map((ingredient) => {
            meals.push(ingredient.name);
        });
        return meals;
    }

    const logList = 
       
       <Table bordered hover responsive>
        <tr>
            <th>Date</th>
            <th>Calories</th>
            <th>Meals</th>
        </tr>
        <tbody>
            {logs.map((log) => (
                <tr key={log.id}>
                    <td>{log.date.date}</td>
                    <td><CalorieCounter todaysIngredients={log.ingredients} todaysRecipes={log.recipes}/></td>
                    <td>{mealList(log.recipes, log.ingredients).map((meal) => (<>{meal}, </>))}</td>
                </tr>
            ))}
        </tbody>
       </Table>
    ;


    if(loading || isLoading) {
        return (
        <div>
        <p>Loading...</p>
        <Spinner animation='border'></Spinner>
        </div>
        )
    } 

    return (
        <div>
            <h1>{user.name}'s Log History</h1>
            {logList}
        </div>
    )



};
    
