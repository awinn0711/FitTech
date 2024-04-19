import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

export default function UpdateWeightGoal({weightGoal, setWeightGoal}) {
    return(
        <div>
            <form>
                <input type='number' name='setWeight' value={weightGoal} onChange={(e) => setWeightGoal(e.target.value)}></input>
                <Button variant='success'>Update Target Weight</Button>
            </form>
        </div>
    )
}