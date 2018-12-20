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
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Account {accountId}
            </li>
          </ol>
        </nav>
        <div className="list-group">
          {peeps.map(peep =>
            <a
              key={peep.peepId}
              href={`/${accountId}/${peep.peepId}`}
              className="list-group-item list-group-item-action"
            >
              {peep.name}
            </a>
          )}
        </div>
        <button
          type='button'
          className="btn btn-primary"
          onClick={onClickCreatePeep}
        >
          Create peep
        </button>
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
