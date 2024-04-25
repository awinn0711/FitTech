import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Spinner from 'react-bootstrap/Spinner';
import ProfilePicture from './ProfilePicture.js'
//import background from "./background/FITTECH.jpg";



const AuthProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {

   // return <div>Loading ...Please Wait</div>;

    return <div>
    <p>Loading...</p>
    <Spinner animation='border'></Spinner>
</div>

  }


  return (
    isAuthenticated && (
      <div style={{ backgroundImage: "url(/FITTECH.jpg)" }}>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <h3> Welcome to Fit-Tech, {user.name} </h3>
        <ProfilePicture />

      </div>
    )
  );
};

export default AuthProfile;