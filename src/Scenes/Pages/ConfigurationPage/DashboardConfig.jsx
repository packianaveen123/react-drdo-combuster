import React, { Component } from 'react'
import { Col, Row, Layout, Input, Button ,Form } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  EditOutlined
} from '@ant-design/icons';
import TransferElement from '../../Components/TransferElement';
import ColorBar from '../../Components/ColorBar';

export class DashboardConfig extends Component {
  constructor(props){
    super(props);
    this.state={
       
    }
  }
  render() {
    
    // let status_data = this.props.app
    // console.log(status_data.chartData[0])
    // this.state.persons = status_data.chartData[0]
    // console.log(this.state.persons)
    return (
      <div style={{ paddingTop: "1px" }}>      
          <Layout style={{ backgroundColor: "#131633", paddingTop: "30px", paddingLeft: "20px", paddingRight: "20px" }}>
            <Row>
              <Col span={12}>
                <h2 style={{ color: 'rgb(151, 150, 151)', paddingTop: '10px', fontSize: '25px' }}>Dashboard Configuration</h2>
              </Col>
              <Col span={12}>
                <h2 style={{ color: 'rgb(151, 150, 151)', paddingTop: '10px', fontSize: '25px' }}>Selected Param</h2>
              </Col>
            </Row>
            <div style={{ paddingLeft: '80px' }}><TransferElement /></div>
           </Layout>       
      </div>

    )
  }
}


const mapStateToProps = state => ({
  app: state.app
})
const mapDispatchToProps = {}

const dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardConfig)

export default dashboard;