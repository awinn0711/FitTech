import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { json } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


export default function EditLog( {setRefresh, setRendered} ) {

    const [recipes, setRecipes] = useState([]);
    const [recipeToAdd, setRecipeToAdd] = useState({});
    const [loading, setLoading] = useState(false);
    const { user, isAuthenticated, isLoading } = useAuth0();


    async function loadRecipes() {
        let response = await fetch('http://localhost:8080/api/recipes/all');
        let data = await response.json()
        .then(data => {
            setRecipes(data);
            setLoading(false);
        });
    };

    const handleSelectRecipe = (event) => {
        console.log("selected recipe", event.target.value);
        setRecipeToAdd(JSON.parse(event.target.value));
    }

    const handleAddRecipeToLog = () => {
        fetch(`http://localhost:8080/api/dailylog/${user.email}/addRecipeToLog`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipeToAdd),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add meal');
            }
            console.log('Meal added successfully');
        })
        .catch(error => {
            console.error('Error adding meal to log:', error.message);
        });
        setRendered(false);
        setRefresh(Math.random());
    };
    

    useEffect(() => {
        setLoading(true);
        loadRecipes();
        console.log("recipeToAdd: ", recipeToAdd);
    }, [recipeToAdd]);

    if(loading) {
        return <p>loading...</p>
    }

    return (
        <div>
            <h2>Add Meal to Today's Log</h2>
            <form>
            <label htmlFor="recipes">Choose a recipe:</label>
                <select id="recipes" onChange={handleSelectRecipe}>
                    <option value={null}>Saved Recipes</option>
                    {recipes.map((recipe) => (
                        <option key={recipe.id} value={JSON.stringify(recipe)}>{recipe.name}</option>
                    ))
                }
                </select>
                <Button variant='success' onClick={handleAddRecipeToLog}>Add {recipeToAdd.name} to today's log</Button>
            </form>
        </div>
    );
};