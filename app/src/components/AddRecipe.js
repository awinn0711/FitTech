import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useAuth0 } from "@auth0/auth0-react";



export default function AddRecipe() {
    const { user, isAuthenticated, isLoading } = useAuth0();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [ingredientsList, setIngredientsList] = useState([]);
    const [ingrAmount, setIngrAmount] = useState(0);
    const [ingrUnit, setIngrUnit] = useState("");
    const [ingredientInput, setIngredientInput] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); // New state for success message

    const handleIngredientChange = (e) => {
        setIngredientInput(e.target.value);
    };

    const handleAddIngredient = () => {
        if (ingredientInput !== "") {
            let newIngredient = `${ingrAmount} ${ingrUnit} ${ingredientInput}`
            setIngredientsList([...ingredientsList, newIngredient]);
            setIngredientInput("");
        }
    };

    const handleRemoveItem = target => {
        setIngredientsList(ingredientsList.filter(ingredient => ingredient !== target))
    }

    const handleSaveRecipe = () => {
        if (name.trim() === "" || description.trim() === "" || ingredientsList.length === 0) {
            setErrorMessage('Please fill in all fields before saving the recipe');
            return;
        }

        const recipeData = {
            name: name,
            description: description,
            ingr: ingredientsList,
            userEmail: user.email
        };
        console.log(recipeData);

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
                    {(ingredientsList.length > 0) && 
                        <Table>
                            <thead>
                                <tr>
                                <th>Ingredients</th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {ingredientsList.map((ingredient, index) => (
                                <tr key={index}><td>{ingredient}</td>
                                    <td><Button variant='outline-danger' size='sm' onClick={() => handleRemoveItem(ingredient)}>Remove</Button></td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>}
                        
                <label>
                    <input type='number' value={ingrAmount} onChange={(e) => setIngrAmount(e.target.value)} />
                    <select onChange={(e) => setIngrUnit(e.target.value)}>
                        <option value=" "> </option>
                        <option value="grams">grams</option>
                        <option value="oz">oz</option>
                        <option value="lbs">lbs</option>
                        <option value="serving">serving</option>
                    </select>
                    <input type="text" value={ingredientInput} onChange={handleIngredientChange} />
                    <Button variant='primary' onClick={handleAddIngredient}>Add Ingredient</Button>
                </label>
                <br />
                <p><Button variant='success' onClick={handleSaveRecipe}>Save Recipe</Button></p>
            </form>
        </div>
    );
}