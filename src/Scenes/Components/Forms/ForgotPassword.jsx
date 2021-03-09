import React, { Component } from 'react'
import { Col, Row, Input, Button, Form ,Alert} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      IsUserName: false
    }
  }

  onFinish = (values) => {
    axios.post('http://localhost/TVS/forget.php',
      values,
    )

      .then(res => {
        console.log(res.data)
        if (res.data == "success") {
          //this.setState({redirect: true});
          alert("success")
        }
        else {
          // alert('Please enter a valid Username');
          this.state.IsUserName = true;
          this.setState({ redirect: false });
        }
        //console.log(res)
      })
      .catch(err => {
        console.log(err.res)
      })
  };

  render() {
    const IsUserName = this.state.IsUserName;
    console.log(IsUserName)
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
                      <div class="content" style={{ marginLeft: '0px', paddingTop: "6rem" }}>
                        <Form
                          initialValues={{ remember: true }}
                          onFinish={this.onFinish}
                        >
                          <Form.Item
                            name="user_name"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                          >
                            <Input
                              class="form-input"
                              style={{ backgroundColor: '#131633' }}
                              prefix={<UserOutlined className="site-form-item-icon" />}
                              placeholder="Username"
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
                            />
                          </Form.Item>

                          {IsUserName ? <Alert className="alert_error" message="Please enter a valid Username" type="error" /> : ''}
                          <Form.Item style={{ paddingTop: '35px', paddingBottom: '30px', paddingLeft: '40%' }}>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '84px' }}>
                              Submit
                              </Button>

                          </Form.Item>

                          <div>
                            <text style={{ color: 'rgb(151, 150, 151)', fontSize: '18px' }}>Back to Login page? <a to="/">Login</a></text>
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
export default ForgotPassword;