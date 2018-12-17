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
    const {peeps, onClickCreatePeep} = this.props;
    return (
      <Fragment>
        <h1>Peeps</h1>
        <ul>
          {peeps.map((peep, index) =>
            <li key={peep.peepId}>
              <strong>{peep.name}</strong>
              <ul>
                <li><button onClick={() => {}}>Add item</button></li>
                {peep.items.map(item => <li>{item}</li>)}
              </ul>
            </li>
          )}
          <li><button onClick={onClickCreatePeep}>Create peep</button></li>
        </ul>
      </Fragment>
    );
  }
}

Account.propTypes = {
  accountId: PropTypes.string,
  getPeeps: PropTypes.func.isRequired,
  peeps: PropTypes.array,
  setAccountId: PropTypes.func.isRequired,
  onClickCreatePeep: PropTypes.func.isRequired,
};

Account.defaultProps = {
  accountId: '',
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