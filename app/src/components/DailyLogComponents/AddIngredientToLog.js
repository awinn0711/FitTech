import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Button from 'react-bootstrap/Button';

export default function AddIngredientToLog({setRendered}) {

    const [loading, setLoading] = useState(false);
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [ingrAmount, setIngrAmount] = useState(0);
    const [ingrUnit, setIngrUnit] = useState("");
    const [ingredientInput, setIngredientInput] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const units = [" ", "oz", "lbs", "cup", "serving"];

    const handleIngredientChange = (e) => {
        setIngredientInput(e.target.value);
        
    };

    async function postIngredientData() {
        const ingrData = {
            name: `${ingrAmount} ${ingrUnit} ${ingredientInput}` ,
            category: "",
            calories: 0
        };
        console.log(ingrData);

        fetch("http://localhost:8080/api/dailylog/" + user.email + "/addIngredientToLog", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ingrData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to save ingredient');
            }
            console.log('Ingredient added successfully');
            setErrorMessage("");
        })
        .catch(error => {
            console.error('Error saving ingredient:', error.message);
            setErrorMessage("Error saving ingredient. Please try again later.");
        });
    };

    const handleSaveIngredient = () => {
        if((ingrAmount < .1) || (ingrAmount < .5 && ingrUnit == "oz") || (ingrAmount <.5 && ingrAmount == "serving")) {
            setErrorMessage("Ingredient amount is too small to measure nutrition facts. Please increase amount or ignore this ingredient.")
            setIngrAmount(0);
            return;
        }
        if (ingredientInput !== "") {
            setErrorMessage("");
        }
        
        postIngredientData();
        setRendered(false);
    };


    if(loading) {
        return <p>loading...</p>
    }

    return (
        <div>
            <p>Enter a measurable food, i.e. 2 eggs, 1 cup rice, etc.</p>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form>
            <input type='number' value={ingrAmount} onChange={(e) => setIngrAmount(e.target.value)}/>
                    <select onChange={(e) => setIngrUnit(e.target.value)}>
                        {units.map((unit, index) => (
                            <option key={index} value={unit}>{unit}</option>
                        ))}
                    </select>
                    <input type="text" value={ingredientInput} onChange={handleIngredientChange} />
                    <Button variant='success' onClick={handleSaveIngredient}>Add To Today's Log</Button>
            </form>
        </div>
    )
}
