import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

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
            await axios.delete("http://localhost:8080/api/recipes/" + recipeId);
            setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
        } catch (error) {
            console.error('Error deleting recipe:', error);
            window.alert('Cannot delete recipe as it would alter calorie count for previous days.')
        }

    };

    const recipeList = 
       
       <Table bordered hover responsive>
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Ingredients</th>
            <th>Calories</th>
            <th>Delete Recipe</th>
        </tr>
        <tbody>
            {recipes.map((recipe) => (
                <tr key={recipe.id}>
                    <td>{recipe.name}</td>
                    <td>{recipe.description}</td>
                    <td>{recipe.ingr.map((ingr) => (<>{ingr}, </>))}</td>
                    <td>{recipe.calories}</td>
                    <Button variant='outline-primary' size='sm' as={Link} to={`../editrecipe/${recipe.id}`}>Edit</Button>
                    <Button variant='outline-danger' size='sm' onClick={() => deleteRecipe(recipe.id)}>Delete</Button>
                </tr>
            ))}
        </tbody>
       </Table>
    ;

    if (loading) {
        return (
        <div>
            <p>Loading...</p>
            <Spinner animation='border'></Spinner>
        </div>
        )
    };
        return (
        <div>
            <ul>{recipeList}</ul>
        </div>
    );
}
