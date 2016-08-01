// ======================================================================================================
//
// Configure Application & Routes
//
// ======================================================================================================

// ---------------------------------------------------
// Import Modules
// ---------------------------------------------------

import React                                      from "react";
import ReactDOM                                   from "react-dom";
import { Router, Route, hashHistory, IndexRoute } from "react-router";
import { createStore, applyMiddleware }           from "redux";
import { Provider }                               from "react-redux";
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import thunk                                      from 'redux-thunk';
import rootReducer                                from './reducers/index'
import MainLayout                                 from "./layouts/MainLayout";
import Home                                       from "./containers/Home";
import * as types                                 from './actions/actionTypes';

// ---------------------------------------------------
// 1. Attach middleware
// 2. Create application store
// 3. Create redux infused history
// ---------------------------------------------------

let   middleware = applyMiddleware(thunk, routerMiddleware(hashHistory));
const store      = middleware(createStore, applyMiddleware)(rootReducer);
const history    = syncHistoryWithStore(hashHistory, store);

//_Start at Top_______________________________________
const goToTop = () => { window.scrollTo(0, 0) }
store.subscribe(() => { console.log(store.getState()) });

// ---------------------------------------------------
// Render Routes with custom history and provider
// ---------------------------------------------------

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ history } onUpdate={ goToTop }>
      <Route        path="/"    component={ MainLayout }>
        <Route      path="home" component={ Home }/>
        <IndexRoute             component={ Home }/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById("app")
);
