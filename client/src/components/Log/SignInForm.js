import React, { useState } from 'react';
import axios from 'axios';




const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = (e) => {
       // evite le rechargement de la page
        e.preventDefault();

        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');


        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/user/login`,
            withCredentials: true,
            data: {
                email,
                password,
            },
        })
            .then((res) => {
                if (res.data.errors) {
                    emailError.innerHTML = res.data.errors.email;
                    passwordError.innerHTML = res.data.errors.password;
                } else {
                    window.location = '/';
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };


    return (
        <form action="" onSubmit={ handleLogin } id="sign-up-form">
            <label htmlFor="email">Email</label>
            <br />
            <input
                autoComplete="off"
                type="text"
                name="email"
                id="email"
                placeholder="Entrer votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            <div className="email error"></div>
            <br />
            <label htmlFor="password">Mot de passe</label>
            <input
                autoComplete="off"
                type="password"
                name="password"
                id="password"
                placeholder="Entrer votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            <div className="password error"></div>
            <br /> <br />
            <input type="submit" value="Se Connecter" />    
        </form>
    );
};

export default SignInForm;