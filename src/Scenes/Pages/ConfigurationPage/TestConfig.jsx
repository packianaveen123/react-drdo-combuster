import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTestConfig } from '../../../Redux/action';
import { Col, Row, Layout, Input, Button, InputNumber, Form } from 'antd';
import SearchBox from '../../Components/SearchBox';
import TableElement from '../../Components/TableElement';

class TestConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testData: ""
    }
  }

  render() {
    const testdata = this.props.app;
    return (
      <div style={{ paddingTop: "1px" }}>
        <Layout class="layout-container">
          <h2 class="h2" >Test Configuration</h2>
          <Form onFinish={this.onFinish}>
            <Row style={{ paddingTop: "20px" }} >
              <Col sm={2}>
                <label htmlFor="name" class="label">Name<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
                <span> &nbsp; &nbsp; &nbsp;</span>
              </Col>
              <Col sm={10}>
                <Form.Item>
                  <Input style={{ Color: "#666873" }} placeholder="Name" />
                </Form.Item>
              </Col>

              <Col sm={2}>
                <label class="label" >Value<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
              </Col>
              <Col sm={10}>
                <Form.Item>
                  <InputNumber
                    min={-100} max={100}
                    onChange={onChange}
                    placeholder="Value"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row style={{ paddingTop: '25px', paddingLeft: "30%", paddingBottom: '30px' }}>
              <Col xs={4}>
                <Form.Item>
                  <Button htmlType="submit"> Save</Button>
                </Form.Item>
              </Col>
              <Col xs={4}>
                <Form.Item>
                  <Button > Clear</Button>
                </Form.Item>
              </Col>
              <Col xs={4}>
                <Form.Item>
                  <Button > Reset</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Layout>

        <div style={{ paddingTop: "35px" }}>
          <Layout class="bottom-container">
            <Row>
              <Col span={8}>
                <h2 class="h2">Test Configuration</h2>
              </Col>
              <Col span={10}>
                <SearchBox />
              </Col>
              
            </Row>
            {testdata.testConfig ?
              <TableElement
                data={testdata.testConfig ? testdata.testConfig : []}
                editable={true}
              /> : []}
          </Layout>
        </div>
      </div>
    )
  }
}
const onChange = (value) => (
  console.log('changed', value)
)

const mapStateToProps = state => ({
  app: state.app
})

const mapDispatchToProps = {
  updateTestConfig
}

const testContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TestConfig)
export default testContainer;