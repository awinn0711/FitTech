import React, { useEffect, useState } from 'react';

export default function AllRecipes() {

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
            setLoading(true);
    
            fetch('http://localhost:8080/api/recipes/all')
              .then(response => response.json())
              .then(data => {setRecipes(data);
                             setLoading(false);
              })
              .catch(error => console.error('Error fetching data:', error));
          }, []);

    const recipeList = recipes.map((recipe) => (
        <li key={recipe.id}>{recipe.name}</li>
    ));

if(loading) {
    return <p>loading...</p>
}
return (
    <div>
        <ul>{recipeList}</ul>
    </div>
);
};