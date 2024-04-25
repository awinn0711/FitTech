import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

const Feedback = () => {
    const { user, isAuthenticated } = useAuth0();

    const [description, setDescription] = useState("");
    const [feedbackType, setFeedbackType] = useState("");
    const [submitted, setSubmitted] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (feedbackType === "") {
            setErrorMessage("Feedback type is required.");
            return;
        } else {
            setErrorMessage("");
        }

        if (description.trim() === "") {
            setErrorMessage("Description cannot be blank.");
            return;
        } else {
            setErrorMessage("");
        }

        try {
            await axios.post("/api/feedback/submit", {
                userEmail: user.email,
                feedbackType,
                description
            });
            setSubmitted(true);
        } catch (error) {
            setErrorMessage("Error submitting feedback.");
            setSubmitted(false);
        }
    };

    return (
        <div>
            {submitted !== null && (
                <p style={{ color: submitted ? 'green' : 'red' }}>
                    {submitted ? 'Feedback submitted successfully!' : 'Failed to submit feedback. Please try again later.'}
                </p>
            )}
            <form onSubmit={handleSubmit}>
                <div className="card" style={{ width: '28rem', backgroundColor: 'info', margin: 'auto' }}>
                    <div className="card-header"><h2 style={{ color: 'white' }}>Feedback Form</h2></div>
                    <div className="card-body">
                        <small>Experiencing a problem or want to offer feedback? Please complete the following form and be detailed in your request.
                               You will receive a reply from an administrator to the email associated with your account as soon as possible.</small>
                        <br />
                        {errorMessage && (
                            <p style={{ color: 'red' }}>{errorMessage}</p>
                        )}
                        <label style={{ color: 'white' }}>
                            Feedback Type:
                            <select className="form-control" value={feedbackType} onChange={(e) => setFeedbackType(e.target.value)}>
                                <option value=""></option>
                                <option value="General">General</option>
                                <option value="Bug">Bug/Issue</option>
                                <option value="Feature">Feature Request</option>
                                <option value="Other">Other</option>
                            </select>
                        </label>
                        <br />
                        <label style={{ color: "white" }}>
                            Email:
                            <input
                                type="email"
                                value={user.email}
                                className="form-control"
                                disabled
                            />
                        </label>
                        <br />
                        <label style={{ color: "white" }}>
                            Description:
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="form-control"
                                required
                            />
                        </label>
                        <br />
                        <Button type="submit" variant="primary">Submit Feedback</Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Feedback;