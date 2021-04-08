import React, { Component } from 'react'
import { Col, Row, Layout, Input, Button, Select, Form } from 'antd';
import axios from 'axios';
import { updateTitleElements } from '../../../Redux/action'
import { connect } from 'react-redux';
import TableElement from '../../Components/subComponents/TableElement'
const { Option } = Select;
class RunningReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
    this.props.updateTitleElements({
      title: 'Running Report',
      type: 'Report',
    })
  }
  onFinish = (values) => {
    axios.post('http://localhost/TVS/graph_data.php',
      values
    )
    console.log(values)
      .then(res => {
        console.log(res.data)

        if (res.data === "success") {
          console.log(values)
          alert("success")
        }
        else if (res.data === "failed") {
          alert("incorrect ")
        }
      })
      .catch(err => {
        console.log(err.res)
      })
  }
  render() {
    return (
      <div style={{ paddingTop: "1px" }}>
        <Layout class="layout-container">
          <h2 class="h2">Running Report</h2>
          <Form onFinish={this.onFinish}>

            <Row style={{ paddingTop: "20px" }} >

              <Col sm={2}>
                <label class="label" >Turbo ID<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
                <span> &nbsp; &nbsp; &nbsp;</span>
              </Col>
              <Col sm={10}>
                <Col sm={10}>
                  <Form.Item name="option">
                    <Input.Group compact>
                      <Select defaultValue="Select" style={{ width: '450px' }}>
                        <Option value="Option1">Option1</Option>
                        <Option value="Option2">Option2</Option>
                        <Option value="Option3">Option3</Option>
                        <Option value="Option4">Option4</Option>
                      </Select>
                    </Input.Group>
                  </Form.Item>
                </Col>
              </Col>

              <Col sm={2}>
                <label class="label">Test No<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
                <span> &nbsp; &nbsp; &nbsp;</span>
              </Col>
              <Col sm={10}>
                <Form.Item name="options">
                  {/* <Input.Group compact>
                    <Select defaultValue="Select" value="options" style={{ width: '450px' }}>
                      <Option value="Option1">Option1</Option>
                      <Option value="Option2">Option2</Option>
                      <Option value="Option3">Option3</Option>
                      <Option value="Option4">Option4</Option>
                    </Select>
                  </Input.Group> */}
                  <Input
                    style={{ backgroundColor: '#131633' }}

                    placeholder="Username"
                  />
                </Form.Item>
              </Col>

            </Row>

            <Row style={{ paddingTop: '25px', paddingLeft: "30%", paddingBottom: '30px' }}>
              <Col xs={4}>
                <Form.Item>
                  <Button htmlType="submit"> view</Button>
                </Form.Item>
              </Col>
              <Col xs={4}>
                <Form.Item>
                  <Button > Clear</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Layout>

        <Layout class="bottom-container" style={{ paddingTop: '50px', paddingBottom: '30px' }}>
          <TableElement />
        </Layout>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  app: state.app
})
const mapDispatchToProps = {
  updateTitleElements
}

const runningReport = connect(
  mapStateToProps,
  mapDispatchToProps
)(RunningReport)

export default runningReport;