import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

export default function DisplayDailyMeals({todaysRecipes, removeRecipeFromLog}) {

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
            </ul>
        </div>
    );
}