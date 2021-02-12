import React, { Component } from 'react'
import { Col, Row, Layout, Input, Button, Table, Tag, Space, Pagination, DatePicker } from 'antd';
import { testdatas } from '../../Data/TestData.json';
import {
  EditOutlined
} from '@ant-design/icons';
import SearchBox from '../Components/SearchBox';
const { Column, ColumnGroup } = Table;
export default class TurbineConfig extends Component {
  render() {
    return (
      <div style={{ paddingTop: "1px" }}>
        <Layout style={{ backgroundColor: "#212840", paddingBottom: "20px" }}>
          <Row>
            <text style={{ color: '#42dad6', fontSize: "25px" }}>Enertek</text>
            <text style={{ color: '#8a8d93', fontSize: "25px" }}>  / Config / Turbine Config</text>
          </Row>
        </Layout>
        <Layout style={{ backgroundColor: "#131633", paddingTop: "20px", paddingLeft: "20px" }}>
          <h2 style={{ color: 'rgb(151, 150, 151)', paddingTop: '10px' }}>Turbine Configuration</h2>
          <Row style={{ paddingTop: "20px" }} >
            <Col sm={2}>
              <label htmlFor="name" style={{ color: 'rgb(151, 150, 151)', fontSize: '20px' }}>Turbine ID<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
              <span> &nbsp; &nbsp; &nbsp;</span>
            </Col>
            <Col sm={6}>
              <Input />
            </Col>

            <Col sm={3}>
              <label htmlFor="name" style={{ color: 'rgb(151, 150, 151)', fontSize: '20px' }}>Installed Date<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
              <span> &nbsp; &nbsp; &nbsp;</span>
            </Col>
            <Col sm={5}>
              {/* <Input /> */}
              <DatePicker style={{ backgroundColor: "#131633" }} />
            </Col>

            <Col sm={2}>
              <label style={{ color: 'rgb(151, 150, 151)', fontSize: '20px' }}>Nozzle Area<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
              <span> &nbsp; &nbsp; &nbsp;</span>
            </Col>
            <Col sm={6}>
              <Input />
            </Col>
          </Row>
          <Row style={{ paddingTop: "20px" }}>
            <Col sm={2}>
              <label style={{ color: 'rgb(151, 150, 151)', fontSize: '20px' }}>Description <i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
            </Col>
            <Col sm={6}>
              <Input style={{ height: "120px", width: "500px" }} />
            </Col>
          </Row>

          <Row sm={6} style={{ paddingTop: '25px', paddingLeft: "30%", paddingBottom: '30px' }}>
            <Col xs={4}>
              <Button > Save</Button>
              <span> &nbsp;</span>
            </Col>
            <Col xs={4}>
              <Button > Clear</Button>
              <span> &nbsp;</span>
            </Col>
            <Col xs={4}>
              <Button> Reset</Button>
            </Col>
          </Row>
        </Layout>

        <div style={{ paddingTop: "35px" }}>
          <Layout style={{ backgroundColor: "#131633", paddingTop: "30px", paddingLeft: "20px", paddingRight: "20px" }}>
            <Row>
              <Col span={8}>
                <h2 style={{ color: 'rgb(151, 150, 151)', paddingTop: '10px' }}>Turbine Configuration</h2>
              </Col>
              <Col span={10}><SearchBox /></Col>
              <Col span={6}>
                <Row style={{ paddingTop: '5px', paddingLeft: "18%", paddingBottom: '10px' }}>
                  <Col span={10}>
                    <Button> Excel</Button>
                  </Col>
                  <Col span={10}>
                    <Button> PDF</Button>
                  </Col>
                </Row>
              </Col>
            </Row>

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
