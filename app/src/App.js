import React from 'react';
import AuthLogin from './components/authLogin';
import AuthProfile from './components/authProfile';
import AuthLogout from './components/authLogout';

function App() {

    return (
    <>
    <AuthLogin></AuthLogin>

    <AuthLogout></AuthLogout>

    <AuthProfile></AuthProfile>
    </>

    );

}

export default App;
