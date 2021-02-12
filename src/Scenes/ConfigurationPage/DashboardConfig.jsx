import React, { Component } from 'react'
import { Col, Row, Layout, Input, Button } from 'antd';


import {
    EditOutlined
} from '@ant-design/icons';
import TransferComponent from '../Components/TransferComponent';


export default class DashboardConfig extends Component {
    render() {
        return (


            <div style={{ paddingTop: "1px" }}>
                <Layout style={{ backgroundColor: "#212840", paddingBottom: "20px" }}>
                    <Row>
                    <text style={{ color: '#42dad6', fontSize: "25px" }}>Enertek</text>
                    <text style={{ color: '#8a8d93', fontSize: "25px" }}>  / Config / Dashboard Config</text>
                    </Row>
                </Layout>
                <Layout style={{ backgroundColor: "#131633", paddingTop: "30px", paddingLeft: "20px", paddingRight: "20px" }}>
                    <Row>
                        <Col span={12}>
                            <h2 style={{ color: 'rgb(151, 150, 151)', paddingTop: '10px', fontSize: '25px' }}>Dashboard Configuration</h2>
                        </Col>
                        <Col span={12}>
                            <h2 style={{ color: 'rgb(151, 150, 151)', paddingTop: '10px', fontSize: '25px' }}>Selected Param</h2>
                        </Col>
                    </Row>
                    <div><TransferComponent /></div>

                    <Row style={{ paddingTop: '25px', paddingLeft: "25%", paddingBottom: '30px' }}>
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
            </div>

        )
    }
}
