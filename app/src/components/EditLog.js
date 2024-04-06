import React, { useEffect, useState } from 'react';
import { json } from 'react-router-dom';


export default function EditLog() {

    const [recipes, setRecipes] = useState([]);
    const [recipeToAdd, setRecipeToAdd] = useState({});
    const [loading, setLoading] = useState(false);

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
        fetch('http://localhost:8080/api/dailylog/edit', {
            method: 'PUT',
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
                <button type='button' onClick={handleAddRecipeToLog}>Add {recipeToAdd.name} to today's log</button>
            </form>
        </div>
    );
};