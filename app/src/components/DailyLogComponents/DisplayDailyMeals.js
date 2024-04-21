import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

export default function DisplayDailyMeals({todaysIngredients, todaysRecipes, removeRecipeFromLog}) {

    return (
        <div>
            <ul>
                {todaysRecipes.map((recipe) => (
                    <li key={recipe.id}>
                        {recipe.name}
                        <Button variant="danger" onClick={() => removeRecipeFromLog(recipe.id)}>
                            Remove
                        </Button>
                    </li>
                ))}
                {todaysIngredients.map((ingredient) => (
                    <li key={ingredient.id}>
                        {ingredient.name}
                        <Button variant="danger" >
                            Remove
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}