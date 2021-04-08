import React, { Component } from 'react'
import { Col, Row, Layout, Input, Button, Select } from 'antd';
import { updateTitleElements } from '../../../Redux/action'
import { connect } from 'react-redux';
const { Option } = Select;
class ExportData extends Component {
  componentDidMount() {
    this.props.updateTitleElements({
      title: 'ExportData',
      type: 'Report',
    })
  }
  render() {
    return (
      <div style={{ paddingTop: "1px" }}>
        <Layout class="layout-container">
          <h2 class="h2"> Export Report</h2>
          <Row style={{ paddingTop: "20px" }} >
            <Col sm={2}>
              <label htmlFor="name" class="label">Turbo ID<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
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
              <label htmlFor="name" class="label" >Test No<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
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
              <Button > View</Button>
              <span> &nbsp;</span>
            </Col>
            <Col xs={4}>
              <Button > Clear</Button>
              <span> &nbsp;</span>
            </Col>

          </Row>
          <Layout style={{ backgroundColor: "#131633", paddingTop: "20px", paddingLeft: "20px" }}>

          </Layout>
        </Layout>
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

const exportData = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExportData)

export default exportData;

