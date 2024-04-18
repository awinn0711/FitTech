import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
//import Button from 'react-bootstrap/Button';


const AuthLogout = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Please Log Out
    </button>
  );
};

export default AuthLogout;