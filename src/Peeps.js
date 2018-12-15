import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import './App.css';
import {setAccountId, getPeeps, createPeep} from './actions';

class Peeps extends Component {
  constructor(props) {
    super(props);
    const accountIdFromReactRouter = this.props.match.params.accountId;
    this.props.setAccountId(accountIdFromReactRouter);
  }

  componentDidMount() {
    this.props.getPeeps();
  }

  render() {
    const {peeps, onClickCreatePeep} = this.props;
    return (
      <Fragment>
        <h1>Peeps</h1>
        <ul>
          {peeps.map((peep, index) =>
            <li key={index}>
              {peep.peepId}
              <ul>
                {peep.items.map(item => <li>{item}</li>)}
              </ul>
            </li>
          )}
        </ul>
        <button onClick={onClickCreatePeep}>Create peep</button>
      </Fragment>
    );
  }
}

Peeps.propTypes = {
  accountId: PropTypes.string,
  getPeeps: PropTypes.func.isRequired,
  peeps: PropTypes.array,
  setAccountId: PropTypes.func.isRequired,
  onClickCreatePeep: PropTypes.func.isRequired,
};

Peeps.defaultProps = {
  accountId: '',
  peeps: [],
};

const mapStateToProps = state => ({
  accountId: state.accountId,
  peeps: state.peeps,
});

const mapDispatchToProps = dispatch => ({
  setAccountId: accountId => dispatch(setAccountId(accountId)),
  getPeeps: () => dispatch(getPeeps()),
  onClickCreatePeep: () => dispatch(createPeep()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Peeps);
