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

    const units = [" ", "oz", "lbs", "cup", "serving"];

    const handleIngredientChange = (e) => {
        setIngredientInput(e.target.value);
    };

    const handleAddIngredient = () => {
        if((ingrAmount < .1) || (ingrAmount < .5 && ingrUnit == "oz") || (ingrAmount <.5 && ingrAmount == "serving")) {
            setErrorMessage("Ingredient amount is too small to measure nutrition facts. Please increase amount or ignore this ingredient.")
            setIngrAmount(0);
            return;
        }
        if (ingredientInput !== "") {
            setErrorMessage("");
            let newIngredient = `${ingrAmount} ${ingrUnit} ${ingredientInput}`;
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
            }, 3000);
        })
        .catch(error => {
            console.error('Error saving recipe:', error.message);
            setErrorMessage("Error saving recipe. Please try again later.");
        });
    };

    return (
        <div>
            <form>
                <div className="card" style={{ width: '28rem', backgroundColor: '#17a2b8', margin: 'auto' }}>
                    <div className="card-header"><h2 style={{ color: 'white' }}>Add Recipe</h2></div>
                    <div className="card-body">
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                        <label style={{ color: 'white' }}>
                            Recipe Name:
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
                        </label>
                        <br />
                        <label style={{ color: 'white' }}>
                            Description:
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" />
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
                                        <tr key={index}>
                                            <td>{ingredient}</td>
                                            <td><Button variant='outline-danger' size='sm' onClick={() => handleRemoveItem(ingredient)}>Remove</Button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>}

                        <label style={{ color: 'white' }}>
                            Amount:
                            <input type='number' value={ingrAmount} onChange={(e) => setIngrAmount(e.target.value)} className="form-control" />
                        </label>
                        <br />
                        <label style={{ color: 'white' }}>
                            Units:
                            <select onChange={(e) => setIngrUnit(e.target.value)} className="form-control">
                                {units.map((unit, index) => (
                                    <option key={index} value={unit}>{unit}</option>
                                ))}
                            </select>
                        </label>
                        <br />
                        <label style={{ color: 'white' }}>
                            Ingredient:
                            <input type="text" value={ingredientInput} onChange={handleIngredientChange} className="form-control" />
                        </label>
                        <br />
                        <Button variant='primary' onClick={handleAddIngredient}>Add Ingredient</Button>
                        <br />
                        <Button variant='success' onClick={handleSaveRecipe}>Save Recipe</Button>
                    </div>
                </div>
            </form>
        </div>

    );
}