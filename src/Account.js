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
    this.state = { newPeepName: '' };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCreatePeepClick = this.handleCreatePeepClick.bind(this);
  }

  handleNameChange (event) {
    this.setState({ newPeepName: event.target.value });
  }

  componentDidMount() {
    this.props.getPeeps();
  }

  handleCreatePeepClick () {
    this.props.onClickCreatePeep(this.state.newPeepName);
  }

  render() {
    const {peeps, accountId} = this.props;

    const nav = (
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
    );

    if (this.props.isLoading) {
      return (<Fragment>
        {nav}
        Loading...
      </Fragment>);
    }

    return (
      <Fragment>
        {nav}
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
        <form className="my-3">
          <div className='form-group mb-2'>
            <input
              className='form-control'
              type="text"
              placeholder="Name of new peep"
              value={this.state.newPeepName}
              onChange={this.handleNameChange}
            />
          </div>
          <button
            type='submit'
            className="btn btn-primary"
            onClick={this.handleCreatePeepClick}
            disabled={this.state.newPeepName.trim().length === 0}
          >
            Create peep
          </button>
        </form>
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
  onClickCreatePeep: name => dispatch(createPeep(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
