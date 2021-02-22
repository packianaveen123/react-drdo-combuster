import React, { Component } from 'react'
import { Col, Row, Input, Button,  Form } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
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
                                            <div class="content" style={{ marginLeft: '0px', paddingTop: "6rem" }}>                                     
                                                    <Form >                                                     
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
                                                        {/* <Input
                                                            placeholder="Username"
                                                            prefix={<UserOutlined className="site-form-item-icon" />}
                                                            style={{ width: '350px', backgroundColor: 'transparent', borderColor: '#3e434d ' }}
                                                        /> */}
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

                                                        <Form.Item
                                                            name="Confirm password"
                                                            rules={[{ required: true, message: 'Please confirm your Password!' }]}
                                                        >
                                                            <Input
                                                                style={{ backgroundColor: '#131633' }}
                                                                prefix={<LockOutlined className="site-form-item-icon" />}
                                                                type="password"
                                                                placeholder="Confirm Password"
                                                            />
                                                        </Form.Item>
                                                    </Form>
                                                    <div style={{ paddingTop: '35px', paddingBottom: '30px', paddingLeft: '40%' }}>
                                                        <Button type="submit" style={{ width: '82px' }}> SignUp</Button>
                                                    </div>
                                                    <div>
                                                        <text style={{color:'rgb(151, 150, 151)',fontSize:'18px'}}>Already have an account? <a to="/">Login</a></text>                                                 
                                                    </div>
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
