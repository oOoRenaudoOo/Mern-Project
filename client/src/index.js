import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.scss';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { getUsers } from './actions/users.actions';
import { getPosts } from './actions/post.actions';

// dev tools
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';



const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

store.dispatch(getUsers());
store.dispatch(getPosts());


createRoot(document.getElementById('root')).render(
    <Provider  store={ store }>
      <App />
    </Provider>);


