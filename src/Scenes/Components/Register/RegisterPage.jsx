import React, { Component } from 'react'
import { Col, Row, Layout, Input, Button, Table, Space, Select, InputNumber } from 'antd';

export default class RegisterPage extends Component {
    render() {
        return (
            <div class="background">
                <div class="login-page">
                    <div class="container ">
                        <div class="form-holder ">
                            <div style={{ paddingLeft: '360px' }}>
                                <Row style={{ width: '75%' }}>
                                    {/* <!-- Logo & Information Panel--> */}
                                    <Col span={12}  >
                                        <div class="info">
                                            <div style={{ paddingTop: "12rem" }} >
                                                <h1 style={{ color: 'white' }}>Tvs Combuster</h1>

                                                <p>A product powerd by Vaigunth EnerTek (Pvt.) Ltd.</p>

                                            </div>
                                        </div>
                                    </Col>
                                    {/* <!-- Form Panel    --> */}
                                    <Col span={12} >
                                        <div class="form d-flex align-items-center">
                                            <div class="content">
                                                <Row style={{ paddingTop: "6rem"}} >
                                                    {/* <Col sm={4}>
                                                        <label htmlFor="name" style={{ color: 'rgb(151, 150, 151)', fontSize: '15px' }}>User Name<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
                                                        <span> &nbsp; &nbsp; &nbsp;</span>
                                                    </Col> */}
                                                    <Col sm={8}>
                                                        <Input style={{ Color: "#666873", width: '350px' }} placeholder="Username" />
                                                    </Col>
                                                </Row>
                                                <Row style={{ paddingTop: "30px" }} >
                                                    {/* <Col sm={4}>
                                                        <label htmlFor="password" style={{ color: 'rgb(151, 150, 151)', fontSize: '15px' }}>Password<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
                                                    </Col> */}
                                                    <Col sm={8}>
                                                        <Input style={{ Color: "#666873", width: '350px' }} placeholder="password" />
                                                    </Col>
                                                </Row>
                                                <Row style={{ paddingTop: "30px" }} >
                                                    {/* <Col sm={4}>
                                                        <label htmlFor="password" style={{ color: 'rgb(151, 150, 151)', fontSize: '15px' }}>Confirm Password<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
                                                    </Col> */}
                                                    <Col sm={8}>
                                                        <Input style={{ Color: "#666873", width: '350px' }} placeholder="Confirm password" />
                                                    </Col>
                                                </Row>
                                                <Row style={{paddingTop:'30px',paddingLeft:'20%',color:'white'}}>
                                                    <input id="register-agree" name="registerAgree" type="checkbox" required value="1" data-msg="Your agreement is required" class="checkbox-template" />
                                                    <label for="register-agree">I agree with the terms and policy</label>
                                                </Row>

                                                <Row style={{ paddingTop: '35px', paddingBottom: '30px', paddingLeft: "40%" }}>
                                                    <Button type="submit" style={{ width: '90px' }}> Register</Button>
                                                </Row>


                                                <text style={{ color: 'rgb(151, 150, 151)' }}>Already have an account?</text> <a href="#" class="login">Login</a>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
