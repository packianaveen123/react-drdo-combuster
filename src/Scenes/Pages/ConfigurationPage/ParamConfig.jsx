import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Layout, Input, Button, Select, } from 'antd';

import SearchBox from '../../Components/SearchBox';
import TableElement from '../../Components/TableElement';
const { Option } = Select;

class ParamConfig extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { tableData } = this.props;
        return (
            <div style={{ paddingTop: "1px" }}>
                <Layout style={{ backgroundColor: "#212840", paddingBottom: "20px" }}>
                    <Row>
                        <text style={{ color: '#42dad6', fontSize: "25px" }}>EnerTek</text>
                        <text style={{ color: '#585a5f', fontSize: "25px" }}>  / Config / Param Config</text>
                    </Row>
                </Layout>
                <Layout style={{ backgroundColor: "#131633", paddingTop: "20px", paddingLeft: "20px" }}>
                    <h2 style={{ color: 'rgb(151, 150, 151)', paddingTop: '10px' }}>Param Configuration</h2>
                    <Row style={{ paddingTop: "20px" }} >
                        <Col sm={3}>
                            <label htmlFor="name" style={{ color: 'rgb(151, 150, 151)', fontSize: '15px' }}>Name<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
                            <span> &nbsp; &nbsp; &nbsp;</span>
                        </Col>
                        <Col sm={9}>
                            <Input placeholder="Config Name" />
                        </Col>

                        <Col sm={3}>
                            <label htmlFor="Unit" style={{ color: 'rgb(151, 150, 151)', fontSize: '15px' }}>Unit<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
                            <span> &nbsp; &nbsp; &nbsp;</span>
                        </Col>
                        <Col sm={9}>
                            <Input.Group compact>
                                <Select defaultValue="Select" style={{ width: '450px' }}>
                                    <Option value="Option1">km/cm2</Option>
                                    <Option value="Option2">Lit</Option>
                                    <Option value="Option3">Degree C</Option>
                                    <Option value="Option4">mm of Water</Option>
                                </Select>
                            </Input.Group>
                        </Col>
                    </Row>

                    <Row style={{ paddingTop: "20px" }}>
                        <Col sm={3}>
                            <label htmlFor="Param Index" style={{ color: 'rgb(151, 150, 151)', fontSize: '15px' }}>Param Index<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
                            <span> &nbsp; &nbsp; &nbsp;</span>
                        </Col>
                        <Col sm={9}>
                            <Input placeholder="Param Index" />
                        </Col>

                        <Col sm={3}>
                            <label htmlFor="Lowwer Limit" style={{ color: 'rgb(151, 150, 151)', fontSize: '15px' }}>Lower Limit<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
                            <span> &nbsp; &nbsp; &nbsp;</span>
                        </Col>
                        <Col sm={9}>
                            <Input placeholder="Lower Limit" />
                        </Col>
                    </Row>

                    <Row style={{ paddingTop: "20px" }}>
                        <Col sm={3}>
                            <label htmlFor="Normal Limit" style={{ color: 'rgb(151, 150, 151)', fontSize: '15px' }}>Normal Limit<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
                            <span> &nbsp; &nbsp; &nbsp;</span>
                        </Col>
                        <Col sm={9}>
                            <Input placeholder="Normal Limit" />
                        </Col>

                        <Col sm={3}>
                            <label htmlFor="Upper Limit" style={{ color: 'rgb(151, 150, 151)', fontSize: '15px' }}>Upper Limit<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
                            <span> &nbsp; &nbsp; &nbsp;</span>
                        </Col>
                        <Col sm={9}>
                            <Input placeholder="Upper Limit" />
                        </Col>
                    </Row>

                    <Row style={{ paddingTop: '25px', paddingLeft: "35%", paddingBottom: '30px' }}>

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
                                <h2 style={{ color: 'rgb(151, 150, 151)', paddingTop: '10px' }}>Param Configuration</h2>
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
                            lowerLimit={true}
                            normalLimit={true}
                            upperLimit={true}
                        />
                    </Layout>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    paramConfig: state.app.paramConfig,
    tableData: state.app.paramdata,
    user: state.app.userParams
})

const mapDispatchToProps = {

}

const paramContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ParamConfig)
export default paramContainer;