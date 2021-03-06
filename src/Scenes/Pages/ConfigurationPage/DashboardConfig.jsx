import React, { Component } from 'react'
import { Col, Row, Layout, Input, Button } from 'antd';

import {
    EditOutlined
} from '@ant-design/icons';
import TransferElement from '../../Components/TransferElement';
import ColorBar from '../../Components/ColorBar';
import TitleElement from '../../Components/TitleElement';
export default class DashboardConfig extends Component {
    render() {
        return (

            <div style={{ paddingTop: "1px" }}>
                 <TitleElement/>
                <Layout style={{ backgroundColor: "#131633", paddingTop: "30px", paddingLeft: "20px", paddingRight: "20px" }}>
                    <Row>
                        <Col span={12}>
                            <h2 style={{ color: 'rgb(151, 150, 151)', paddingTop: '10px', fontSize: '25px' }}>Dashboard Configuration</h2>
                        </Col>
                        <Col span={12}>
                            <h2 style={{ color: 'rgb(151, 150, 151)', paddingTop: '10px', fontSize: '25px' }}>Selected Param</h2>
                        </Col>
                    </Row>
                    <div style={{paddingLeft:'80px'}}><TransferElement/></div>
                    <div><ColorBar/></div>
                    <Row style={{ paddingTop: '25px', paddingLeft: "40%", paddingBottom: '30px' }}>
                        <Col xs={3}>
                            <Button> Update</Button>
                            <span> &nbsp;</span>
                        </Col>
                        <Col xs={3}>
                            <Button > Reset</Button>
                            <span> &nbsp;</span>
                        </Col>
                        <Col xs={3}>
                            <Button > Clear</Button>
                        </Col>
                    </Row>
                </Layout>
            </div>

        )
    }
}
