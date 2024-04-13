import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Button from 'react-bootstrap/Button';



const AuthLogin = () => {
    const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Please Log In</button>;

    <div class="bg" style="background-image: url('AppHomePage.jpg');"></div>


  }


export default AuthLogin;