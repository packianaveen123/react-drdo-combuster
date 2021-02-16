import React, { Component } from 'react'
import { Col, Row, Layout, Input, Button, Select } from 'antd';

const { Option } = Select;
export default class RunningReport extends Component {
  render() {
    return (
      <div style={{ paddingTop: "1px" }}>
        <Layout style={{ backgroundColor: "#212840", paddingBottom: "20px" }}>
          <Row>
            <text style={{ color: '#42dad6', fontSize: "25px" }}>EnerTek</text>
            <text style={{ color: '#585a5f', fontSize: "25px" }}>  / Report / Running Report</text>
          </Row>
        </Layout>
        <Layout style={{ backgroundColor: "#131633", paddingTop: "20px", paddingLeft: "20px" }}>
          <h2 style={{ color: 'rgb(151, 150, 151)', paddingTop: '10px' }}>Running Report</h2>
          <Row style={{ paddingTop: "20px" }} >
            <Col sm={2}>
              <label htmlFor="name" style={{ color: 'rgb(151, 150, 151)', fontSize: '15px' }}>Turbine ID<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
              <span> &nbsp; &nbsp; &nbsp;</span>
            </Col>
            <Col sm={10}>
              <Col sm={10}>
                <Input.Group compact>
                  <Select defaultValue="Select" style={{ width: '450px' }}>
                    <Option value="Option1">Option1</Option>
                    <Option value="Option2">Option2</Option>
                    <Option value="Option3">Option3</Option>
                    <Option value="Option4">Option4</Option>
                  </Select>
                </Input.Group>
              </Col>
            </Col>

            <Col sm={2}>
              <label htmlFor="name" style={{ color: 'rgb(151, 150, 151)', fontSize: '15px' }}>Test No<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
              <span> &nbsp; &nbsp; &nbsp;</span>
            </Col>
            <Col sm={10}>
              <Input.Group compact>
                <Select defaultValue="Select" style={{ width: '450px' }}>
                  <Option value="Option1">Option1</Option>
                  <Option value="Option2">Option2</Option>
                  <Option value="Option3">Option3</Option>
                  <Option value="Option4">Option4</Option>
                </Select>
              </Input.Group>
            </Col>
          </Row>

          <Row style={{ paddingTop: '25px', paddingLeft: "30%", paddingBottom: '30px' }}>
            <Col xs={4}>
              <Button > view</Button>
              <span> &nbsp;</span>
            </Col>
            <Col xs={4}>
              <Button > Clear</Button>
              <span> &nbsp;</span>
            </Col>

          </Row>
        </Layout>
      </div>
    )
  }
}
