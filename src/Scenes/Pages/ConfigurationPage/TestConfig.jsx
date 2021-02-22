import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTestConfig } from '../../redux/action';

import { Col, Row, Layout, Input, Button, Table, Select, } from 'antd';

import SearchBox from '../../Components/SearchBox';
import TableElement from '../../Components/TableElement';

const { Option } = Select;

class TestConfig extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.tableData)
    const { tableData } = this.props;
    return (
      <div style={{ paddingTop: "10px" }}>

        <Layout style={{ backgroundColor: "#131633", paddingTop: "20px", paddingLeft: "20px" }}>
          <h2 style={{ color: 'rgb(151, 150, 151)', paddingTop: '10px' }}>Test Configuration</h2>
          <Row style={{ paddingTop: "20px" }} >
            <Col sm={2}>
              <label htmlFor="name" style={{ color: 'rgb(151, 150, 151)', fontSize: '15px' }}>Name<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
              <span> &nbsp; &nbsp; &nbsp;</span>
            </Col>
            <Col sm={10}>
              <Input style={{ Color: "#666873" }} placeholder="Name" />
            </Col>

            <Col sm={2}>
              <label htmlFor="name" style={{ color: 'rgb(151, 150, 151)', fontSize: '15px' }}>Value<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
              <span> &nbsp; &nbsp; &nbsp;</span>
            </Col>
            <Col sm={10}>
              <Input.Group compact>
                <Select defaultValue="Value" style={{ width: '450px' }}>
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
              <Button > Save</Button>
              <span> &nbsp;</span>
            </Col>
            <Col xs={4}>
              <Button > Clear</Button>
              <span> &nbsp;</span>
            </Col>
            <Col xs={4}>
              <Button > Reset</Button>
            </Col>
          </Row>
        </Layout>

        <div style={{ paddingTop: "35px" }}>
          <Layout style={{ backgroundColor: "#131633", paddingTop: "30px", paddingLeft: "20px", paddingRight: "20px" }}>
            <Row>
              <Col span={8}>
                <h2 style={{ color: 'rgb(151, 150, 151)', paddingTop: '10px' }}>Test Configuration</h2>
              </Col>
              <Col span={10}><SearchBox /></Col>
              <Col span={6}>
                <Row style={{ paddingTop: '5px', paddingLeft: "18%", paddingBottom: '10px' }}>
                  <Col span={8}>
                    <Button > Excel</Button>
                  </Col>
                  <Col span={8}>
                    <Button > PDF</Button>
                  </Col>
                </Row>
              </Col>
            </Row>

            <TableElement
              data={tableData}
              editable={true}
             
            />
          </Layout>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  testConfig: state.app.testConfig,
  tableData: state.app.testdata,
  user: state.app.userParams
})

const mapDispatchToProps = {

}

const testContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TestConfig)
export default testContainer;