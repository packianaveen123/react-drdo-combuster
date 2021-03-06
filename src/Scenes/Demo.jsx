import React, { Component } from 'react';
import { Col, Row, Input, Button, Form, Checkbox, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';


import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
export default class Demo extends Component {

  render() {
    const onFinish = (values) => {
      console.log('Received values of form: ', values);
    };
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
                        <h1 style={{ color: 'white' }}>TVS Combuster</h1>
                        <p>A product powerd by Vaigunth EnerTek (Pvt.) Ltd.</p>
                      </div>
                    </div>
                  </Col>
                  {/* <!-- Form Panel    --> */}
                  <Col span={12} >
                    <div class="form d-flex align-items-center">
                      <div class="content">
                        <div style={{ marginLeft: '35px', paddingTop: "9rem" }}>
                          <Row style={{ paddingTop: "1rem" }} >
                            <Input
                              placeholder="Enter your username"
                              prefix={<UserOutlined className="site-form-item-icon" />}
                              rules={[
                                {
                                  required: true,
                                  message: 'Please input your Username!',
                                },
                              ]}
                              style={{ width: '400px', backgroundColor: 'transparent', borderColor: '#3e434d ' }}
                            />
                          </Row>
                          <Row style={{ paddingTop: "20px" }}>
                            
                              <Input.Password
                                placeholder="Confirm password"
                                prefix={<LockOutlined className="site-form-item-icon" style={{ color: 'white' }} />}
                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                style={{ width: '400px', backgroundColor: 'transparent', borderColor: '#3e434d ' }}
                              />
                              <Row style={{ paddingTop: "20px" }}> 
                                <Input
                                  prefix={<LockOutlined className="site-form-item-icon" />}
                                  type="password"
                                  placeholder="Password"
                                  style={{ width: '400px', backgroundColor: 'transparent', borderColor: '#3e434d ' }}
                                />
                              </Row>
                            </Row>

                          {/* <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                          >
                            <Input style={{ backgroundColor: '#131633' }} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                          </Form.Item>
                          <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                              remember: true,
                            }}
                            onFinish={onFinish}
                          >
                            <Form.Item
                              name="username"
                              rules={[
                                {
                                  required: true,
                                  message: 'Please input your Username!',
                                },
                              ]}
                            >
                              <Input
                                style={{ backgroundColor: '#131633' }}
                                prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                              name="password"
                              rules={[
                                {
                                  required: true,
                                  message: 'Please input your Password!',
                                },
                              ]}
                            >
                              <Input.Password style={{ backgroundColor: '#131633' }}
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                              />
                            </Form.Item>
                            <Form.Item>
                              <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                              </Form.Item>

                              <a className="login-form-forgot" href="">
                                Forgot password
                              </a>
                            </Form.Item>

                            <Form.Item>
                              <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                              </Button>
                                     Or <a href="">register now!</a>
                            </Form.Item>
                          </Form> */}


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
