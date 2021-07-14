import React, { Component } from 'react';
import CardComponent from '../../Components/ChartContainer/CardComponent';
import StatusBlock from '../../Components/TestPageComponent/StatusBlock';
import { updateTitleElements } from '../../../Redux/action'
import { connect } from 'react-redux';
import SingleTableElement from '../../Components/subComponents/SingleTableElement';

class GraphView extends Component {
  componentDidMount() {
    this.props.updateTitleElements({
      title: 'Graph View',
      type: 'Dashboard',
    })
  }
  render() {
    return (
      <div>
        <StatusBlock />
        {/* <SingleTableElement /> */}
        <CardComponent />
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

const graphPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphView)

export default graphPage;