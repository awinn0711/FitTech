import React, { useEffect, useState } from 'react';

//just testing to see if I can create a webpage
export default function AddRecipe() {

    const [name, setName] = useState ("");
    const [description, setDescription] = useState("");
    const [ingredientsList, setIngredientsList] = useState([]);
    const [ingredientInput, setIngredientInput] = useState("");
    //const [loading, setLoading] = useState(true);

    const handleIngredientChange = (e) => {
        setIngredientInput(e.target.value);
    };

    //handler checks if ingredientInput is empty, and if it isn't, adds the current value of ingredientInput to the ingredientsList array
    const handleAddIngredient = () => {
        if (ingredientInput !== "") {
            setIngredientsList([...ingredientsList, ingredientInput]);
            setIngredientInput("");
        }
    };

    const handleSaveRecipe = () => {
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
        })
        .catch(error => {
            console.error('Error saving recipe:', error.message);
        });
    };

    return (
        <div>
            <h2>Add Recipe</h2>
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
//    async function fetchData() {
//        let response = await fetch("http://localhost:8080/api/recipes");
//        let data = await response.json().then( data => {
//
//            // Setting React State From Retrieved Data
//            setLoading(false);
//            setName(data[0].name);
//        });
//    };
//
//    // Everything here is executed on page load
//    useEffect(() => {
//        fetchData();
//        // After data is retrieved, we can read it from the React State here
//    }, []);
//
//    if (loading) {
//        return (
//            <p>loading...</p>
//        )
//    } else {
//        return (
//            <p>{name}</p>
//        )
//    }

// functional code I will start to integrate later

//  return (
//    <form>
//        <label>Enter food name:
//            <input
//                type="text"
//                value={name}
//                onChange={(e) => setName(e.target.value)}
//            />
//        </label>
//    </form>
//  )

//  return (
//    <div>
//      <h2>Add Recipe</h2>
//      <form onSubmit={handleSubmit}>
//        <div>
//          <label>Name:
//            <input type="text" value="testing testing testing" />
//          </label>
//        </div>
//        <div>
//          <label>Description:</label>
//          <textarea
//            value={description}
//          />
//        </div>
//        <button type="submit">Add Recipe</button>
//      </form>
//    </div>
//  );

//////////////////////IT IS WORKING AT THIS POINT