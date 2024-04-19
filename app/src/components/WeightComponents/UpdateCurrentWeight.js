import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

export default function UpdateCurrentWeight({user, currentWeight, setCurrentWeight}) {

    async function handleUpdateCurrentWeight() {
        try {
            await fetch(`http://localhost:8080/api/weightinfo/${user.email}/setCurrentWeight/${currentWeight}`, {
                method: 'POST',
            });
        } catch (error) {
            console.error('Error removing meal:', error);
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