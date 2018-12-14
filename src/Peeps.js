import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import './App.css';
import {setAccountId} from './actions';

class Peeps extends Component {
  constructor (props) {
    super(props);
    const accountIdFromReactRouter = this.props.match.params.accountId;
    this.props.setAccountId(accountIdFromReactRouter);
  }

  render () {
    return `accountId: ${this.props.accountId}`
  }
}

Peeps.propTypes = {
  accountId: PropTypes.string,
  setAccountId: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  accountId: state.accountId,
});

const mapDispatchToProps = dispatch => ({
  setAccountId: accountId => dispatch(setAccountId(accountId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Peeps);
