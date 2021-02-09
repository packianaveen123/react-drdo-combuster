import React, { Component } from 'react'
import { Col, Row, Layout, Input, Button, Table, Tag, Space, Pagination } from 'antd';
import { paramdatas } from '../Data/TestData.json';
import {
    EditOutlined
} from '@ant-design/icons';
const { Column } = Table;
export default class ParamConfig extends Component {
    render() {
        return (
            <div style={{ paddingTop: "10px" }}>
                <Layout style={{ backgroundColor: "#131633", paddingTop: "20px", paddingLeft: "20px" }}>
                    <h2 style={{ color: 'rgb(151, 150, 151)', paddingTop: '10px' }}>Param Configuration</h2>
                    <Row style={{paddingTop:"20px"}} >
                        <Col sm={2}>
                            <label htmlFor="name" style={{ color: 'rgb(151, 150, 151)' }}>Name<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
                            <span> &nbsp; &nbsp; &nbsp;</span>
                        </Col>
                        <Col sm={10}>
                            <Input />
                        </Col>

                        <Col sm={2}>
                            <label htmlFor="Unit" style={{ color: 'rgb(151, 150, 151)' }}>Unit<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
                            <span> &nbsp; &nbsp; &nbsp;</span>
                        </Col>
                        <Col sm={10}>
                            <Input />
                        </Col>
                    </Row>

                    <Row style={{ paddingTop: "20px" }}>
                        <Col sm={2}>
                            <label htmlFor="Param Index" style={{ color: 'rgb(151, 150, 151)' }}>Param Index<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
                            <span> &nbsp; &nbsp; &nbsp;</span>
                        </Col>
                        <Col sm={10}>
                            <Input />
                        </Col>

                        <Col sm={2}>
                            <label htmlFor="Lowwer Limit" style={{ color: 'rgb(151, 150, 151)' }}>Lowwer Limit<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
                            <span> &nbsp; &nbsp; &nbsp;</span>
                        </Col>
                        <Col sm={10}>
                            <Input />
                        </Col>
                    </Row>

                    <Row style={{ paddingTop: "20px" }}>
                        <Col sm={2}>
                            <label htmlFor="Normal Limit" style={{ color: 'rgb(151, 150, 151)' }}>Normal Limit<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
                            <span> &nbsp; &nbsp; &nbsp;</span>
                        </Col>
                        <Col sm={10}>
                            <Input />
                        </Col>

                        <Col sm={2}>
                            <label htmlFor="Upper Limit" style={{ color: 'rgb(151, 150, 151)' }}>Upper Limit<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
                            <span> &nbsp; &nbsp; &nbsp;</span>
                        </Col>
                        <Col sm={10}>
                            <Input />
                        </Col>
                    </Row>

                    <Row sm={6} style={{ paddingTop: '25px', paddingLeft: "30%", paddingBottom: '30px' }}>
                        <Col xs={3}>
                            <Button > Update</Button>
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
                        <h2 style={{ color: 'rgb(151, 150, 151)', paddingTop: '10px' }}>Param Configuration</h2>
                        <Table dataSource={paramdatas} style={{ backgroundColor: "#131633" }} >

                            <Column title="S.No" dataIndex="SNo" />
                            <Column title="Name" dataIndex="Name" />
                            <Column title="Unit" dataIndex="Unit" />
                            <Column title="Lowwer Limit" dataIndex="LowerLimit" />
                            <Column title="Normal Limit" dataIndex="NormalLimit" />
                            <Column title="Upper Limit" dataIndex="UpperLimit" />
                            <Column
                                title="Edit"
                                key="edit"
                                render={() => (
                                    <Space size="middle">
                                        <EditOutlined />
                                    </Space>
                                )} />
                            
                        </Table>,
         </Layout>
                </div>
            </div>
        )
    }
}
