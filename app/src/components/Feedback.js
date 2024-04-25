import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

const Feedback = () => {
    const { user, isAuthenticated } = useAuth0();

    const [description, setDescription] = useState("");
    const [feedbackType, setFeedbackType] = useState("");
    const [submitted, setSubmitted] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/feedback/submit", {
                userEmail: user.email,
                feedbackType,
                description
            });
            setSubmitted(true);
        } catch (error) {
            console.error("Error submitting feedback:", error);
            setSubmitted(false);
        }
    };

    return (
        <div>
            <h2>Feedback Form</h2>
            {submitted !== null && (
              <p style={{ color: submitted ? 'green' : 'red' }}>
              {submitted ? 'Feedback submitted successfully!' : 'Failed to submit feedback. Please try again later.'}
              </p>
            )}
            <form onSubmit={handleSubmit}>
                <label>
                    Feedback Type:
                    <select>
                        <option></option>
                        <option></option>
                        <option></option>
                    </select>
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        value={user.email}
                        disabled
                    />
                </label>
                <br />
                <label>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <br />
                <Button type="submit">Submit Feedback</Button>
            </form>
        </div>
    );
};

export default Feedback;

//At the top
//Experiencing a problem or want to offer feedback? Please complete the following form and be detailed in your request.
//You will receive a reply from an administrator to the email associated with your account as soon as possible.

//Issue Type
//Account issue
//Feature not working
//Request for new feature
//Other (should bring up box to specify)