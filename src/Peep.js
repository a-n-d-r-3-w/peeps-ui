import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import './App.css';
import {setAccountId, getPeeps, createPeep, setPeepId} from './actions';

class Peep extends Component {
  constructor(props) {
    super(props);
    const { params: paramsFromReactRouter } = this.props.match;
    const accountId = paramsFromReactRouter.accountId;
    const peepId = paramsFromReactRouter.peepId;
    this.props.setAccountId(accountId);
    this.props.setPeepId(peepId);
  }

  componentDidMount() {
    // this.props.getPeeps();
  }

  render() {
    return "Peep";
    // if (this.props.isLoading) {
    //   return "Loading...";
    // }
    // const {peeps, onClickCreatePeep} = this.props;
    // return (
    //   <Fragment>
    //     {peeps.map(peep =>
    //       <div><a href={`/${this.props.accountId}/${peep.peepId}`}>{peep.name}</a></div>
    //     )}
    //     <button onClick={onClickCreatePeep}>Create peep</button>
    //   </Fragment>
    // );
  }
}

Peep.propTypes = {
  accountId: PropTypes.string,
  peepId: PropTypes.string,
  setAccountId: PropTypes.func.isRequired,
  setPeepId: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

Peep.defaultProps = {
  accountId: '',
  isLoading: true,
  peepId: '',
};

const mapStateToProps = state => ({
  accountId: state.accountId,
  peepId: state.peepId,
  isLoading: state.isLoading,
});

const mapDispatchToProps = dispatch => ({
  setAccountId: accountId => dispatch(setAccountId(accountId)),
  setPeepId: accountId => dispatch(setPeepId(accountId)),
  getPeeps: () => dispatch(getPeeps()),
  onClickCreatePeep: () => dispatch(createPeep()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Peep);
