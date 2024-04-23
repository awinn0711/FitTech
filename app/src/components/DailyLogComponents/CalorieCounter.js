import React, { useEffect, useState } from 'react';

export default function CalorieCounter({todaysRecipes, todaysIngredients}) {

    const [calories, setCalories] = useState(0);


    useEffect(() => {
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
        <>{calories}</>
    )

}