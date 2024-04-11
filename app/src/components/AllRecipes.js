import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AllRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/recipes/all');
            const data = await response.json();
            setRecipes(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const deleteRecipe = async (recipeId) => {
        try {
            await axios.delete(`http://localhost:8080/api/recipes/${recipeId}`);
            setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    const recipeList = recipes.map((recipe) => (
        <li key={recipe.id}>
            {recipe.name}
            <button onClick={() => deleteRecipe(recipe.id)}>Delete</button>
        </li>
    ));

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <ul>{recipeList}</ul>
        </div>
    );
}
