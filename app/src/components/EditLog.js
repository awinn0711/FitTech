import React, { useEffect, useState } from 'react';


export default function EditLog() {

    const [recipes, setRecipes] = useState([]);
    const [recipesToAdd, setRecipesToAdd] = useState([]);
    const [loading, setLoading] = useState(false);

    async function loadRecipes() {
        let response = await fetch('http://localhost:8080/api/recipes/all');
        let data = await response.json()
        .then(data => {
            setRecipes(data);
            setLoading(false);
        });
    };

    const handleAddRecipeToList = (selection) => {
         setRecipesToAdd([...recipesToAdd, selection])
    }

    useEffect(() => {
        setLoading(true);
        loadRecipes();
        console.log("recipesToAdd: ", recipesToAdd);
    }, []);

    if(loading) {
        return <p>loading...</p>
    }

    return (
        <div>
            <h2>Add Meal to Today's Log</h2>
            <ul>{recipesToAdd.map((selection) => (
                <li key={selection.id}>{selection.name}</li>
            ))}</ul>
            <label for="recipes">Choose a recipe:</label>
                <select name="recipes" onChange={handleAddRecipeToList}>{
                    recipes.map((recipe) => (
                        <option key={recipe.id} value={recipe.id}>{recipe.name}</option>
                    ))
                }
                </select>
        </div>
    );
}