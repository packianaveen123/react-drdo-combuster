import React, { Component } from 'react'
import { Card, Col, Row, Layout, Divider } from 'antd';
import {
    DownloadOutlined,
    PlaySquareOutlined,
    SyncOutlined,
    PoweroffOutlined,
    QuestionOutlined,
    RedoOutlined
} from '@ant-design/icons';
export default class GridContainer extends Component {
    render() {
        return (
            <div style={{ paddingTop: "50px" }}>
                <Layout style={{ backgroundColor: "#131633", paddingTop: "20px", paddingLeft: "20px" }}>
                    <Row >
                        <Col xs={8} style={{ paddingLeft: "20px" }}>
                            <form>
                                <Row>
                                    <Col xs={4}>
                                        <label for="text" class="label" >Mode</label>
                                    </Col>
                                    <Col xs={4}>
                                        <input type="text" class="input" name="fname" />
                                    </Col>
                                </Row>
                            </form>
                        </Col>
                    </Row>
                    <Row style={{ backgroundColor: "#131633", paddingTop: "20px", paddingLeft: "20px" }}>
                        <Col xs={8}>
                            <form>
                                <Row>
                                    <Col xs={4}>
                                        <label for="text" class="label" >Turbine ID</label>
                                    </Col>
                                    <Col xs={4}>
                                        <input type="text" class="input" name="fname" />
                                    </Col>
                                </Row>
                            </form>
                        </Col>
                        <Col xs={8}>
                            <form>
                                <Row>
                                    <Col xs={4}>
                                        <label for="text" class="label" >Tester</label>
                                    </Col>
                                    <Col xs={4}>
                                        <input type="text" class="input" name="fname" />
                                    </Col>
                                </Row>
                            </form>
                        </Col>
                        <Col xs={8}>
                            <form>
                                <Row>
                                    <Col xs={4}>
                                        <label for="text" class="label" >Witness</label>
                                    </Col>
                                    <Col xs={4}>
                                        <input type="text" class="input" name="fname" />
                                    </Col>
                                </Row>
                            </form>
                        </Col>
                    </Row>

                    <Row style={{ backgroundColor: "#131633", paddingTop: "20px", paddingRight:"20px"}}>
                        <Divider style={{ borderColor: "#42dad6", backgroundColor: "#131633", }} />
                        
                                <Col span={6}>
                                    <Card style={{ width: 200 }}>
                                        <DownloadOutlined style={{ paddingLeft: '40px', paddingTop: '1px', color: 'gray', fontSize: "30px" }} />
                                        <p style={{ color: 'gray', fontSize: "20px", paddingLeft: '20px' }}>Initialize</p>
                                    </Card>,
                                    </Col>
                                <Col span={6}>
                                    <Card style={{ width: 200 }}>
                                        <PlaySquareOutlined style={{ paddingLeft: '40px', paddingTop: '1px', color: 'gray', fontSize: "30px" }} />
                                        <p style={{ color: 'gray', fontSize: "20px", paddingLeft: '35px' }}> Start</p>
                                    </Card>,
                                    </Col>
                                <Col span={6}>
                                    <Card style={{ width: 200 }}>
                                        <SyncOutlined style={{ paddingLeft: '40px', paddingTop: '1px', color: 'gray', fontSize: "30px" }} />
                                        <p style={{ color: 'gray', fontSize: "19px", paddingLeft: '10px' }}>Reset Temp</p>
                                    </Card>,
                                    </Col>
                                <Col span={4}>
                                    <Card style={{ width: 200, borderColor: "red" }}>
                                        <PoweroffOutlined style={{ paddingLeft: '40px', paddingTop: '1px', color: 'red', fontSize: "30px" }} />
                                        <p style={{ color: '#42dad6', fontSize: "20px", paddingLeft: '15px' }}>Shutdown</p>
                                    </Card>,
                                    </Col>
                                <Col span={2}>
                                    <RedoOutlined style={{ color: 'green', fontSize: "50px" }} /><br></br>
                                    <QuestionOutlined style={{ color: 'red', fontSize: "50px" }} />
                                </Col>
                            
                      
                    </Row>
                </Layout>
            </div>

        )
    }
}
