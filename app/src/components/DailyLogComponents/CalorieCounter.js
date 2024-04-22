import React, { useEffect, useState } from 'react';

export default function CalorieCounter({todaysRecipes, todaysIngredients}) {

    const [calories, setCalories] = useState(0);


    useEffect(() => {
        // for(let i = 0; i < todaysRecipes.length; i++) {
        //     setCalories(calories + (todaysRecipes[i].calories));
        // }
    
        // for(let i = 0; i < todaysIngredients.length; i++) {
        //     setCalories(calories + (todaysIngredients[i].calories));
        // }
        let counter = 0;
        todaysIngredients.map((ingredient) => {
            counter = (counter + ingredient.calories)
        });
        todaysRecipes.map((recipe) => {
            counter = (counter + recipe.calories)
        });
        setCalories(counter);
    }, [todaysIngredients, todaysRecipes]);
    


    return(
        <div>
            <h1>Calories: {calories}</h1>
        </div>
    )

}