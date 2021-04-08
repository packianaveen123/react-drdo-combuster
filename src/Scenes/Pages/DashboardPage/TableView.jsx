import React, { Component } from 'react';
import StatusBlock from '../../Components/TestPageComponent/StatusBlock';
import { updateTitleElements } from '../../../Redux/action'
import { connect } from 'react-redux';

class TableView extends Component {
  componentDidMount() {
    this.props.updateTitleElements({
      title: 'Table View',
      type: 'Dashboard',
    })
  }
  render() {
    return (
      <div>
        <StatusBlock />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  app: state.app
})
const mapDispatchToProps = {
  updateTitleElements
}

const tableView = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableView)

export default tableView;

