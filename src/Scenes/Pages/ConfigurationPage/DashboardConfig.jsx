import React, { Component } from 'react'
import { Col, Row, Layout } from 'antd';
import { connect } from 'react-redux';
import TransferElement from '../../Components/subComponents/TransferElement';
import ParamConfig from '../ConfigurationPage/ParamConfig';
import { updateTitleElements } from '../../../Redux/action'
export class DashboardConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
    this.props.updateTitleElements({
      title: 'Dashboard Config',
      type: 'Config',
    })
  }
  render() {
    return (
      <div>
        <Layout style={{ backgroundColor: "#131633", paddingTop: "10px", paddingLeft: "20px", paddingRight: "20px" }}>
          <Row>
            <Col span={12}>
              <h2 style={{ color: 'rgb(151, 150, 151)', fontSize: '25px' }}>Dashboard Configuration</h2>
            </Col>
            <Col span={12}>
              <h2 style={{ color: 'rgb(151, 150, 151)', fontSize: '25px' }}>Selected Param</h2>
            </Col>
          </Row>
          <div style={{ paddingLeft: '80px' }}><TransferElement /></div>
        </Layout>

        <div>
          <ParamConfig />
        </div>
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

const dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardConfig)

export default dashboard;