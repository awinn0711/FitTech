import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import EditLog from './EditLog';
import DisplayDailyMeals from './DisplayDailyMeals';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import WeightInfo from '../WeightComponents/WeightInfo';
import AddIngredientToLog from './AddIngredientToLog';
import CalorieCounter from './CalorieCounter';

//useState updates as it renders
export default function DailyLog() {
    const [dailyLog, setDailyLog] = useState ({});
    const [loading, setLoading] = useState(false); //conditional rendering
    const [date, setDate] = useState(null);
    const [todaysRecipes, setTodaysRecipes] = useState([]);
    const [todaysIngredients, setTodaysIngredients] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [rendered, setRendered] = useState(false);
    const { user, isAuthenticated, isLoading } = useAuth0();


    async function fetchData() {
        if(isLoading) {
            const timer = setTimeout(() => {
            }, 1000);
            return () => clearTimeout(timer);
        }
        let response = await fetch('http://localhost:8080/api/dailylog/' + user.email); //await returns promise to allow to receive data "after the fact". fetch url for controller you receiving data from
        let data = await response.json() //convert response to json
        .then( data => {
            setDailyLog(data);
            let todaysDate = data.date.date;
            setDate(todaysDate);
            let recipeList = data.recipes;
            setTodaysRecipes(recipeList);
            let ingredients = data.ingredients;
            setTodaysIngredients(ingredients);
            setLoading(false);
            console.log("today's log: ", data);
        });
    };

    useEffect(() => {
        setLoading(true);
        fetchData();
        const timer = setTimeout(() => {
            setRendered(true);
        }, 1200);
        return () => clearTimeout(timer);
    }, [rendered]);

    async function removeRecipeFromLog(recipeId) {
            try {
                await fetch('http://localhost:8080/api/dailylog/' + user.email + '/removeRecipeFromLog/' +recipeId, {
                    method: 'DELETE',
                });
                fetchData();
            } catch (error) {
                console.error('Error removing meal:', error);
            }
        }

        async function removeIngredientFromLog(ingredientId) {
            try {
                await fetch('http://localhost:8080/api/dailylog/' + user.email + '/removeIngredientFromLog/' + ingredientId, {
                    method: 'DELETE',
                });
                fetchData();
            } catch (error) {
                console.error('Error removing ingredient:', error);
            }
        }

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
                <h1 id ='date'>{date}</h1>
                {(todaysIngredients && todaysRecipes) && 
                <h1 className='text-align-center'>Today's Calories: <CalorieCounter todaysRecipes={todaysRecipes} todaysIngredients={todaysIngredients} /></h1>}
                <Container>
                    <Row>
                        <Col>
                            <Card style={{ width: '28rem' }} bg='info'>
                                <Card.Header as="h2">Log Food</Card.Header>
                                <Card.Body>
                            <       AddIngredientToLog setRendered={setRendered} />             
                                    <br></br><EditLog setRefresh = {setRefresh} setRendered = {setRendered} />   
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: '28rem' }} bg='info'>
                                <Card.Header as="h2">Today's Meals</Card.Header>
                                <Card.Body>
                                {(rendered && todaysRecipes && todaysIngredients) && <DisplayDailyMeals todaysIngredients={todaysIngredients} todaysRecipes={todaysRecipes} removeRecipeFromLog={removeRecipeFromLog} removeIngredientFromLog={removeIngredientFromLog}/>} 
                                </Card.Body>
                             </Card>
                        </Col>
                    </Row><br></br>
                    <Row>
                        <Col>
                            <Card style={{ width: '28rem' }} bg='info'>
                                <Card.Body>
                                    <WeightInfo />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container> 
            </div>
        )
};