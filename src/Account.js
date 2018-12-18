import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import './App.css';
import {setAccountId, getPeeps, createPeep} from './actions';

class Account extends Component {
  constructor(props) {
    super(props);
    const accountIdFromReactRouter = this.props.match.params.accountId;
    this.props.setAccountId(accountIdFromReactRouter);
  }

  componentDidMount() {
    this.props.getPeeps();
  }

  render() {
    if (this.props.isLoading) {
      return "Loading...";
    }
    const {peeps, onClickCreatePeep, accountId} = this.props;
    return (
      <Fragment>
        <div>Account ID: {accountId}</div>
        {peeps.map(peep =>
          <div key={peep.peepId}><a href={`/${accountId}/${peep.peepId}`}>{peep.name}</a></div>
        )}
        <button onClick={onClickCreatePeep}>Create peep</button>
      </Fragment>
    );
  }
}

Account.propTypes = {
  accountId: PropTypes.string,
  isLoading: PropTypes.bool,
  getPeeps: PropTypes.func.isRequired,
  peeps: PropTypes.array,
  setAccountId: PropTypes.func.isRequired,
  onClickCreatePeep: PropTypes.func.isRequired,
};

Account.defaultProps = {
  accountId: '',
  isLoading: true,
  peeps: [],
};

const mapStateToProps = state => ({
  accountId: state.accountId,
  isLoading: state.isLoading,
  peeps: state.peeps,
});

const mapDispatchToProps = dispatch => ({
  setAccountId: accountId => dispatch(setAccountId(accountId)),
  getPeeps: () => dispatch(getPeeps()),
  onClickCreatePeep: () => dispatch(createPeep()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
