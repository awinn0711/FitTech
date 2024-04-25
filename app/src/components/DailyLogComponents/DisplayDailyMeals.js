import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import CalorieCounter from './CalorieCounter';

export default function DisplayDailyMeals({todaysIngredients, todaysRecipes, removeRecipeFromLog, removeIngredientFromLog}) {


    return (
        <div>
            <ul>
                {todaysRecipes.map((recipe) => (
                    <li key={recipe.id}>
                        {recipe.name}
                        <>({recipe.calories} calories)</>
                        <Button size='sm' variant="danger" onClick={() => removeRecipeFromLog(recipe.id)}>
                            Remove
                        </Button>
                    </li>
                ))}
                {todaysIngredients.map((ingredient) => (
                    <li key={ingredient.id}>
                        {ingredient.name}
                        <>({ingredient.calories} calories)</>
                        <Button size='sm' variant="danger" onClick={() => removeIngredientFromLog(ingredient.id)}>
                            Remove
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}