import React, { Component } from 'react';
import { Col, Row, Input, Button, Form } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { connect } from 'react-redux';

import { updateUserParameter } from '../../../Redux/action';

class LoginPage extends Component {
  constructor(props){
    super(props)
    this.state={

    }
  }
  onFinish = (values) => {
    axios.post('http://localhost/TVS/login_validation.php',
      values,
    )

    .then(res => {
      console.log(res.data)

      if (res.data == "success") {
        this.props.updateUserParameter(values)
        //this.setState({ redirect: true });
        //console.log(values)
        alert("success")
      }
      else if (res.data == "failed") {
        alert("incorrect password or username")
      }
    })
    .catch(err => {
      console.log(err.res)
    })
};
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
                        <h1 style={{ color: 'white' }}>TVS Combuster</h1>
                        <p>A product powerd by Vaigunth EnerTek (Pvt.) Ltd.</p>
                      </div>
                    </div>
                  </Col>
                  {/* <!-- Form Panel    --> */}
                  <Col span={12} >
                    <div class="form d-flex align-items-center">
                      <div class="content">
                        <div style={{ marginLeft: '0px', paddingTop: "9rem" }}>
                          <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={this.onFinish}
                          >
                            <Form.Item
                              name="user_name"
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
                              <Input.Password
                                style={{ backgroundColor: '#131633' }}
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                              />
                            </Form.Item>

                            <Form.Item style={{ paddingTop: '35px', paddingBottom: '30px', paddingLeft: '40%' }}>
                              <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            </Form.Item>

                            <a href="#" class="forgot-pass">Forgot Password?</a><br></br>
                            <text style={{ color: 'rgb(151, 150, 151)' }}>Do not have an account?</text> <a href="#" class="signup">Signup</a>
                          </Form>
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

const mapStateToProps = state => ({
  app: state.app
})

const mapDispatchToProps = {
  updateUserParameter
}

const login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)

export default login;

