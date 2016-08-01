// ======================================================================================================
//
// Site Default Layout
//
// ======================================================================================================

// ---------------------------------------------------
// Import Modules
// ---------------------------------------------------

import React       from "react";
import ReactDOM    from "react-dom";
import { connect } from 'react-redux';

// ---------------------------------------------------
// Outcome Class
// ---------------------------------------------------

class MainLayout extends React.Component {

// Contructor
// ___________________________________________________
  constructor(props) {
    super(props);
  }

// Render to the DOM
// ___________________________________________________
  render() {
    return (
      <div>
        { this.props.children }
      </div>
    )
  }
}

// ---------------------------------------------------
// Export module and attach store data to state
// ---------------------------------------------------

function mapStateToProps(state) {
  return {
    routing: state.routing
  };
}

export default connect(mapStateToProps)(MainLayout);
