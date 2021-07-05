import React, { Component } from 'react'
import { Col, Row, Input, Button, Form, Alert } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { connect } from 'react-redux';
import { updateAppState, updateForgotEvent } from '../../../Redux/action';
import { forgotValidation } from '../../../Services/requests';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      IsUserName: false
    }
  }

  onFinish = (values) => {
    forgotValidation(values, (data) => {
      if (data == "success") {
        this.props.updateAppState('login');
      }
      else {
        this.state.IsUserName = true;
        this.setState({ redirect: false });
      }
    })
  }

  backToLoginEvent = () => {
    this.props.updateAppState('login');
  }

  render() {
    const IsUserName = this.state.IsUserName;
    console.log(IsUserName)
    return (
      <div class="background">
        <div class="wrapper">
          <div class="form-holder">
            <Row >
              {/* <!-- Logo & Information Panel--> */}
              <Col span={12}  >
                <div class="info">
                  <h1 style={{ color: 'white' }}>TVS Combuster</h1>
                  <p>A product powerd by Vaigunth EnerTek (Pvt.) Ltd.</p>
                </div>
              </Col>
              {/* <!-- Form Panel    --> */}
              <Col span={12} >
                <div class="form d-flex align-items-center">
                  <div class="content">
                    <Form initialValues={{ remember: true }} onFinish={this.onFinish} >
                      <Form.Item
                        name="user_name"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                      >
                        <Input
                          class="form-input"
                          style={{ backgroundColor: '#131633' }}
                          prefix={<UserOutlined className="site-form-item-icon" />}
                          placeholder="Email_ID"
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

                      {IsUserName ? <Alert className="alert_error" message="Please enter a valid Username" type="error" /> : ''}
                      <Form.Item
                        style=
                        {{
                          paddingTop: '35px',
                          paddingBottom: '30px',
                          paddingLeft: '40%'
                        }}
                      >
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="login-form-button"
                          style={{ width: '84px' }}
                        >
                          Submit
                              </Button>
                      </Form.Item>

                      <div onClick={this.backToLoginEvent}>
                        <text style={{ color: 'rgb(151, 150, 151)', fontSize: '18px' }}>Back to Login page?
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
    )
  }
}
const mapStateToProps = state => ({
  app: state.app
})

const mapDispatchToProps = {
  updateAppState,
  updateForgotEvent
}

const forgotPasswordPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword)

export default forgotPasswordPage;