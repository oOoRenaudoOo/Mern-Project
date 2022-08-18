import React, { useContext } from 'react';
import Log from '../components/Log';
import { UidContext } from '../components/AppContext'
import UpdateProfil from '../components/profil/UpdateProfil';



const Profil = () => {
    const uId = useContext (UidContext);

    return (
        <div className="profil-page">
            { uId ? (
                <UpdateProfil />
            ) : (
                <div className="log-container">
                    <Log signin={ false } signup={ true } />
                    <div className="img-container">
                        <img src="./img/log.svg" alt="img-log" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profil;