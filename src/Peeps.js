import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import './App.css';
import {setAccountId, getPeeps} from './actions';

class Peeps extends Component {
  constructor (props) {
    super(props);
    const accountIdFromReactRouter = this.props.match.params.accountId;
    this.props.setAccountId(accountIdFromReactRouter);
  }

  componentDidMount () {
    this.props.getPeeps();
  }

  render () {
    return "Peeps";
  }
}

Peeps.propTypes = {
  accountId: PropTypes.string,
  getPeeps: PropTypes.func.isRequired,
  setAccountId: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  accountId: state.accountId,
});

const mapDispatchToProps = dispatch => ({
  setAccountId: accountId => dispatch(setAccountId(accountId)),
  getPeeps: () => dispatch(getPeeps()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Peeps);
