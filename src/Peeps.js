// import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './App.css';

const Peeps = ({ match }) => (
    `accountId: ${match.params.accountId}`
);

Peeps.propTypes = {
  // onClickCreateAccount: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    // onClickCreateAccount: () => dispatch(createAccount())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Peeps);
