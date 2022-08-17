import React, { useEffect, useState } from 'react';
import Routes from './components/Routes';
import { UidContext } from './components/AppContext';
// permet de faire des requetes
import axios  from 'axios';
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user.actions';




const App = () => {
  // uId = id de l'utilisateur connecte
  const [uId, setUid] = useState(null);
  
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data);
        })
        .catch((err) => console.log("no token"));
    };
    fetchToken();
    // dispatch decleche une action
    if (uId) dispatch(getUser(uId));
    
  }, [uId, dispatch]);


  return (
    <UidContext.Provider value={ uId }>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;