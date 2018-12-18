import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Redirect } from 'react-router';
import './App.css';
import {createAccount} from './actions';

const App = ({ accountId, onClickCreateAccount, isLoading }) => {
  if (!!accountId) {
    return <Redirect to={`/${accountId}`}/>;
  }
  if (isLoading) {
    return "Loading...";
  }
  return <button onClick={onClickCreateAccount}>Create account</button>;
};

App.propTypes = {
  accountId: PropTypes.string,
  onClickCreateAccount: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    accountId: state.accountId,
    isLoading: state.isLoading
  };
};

const mapDispatchToProps = dispatch => ({
  onClickCreateAccount: () => dispatch(createAccount())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
