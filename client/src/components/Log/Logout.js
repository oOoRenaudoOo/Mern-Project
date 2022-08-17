import React from 'react';
import axios from 'axios';
import cookie from 'js-cookie';



const Logout = () => {
    const logout = async () => {

        const removeCookie = (key) => {
            if (window !== "undefined") {
                cookie.remove(key, { expire: 1 });
            }
        }
        // suppression du cookie en back-end(url api/user/logout)
        // ET suppression du cookie en front_end(removeCookie())
        await axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}api/user/logout`,
            withCredentials: true
        })
            .then(() => removeCookie('jwt'))
            .catch((err) => console.log(err));
        
        window.location = "/";
    };


    return (
        <li onClick={logout}>
          <img src="./img/icons/logout.svg" alt="logout" />  
         </li>
    );
};

export default Logout;