import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import './App.css';
import {setAccountId, createPeep, setPeepId, getPeep} from './actions';

class Peep extends Component {
  constructor(props) {
    super(props);
    const { params: paramsFromReactRouter } = this.props.match;
    const accountId = paramsFromReactRouter.accountId;
    const peepId = paramsFromReactRouter.peepId;
    this.props.setAccountId(accountId);
    this.props.setPeepId(peepId);
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
  }

  componentDidMount() {
    this.props.getPeep();
  }

  handleTextAreaChange (event) {
    console.log(event.target.value);
  }

  render() {
    const {peep, accountId, isLoading} = this.props;
    const nav = (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href={`/${accountId}`}>Account {accountId}</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {peep.name}
          </li>
        </ol>
      </nav>
    );

    if (isLoading) {
      return (
        <Fragment>
          {nav}
          Loading...
        </Fragment>
      )
    }

    return (
      <Fragment>
        {nav}
        <form>
          <div className='form-group'>
            <textarea
              className="form-control"
              rows="10"
              onChange={this.handleTextAreaChange}
              value={peep.info}
            />
          </div>
        </form>
      </Fragment>
    );
  }
}

Peep.propTypes = {
  accountId: PropTypes.string,
  peepId: PropTypes.string,
  setAccountId: PropTypes.func.isRequired,
  setPeepId: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  peep: PropTypes.object,
};

Peep.defaultProps = {
  accountId: '',
  isLoading: true,
  peepId: '',
  peep: {},
};

const mapStateToProps = state => ({
  accountId: state.accountId,
  peepId: state.peepId,
  isLoading: state.isLoading,
  peep: state.peep,
});

const mapDispatchToProps = dispatch => ({
  setAccountId: accountId => dispatch(setAccountId(accountId)),
  setPeepId: accountId => dispatch(setPeepId(accountId)),
  getPeep: () => dispatch(getPeep()),
  onClickCreatePeep: () => dispatch(createPeep()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Peep);
