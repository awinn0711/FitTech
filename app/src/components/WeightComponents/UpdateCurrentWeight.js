import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

export default function UpdateCurrentWeight({userEmail, currentWeight, setCurrentWeight, setMessage}) {

    async function handleUpdateCurrentWeight() {
        try {
            await fetch(`http://localhost:8080/api/weightinfo/${userEmail}/setCurrentWeight/${currentWeight}`, {
                method: 'POST',
                mode: 'no-cors'
            })
            .then(
                setMessage("Weight updated!")
            )
        } catch (error) {
            console.error('Error updating current weight:', error);
        }
    }

    return(
        <div>
            <form>
                <input type='number' name='setWeight' value={currentWeight} onChange={(e) => setCurrentWeight(e.target.value)}></input>
                <Button variant='success'onClick={handleUpdateCurrentWeight}>Update Current Weight</Button>
            </form>
        </div>
    )
}