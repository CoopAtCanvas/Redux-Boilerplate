// ======================================================================================================
//
// Actions
//
// ======================================================================================================

// ---------------------------------------------------
// Import Modules
// ---------------------------------------------------

import * as types                     from './actionTypes';
import axios                          from 'axios';
import { pushState }                  from "redux-simple-router";
import { normalize, Schema, arrayOf } from 'normalizr';

// ---------------------------------------------------
// Schemas to Normailze Data (if needed)
// ---------------------------------------------------

// ---------------------------------------------------
// Export Action Example
// ---------------------------------------------------

export function toggleAccordion(id, openState) {
  return {
    type: types.EXAMPLE_ACTION,
    id: id
  }
};
