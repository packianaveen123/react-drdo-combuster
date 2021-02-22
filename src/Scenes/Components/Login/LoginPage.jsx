import React, { Component } from 'react';
import { Col, Row, Input, Button, Form } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default class LoginPage extends Component {
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
                                                <div style={{ marginLeft: '0px', paddingTop: "9rem" }}>


                                                    <Form >
                                                        {/* <Form.Item
                                                            name="username"
                                                            rules={[{ required: true, message: 'Please input your Username!' }]}
                                                        >
                                                            <Input   style={{backgroundColor:'#131633'}} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                                                        </Form.Item> */}

                                                        <Form.Item
                                                            name="Username"
                                                            rules={[{ required: true, message: 'Please input your username!' }]}
                                                        >
                                                            <Input
                                                                style={{ backgroundColor: '#131633' }}
                                                                prefix={<UserOutlined className="site-form-item-icon" />}
                                                                placeholder="Username"
                                                            />
                                                        </Form.Item>


                                                        <Form.Item
                                                            name="password"
                                                            rules={[{ required: true, message: 'Please input your Password!' }]}
                                                        >
                                                            <Input
                                                                style={{ backgroundColor: '#131633' }}
                                                                prefix={<LockOutlined className="site-form-item-icon" />}
                                                                type="password"
                                                                placeholder="Password"
                                                            />
                                                        </Form.Item>
                                                    </Form>

                                                    <Row style={{ paddingTop: '35px', paddingBottom: '30px', paddingLeft: '40%' }}>
                                                        <Button type="submit"> Login</Button>
                                                    </Row>
                                                    <a href="#" class="forgot-pass">Forgot Password?</a><br></br>
                                                    <text style={{ color: 'rgb(151, 150, 151)' }}>Do not have an account?</text> <a href="#" class="signup">Signup</a>

                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
