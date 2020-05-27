import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Router
import { BrowserRouter as Router } from 'react-router-dom';

// Redux
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

// Bootstrap, MDB, fonts, other style libraries
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only';
import 'mdbreact/dist/css/mdb.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { noteReducer } from './store/reducers';

// Redux dev tools
const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

// const reduxDevToolsHook = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const enhancer = composeEnhancers(
  applyMiddleware(thunk, logger), //reduxDevToolsHook
  // other store enhancers if any
);

const store = createStore(noteReducer, enhancer);

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  rootElement
);

registerServiceWorker();
