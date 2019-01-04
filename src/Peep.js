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
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleClickSave = this.handleClickSave.bind(this);
    this.state = {
      isEditMode: false,
      peepInfo: '',
    };
  }

  componentDidMount() {
    this.props.getPeep();
  }

  handleTextAreaChange (event) {
    this.setState({
      peepInfo: event.target.value,
    });
  }

  handleClickEdit () {
    this.setState({
      peepInfo: this.props.peep.info,
      isEditMode: true
    });
  }

  handleClickSave () {
    // Save changes to server.
    this.setState({ isEditMode: false });
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
            {isLoading ? 'Loading...' : peep.name}
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
              value={this.state.isEditMode ? this.state.peepInfo : peep.info}
              disabled={!this.state.isEditMode}
            />
          </div>
          <div className='form-group'>
            <button
              className="form-control"
              onClick={this.handleClickEdit}
              disabled={this.state.isEditMode}
              type="button"
            >Edit</button>
          </div>
          <div className='form-group'>
            <button
              className="form-control"
              onClick={this.handleClickSave}
              type="button"
              disabled={!this.state.isEditMode}
            >Save</button>
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
