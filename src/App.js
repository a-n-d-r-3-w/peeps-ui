import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './App.css';

const App = ({ onClickCreateAccount }) => (
    <button onClick={onClickCreateAccount}>Create account</button>
);

App.propTypes = {
  onClickCreateAccount: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onClickCreateAccount: () => dispatch({ type: 'CREATE_ACCOUNT' })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
