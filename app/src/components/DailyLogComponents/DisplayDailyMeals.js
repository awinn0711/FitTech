import React, { useEffect, useState } from 'react';


export default function DisplayDailyMeals({todaysRecipes}) {

return (
    <div>
        <ul>{todaysRecipes.map((recipe) => (
            <li>{recipe.name}</li>
        ))}</ul>

    </div>
)
}