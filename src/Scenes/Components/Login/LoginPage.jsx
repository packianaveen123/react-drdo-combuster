import React, { Component } from 'react'
import { Col, Row, Layout, Input, Button, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { RiLockPasswordFill } from "react-icons/ri";
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined } from '@ant-design/icons';
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
                                                <div style={{ marginLeft: '50px' }}>
                                                    <Row style={{ paddingTop: "8rem" }} >
                                                        {/* <Col sm={4}>
                                                            <label htmlFor="name" style={{ color: 'rgb(151, 150, 151)', fontSize: '15px' }}>Name<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
                                                            <span> &nbsp; &nbsp; &nbsp;</span>
                                                        </Col>
                                                        <Col sm={8}>
                                                            <Input style={{ Color: "#666873", width: '350px' }} placeholder="Name" />
                                                        </Col> */}


                                                        <Input
                                                            placeholder="Enter your username"
                                                            prefix={<UserOutlined className="site-form-item-icon" />}
                                                            style={{ width: '350px', backgroundColor: 'transparent', borderColor: '#3e434d ' }}
                                                        />                                                    
                                                    </Row>
                                                    <Row style={{ paddingTop: "30px" }} >
                                                        {/*<Col sm={4}>
                                                            <label htmlFor="password" style={{ color: 'rgb(151, 150, 151)', fontSize: '15px' }}>Password<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>

                                                        </Col>
                                                        <Col sm={8}>
                                                            <Input style={{ Color: "#666873", width: '350px' }} placeholder="password" />
                                                        </Col> */}
                                                        <Space direction="vertical">

                                                            <Input.Password
                                                                placeholder="Confirm password"
                                                                prefix={<LockOutlined className="site-form-item-icon" style={{ color: 'white' }} />}
                                                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                                                style={{ width: '350px', backgroundColor: 'transparent', borderColor: '#3e434d ' }}
                                                            />

                                                            <Input
                                                                prefix={<LockOutlined className="site-form-item-icon" />}
                                                                type="password"
                                                                placeholder="Password"
                                                                style={{ width: '350px', backgroundColor: 'transparent', borderColor: '#3e434d ' }}
                                                            />
                                                        </Space>,
                                                    </Row>
                                                    <Row style={{ paddingTop: '35px', paddingBottom: '30px', paddingLeft: '30%' }}>

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
