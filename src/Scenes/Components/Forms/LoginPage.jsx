import React, { Component } from 'react';
import { Col, Row, Input, Button, Form, Alert } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUserParameter, updateAppState } from '../../../Redux/action';

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      IsLogin: false,
      loginState: false
    }
  }
  onFinish = (values) => {
    // loginValidation(values, (data) => {
    //   this.props.updateUserParameter(data)
    // })
    let that = this
    axios.post('http://192.168.0.167:5000/login_validation.php',
      values,
    )
      .then(res => {
        console.log(res.data)
        if (res.data == "success") {
          // this.props.updateUserParameter(values)
          that.props.updateAppState('main')
          that.setState({ redirect: true });
          console.log(res.data)
          // alert("success")
        }
        else if (res.data == "failed") {
          this.state.IsLogin = true;
          console.log(this.state.IsLogin)
          this.setState({ redirect: false });
        }
      })
      .catch(err => {
        console.log(err.res)
      })
  };
  signupEvent = () => {
    this.props.updateAppState('signup');
  }
  forgotPasswordEvent = () => {
    this.props.updateAppState('forgotPassword');
  }
  render() {
    const appData = this.props.app;

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
                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                              />
                            </Form.Item>
                            {
                              this.state.IsLogin ?
                                <Alert className="alert_error" message="Username or Password is Incorrect" type="error" /> : ''}
                            <Form.Item style={{ paddingTop: '35px', paddingBottom: '30px', paddingLeft: '40%' }}>
                              <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            </Form.Item>

                            <div onClick={this.forgotPasswordEvent}>
                              <a class="forgot-pass">Forgot Password?</a><br></br>
                            </div>
                            <div onClick={this.signupEvent} class="signup">
                              <text style={{ color: 'rgb(151, 150, 151)' }}>Do not have an account? <a class="forgot-pass">Signup</a></text>
                            </div>
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
  updateUserParameter,
  updateAppState
}

const login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)

export default login;

