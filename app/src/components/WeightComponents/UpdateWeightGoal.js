import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

export default function UpdateWeightGoal({userEmail, weightGoal, setWeightGoal, setMessage}) {

    async function handleUpdateWeightGoal() {
        try {
            await fetch(`http://localhost:8080/api/weightinfo/${userEmail}/setTargetWeight/${weightGoal}`, {
                method: 'POST',
                mode: 'no-cors'
            })
            .then(
                setMessage("Target weight updated!")
            )
        } catch (error) {
            console.error('Error updating target weight:', error);
        }
    }

    return(
        <div>
            <form>
                <input type='number' name='setWeight' value={weightGoal} onChange={(e) => setWeightGoal(e.target.value)}></input>
                <Button variant='success' onClick={handleUpdateWeightGoal}>Update Target Weight</Button>
            </form>
        </div>
    )
}