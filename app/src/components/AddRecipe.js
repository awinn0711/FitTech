import React, { useState } from 'react';

export default function AddRecipe() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [ingredientsList, setIngredientsList] = useState([]);
    const [ingredientInput, setIngredientInput] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); // New state for success message

    const handleIngredientChange = (e) => {
        setIngredientInput(e.target.value);
    };

    const handleAddIngredient = () => {
        if (ingredientInput !== "") {
            setIngredientsList([...ingredientsList, ingredientInput]);
            setIngredientInput("");
        }
    };

    const handleSaveRecipe = () => {
        if (name.trim() === "" || description.trim() === "" || ingredientsList.length === 0) {
            setErrorMessage('Please fill in all fields before saving the recipe');
            return;
        }

        const recipeData = {
            name: name,
            description: description,
            ingredientsList: ingredientsList
        };

        fetch('http://localhost:8080/api/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipeData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to save recipe');
            }
            console.log('Recipe saved successfully');
            setName("");
            setDescription("");
            setIngredientsList([]);
            setErrorMessage("");
            setSuccessMessage("Recipe saved successfully!");
            setTimeout(() => {
                setSuccessMessage("");
            }, 3000); //might remove timeout? not sure yet
        })
        .catch(error => {
            console.error('Error saving recipe:', error.message);
            setErrorMessage("Error saving recipe. Please try again later.");
        });
    };

    return (
        <div>
            <h2>Add Recipe</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <form>
                <label>
                    Recipe Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <br />
                <label>
                    Description:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <br />
                <label>
                    Ingredients:
                    <ul>
                        {ingredientsList.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <input type="text" value={ingredientInput} onChange={handleIngredientChange} />
                    <button type="button" onClick={handleAddIngredient}>Add Ingredient</button>
                </label>
                <br />
                <button type="button" onClick={handleSaveRecipe}>Save Recipe</button>
            </form>
        </div>
    );
}