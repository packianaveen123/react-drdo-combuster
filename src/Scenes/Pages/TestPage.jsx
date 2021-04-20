import React, { Component } from 'react'
import GridContainer from '../Components/TestPageComponent/GridContainer';
import StatusBlock from '../Components/TestPageComponent/StatusBlock';
import { updateTitleElements } from '../../Redux/action';
import { connect } from 'react-redux';

class TestPage extends Component {
  componentDidMount() {
    this.props.updateTitleElements({
      title: 'Test Page',
      type: 'Test',
    })
  }

  render() {
    return (
      <div>
        <StatusBlock />
        <GridContainer />
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

const testPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TestPage)

export default testPage;

