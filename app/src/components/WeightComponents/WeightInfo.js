import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import UpdateCurrentWeight from './UpdateCurrentWeight';
import UpdateWeightGoal from './UpdateWeightGoal';

export default function WeightInfo() {
    const[currentWeight, setCurrentWeight] = useState(null);
    const[weightGoal, setWeightGoal] = useState(null);
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, []);

    async function fetchData() {
        if(isLoading) {
            const timer = setTimeout(() => {
            }, 1000);
            return () => clearTimeout(timer);
        }
        let response = await fetch(`http://localhost:8080/api/weightinfo/${user.email}`); 
        let data = await response.json() //convert response to json
        .then( data => {
            let currentWeight = data.currentWeight;
            setCurrentWeight(currentWeight);
            let weightGoal = data.weightGoal;
            setWeightGoal(weightGoal);
            console.log("weight info: ", data);
            setLoading(false); 
        });
    };

    if(loading || isLoading) {
        return (
        <div>
        <p>Loading...</p>
        <Spinner animation='border'></Spinner>
        </div>
        )
    } 

    return(
        <div>
            <h2>Your current weight: {currentWeight}</h2>
            <UpdateCurrentWeight currentWeight={currentWeight} setCurrentWeight={setCurrentWeight} />
            <h2>Your target weight: {weightGoal}</h2>
            <UpdateWeightGoal user={user} weightGoal={weightGoal} setWeightGoal={setWeightGoal} />
        </div>
    )

}