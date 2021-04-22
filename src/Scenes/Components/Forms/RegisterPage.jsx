import React, { Component } from 'react'
import { Col, Row, Input, Button, Form, Alert } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateAppState } from '../../../Redux/action';
class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IsuserName_reg: false,
      Isemail_reg: false

    }
  }
  onFinish = (values) => {
    axios.post('http://192.168.0.167:5000/Registration.php',
      values,
    )
      .then(res => {
        console.log(res.data)
        if (res.data == "success") {
          this.setState({ redirect: true });
          this.props.updateAppState('login');

        }
        else if (res.data == "Sorry... username already taken") {
          this.state.IsuserName_reg = true;
          console.log(this.state.IsuserName_reg)
          this.setState({ redirect: false });
        }
        else if (res.data == "email already taken") {
          this.state.Isemail_reg = true;
          console.log(this.state.Isemail_reg)
          this.setState({ redirect: false });
        }
      })

      .catch(err => {
        console.log(err.res)
      })
  };
  backToLoginEvent = () => {
    this.props.updateAppState('login');
    console.log(this.props.initiateRegisterState)
  }

  render() {
    const IsuserName_reg = this.state.IsuserName_reg;
    const Isemail_reg = this.state.Isemail_reg;

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
                      <div class="content" style={{ marginLeft: '0px', paddingTop: "4rem" }}>
                        <Form
                          name="register"
                          initialValues={{ remember: true }}
                          onFinish={this.onFinish}
                        >
                          <Form.Item
                            name="user_name"
                            rules={[{ required: true, message: 'Please input your username!', }]}
                          >
                            <Input
                              style={{ backgroundColor: '#131633' }}
                              prefix={<UserOutlined className="site-form-item-icon" />}
                              placeholder="Username"
                            />
                          </Form.Item>

                          <Form.Item
                            name="user_email"
                            rules={[
                              {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                              },
                              {
                                required: true,
                                message: 'Please input your E-mail!',
                              },
                            ]}
                          >
                            <Input
                              style={{ backgroundColor: '#131633' }}
                              prefix={<MailOutlined className="site-form-item-icon" />}
                              placeholder="E-Mail "
                            />
                          </Form.Item>

                          <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                            hasFeedback
                          >
                            <Input.Password
                              style={{ backgroundColor: '#131633' }}
                              prefix={<LockOutlined className="site-form-item-icon" />}
                              placeholder="Password"
                              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                          </Form.Item>

                          <Form.Item
                            name="Confirm"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                              {
                                required: true,
                                message: 'Please confirm your Password!'
                              },
                              ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                  }

                                  return Promise.reject('The two passwords that you entered do not match!');
                                },
                              }),
                            ]}
                          >
                            <Input.Password
                              style={{ backgroundColor: '#131633' }}
                              prefix={<LockOutlined className="site-form-item-icon" />}
                              placeholder="Confirm Password"
                              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                          </Form.Item>

                          {IsuserName_reg ? <Alert className="alert_error" message="Sorry... username already taken" type="error" /> : ''}
                          <Form.Item
                            style={{
                              paddingTop: '35px',
                              paddingBottom: '30px',
                              paddingLeft: '40%'
                            }}

                          >
                            <Button type="primary" htmlType="submit" style={{ width: '82px' }}>
                              Signup
                          </Button>
                          </Form.Item>

                          <div onClick={this.backToLoginEvent}>
                            <text style={{ color: 'rgb(151, 150, 151)', fontSize: '18px' }}>Already have an account?
                            <a class="forgot-pass">Login</a></text>
                          </div>

                        </Form>
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
const mapStateToProps = state => ({
  app: state.app
})

const mapDispatchToProps = {
  updateAppState
}

const registerPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage)
export default registerPage;
