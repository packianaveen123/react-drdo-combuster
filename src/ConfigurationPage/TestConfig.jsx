import React, { Component } from 'react'
import { Col, Row, Layout, Input, Button, Table, Space,Select, InputNumber } from 'antd';

import { testdatas } from '../Data/TestData.json';
import {
  EditOutlined
} from '@ant-design/icons';
const { Column } = Table;
const { Option } = Select;
export default class TestConfig extends Component {
  render() {
    return (
      <div style={{ paddingTop: "10px" }}>
        <Layout style={{ backgroundColor: "#131633", paddingTop: "20px", paddingLeft: "20px" }}>
          <h2 style={{ color: 'rgb(151, 150, 151)', paddingTop: '10px' }}>Test Configuration</h2>
          <Row style={{paddingTop:"20px"}} >
            <Col sm={2}>
              <label htmlFor="name" style={{ color: 'rgb(151, 150, 151)' }}>Name<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
              <span> &nbsp; &nbsp; &nbsp;</span>
            </Col>
            <Col sm={10}>
              <Input />
            </Col>

            <Col sm={2}>
              <label htmlFor="name" style={{ color: 'rgb(151, 150, 151)' }}>Name<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
              <span> &nbsp; &nbsp; &nbsp;</span>
            </Col>
            <Col sm={10}>
              {/* <Input /> */}
              <Input.Group compact>
                <Select defaultValue="Select" style={{width:'50%'}}>
                  <Option value="Option1">Option1</Option>
                  <Option value="Option2">Option2</Option>
                  <Option value="Option3">Option3</Option>
                  <Option value="Option4">Option4</Option>
                </Select>
               
              </Input.Group>
            </Col>
          </Row>

          <Row sm={6} style={{ paddingTop: '25px', paddingLeft: "30%", paddingBottom: '30px' }}>
            <Col xs={3}>
              <Button > Save</Button>
              <span> &nbsp;</span>
            </Col>
            <Col xs={3}>
              <Button > Clear</Button>
              <span> &nbsp;</span>
            </Col>
            <Col xs={3}>
              <Button > Reset</Button>
            </Col>
          </Row>
        </Layout>

        <div style={{ paddingTop: "10px" }}>
          <Layout style={{ backgroundColor: "#131633", paddingTop: "20px", paddingLeft: "20px", paddingRight: "20px" }}>
            <h2 style={{ color: 'rgb(151, 150, 151)', paddingTop: '10px' }}>Test Param</h2>
            <Table dataSource={testdatas} style={{ backgroundColor: "#131633" }} >

              <Column title="S.No" dataIndex="SNo" />
              <Column title="Name" dataIndex="Name" />
              <Column title="Unit" dataIndex="Unit" />
              <Column title="Value" dataIndex="Value" />

              <Column
                title="Edit"
                key="edit"
                render={() => (
                  <Space size="middle">
                    <EditOutlined />
                  </Space>
                )}
              />
            </Table>,
         </Layout>
        </div>
      </div>
    )
  }
}
