// ======================================================================================================
//
// Reducers (Pass in current state and action to update the store)
//
// ======================================================================================================

// ---------------------------------------------------
// Import Modules
// ---------------------------------------------------

import React               from 'react';
import { combineReducers } from 'redux';
import { routerReducer   } from 'react-router-redux';
import * as types          from '../actions/actionTypes';

// ---------------------------------------------------
// Example Reducer
// ---------------------------------------------------


//_View States________________________________________
const exampleStore = (
  state = {
    //...
  },
action ) => {
  switch(action.type) {
    case types.EXAMPLE_ACTION:
      return  {
        ...state,
        id: action.id
      }

    default:
      return state;
  }
};

// ---------------------------------------------------
// Combine Reducers
// ---------------------------------------------------

const rootReducer = combineReducers({
  routing: routerReducer,
  exampleStore
});

// ---------------------------------------------------
// Export Root Reducer
// ---------------------------------------------------

export default rootReducer;
