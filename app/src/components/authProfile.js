import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Spinner from 'react-bootstrap/Spinner';


const AuthProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
<<<<<<< HEAD
    return <div>Loading ...Please Wait</div>;
=======
    return <div>
    <p>Loading...</p>
    <Spinner animation='border'></Spinner>
</div>
>>>>>>> main
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>

      </div>
    )
  );
};

export default AuthProfile;