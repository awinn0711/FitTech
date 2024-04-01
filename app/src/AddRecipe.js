import React, { useEffect, useState } from 'react';

//just testing to see if I can create a webpage
export default function AddRecipe() {

    const [name, setName] = useState ("It's a me, Namio!");
    const [loading, setLoading] = useState(true);

    async function fetchData() {
        let response = await fetch("http://localhost:8080/api/recipes");
        let data = await response.json().then( data => {

            // Setting React State From Retrieved Data
            setLoading(false);
            setName(data[0].name);
        });
    };

    // Everything here is executed on page load
    useEffect(() => {
        fetchData();
        // After data is retrieved, we can read it from the React State here
    }, []);

    if (loading) {
        return (
            <p>loading...</p>
        )
    } else {
        return (
            <p>{name}</p>
        )
    }
}

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
