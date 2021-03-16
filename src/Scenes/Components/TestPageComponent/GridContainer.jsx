import React, { Component } from 'react'
import { Card, Col, Row, Layout, Divider, Input, Select, Button } from 'antd';
import {
  DownloadOutlined, PlaySquareOutlined,
  SyncOutlined, PoweroffOutlined,
  QuestionOutlined, RedoOutlined, DeleteOutlined
} from '@ant-design/icons';
import { updateTestingPage } from '../../../Redux/action';
import { connect } from 'react-redux';
import RadioButton from '../RadioButton';

const { Option } = Select;

class GridContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      testIdValue : [],
      value: '',
      list: [],
    }
  }


  onChangeValue = event => {
    this.setState({ value: event.target.value });
  };

  onAddItem = () => {
    this.setState(state => {
      // const list = state.list.concat(state.value);
      const list = [...state.list, state.value];
      return {
        list,
        value: '',
      };
    });
  };

  render() {
    const appData = this.props.app;    
    const testIdValue = this.props.app.turboConfig;
    console.log(testIdValue);
    // const doubleValue = testIdValue.map()
    const lists = this.state.list;
    return (
      <div style={{ paddingTop: "30px" }}>
        <ul>
          {lists.map(item => {
            <li key={item}>{item}<DeleteOutlined style={{ color: "white" }} /></li>
            console.log(lists);
          })}
        </ul>
        <Layout style={{ backgroundColor: "#131633", paddingTop: "20px", paddingLeft: "20px" }}>
          <Row>
            <Col xs={8} style={{ paddingLeft: "20px" }}>
              <form>
                <Row>
                  <Col xs={5}>
                    <label for="text" class="label" >Mode</label>
                  </Col>
                  <RadioButton />
                </Row>
              </form>
            </Col>
          </Row>
          <Row style={{ paddingTop: "28px", paddingLeft: "20px" }}>
            <Col span={8}>
              <form>
                <Row>
                  <Col span={5}>
                    <label for="text" class="label" >Turbo ID</label>
                  </Col>
                  <Col span={6}>
                    <Input.Group compact>
                      <Select defaultValue="Select Turbo ID" style={{ width: '300px' }}>
                        <Option value="Option1">
                          {testIdValue.map(turbo_id => {
                            <li key={turbo_id}>{turbo_id}</li>
                            //console.log(testIdValue);
                          })}
                           {/* <span>{testIdValue ? testIdValue.turbo_id : ''}</span> */}
                        </Option>
                        {/* <Option value="Option2">Option2</Option>
                        <Option value="Option3">Option3</Option>
                        <Option value="Option4">Option4</Option> */}
                      </Select>
                    </Input.Group>
                  </Col>
                </Row>
              </form>
            </Col>
            <Col xs={8}>
              <form>
                <Row>
                  <Col span={4}>
                    <label for="text" class="label" >Tester</label>
                  </Col>
                  <Col span={15} >
                    <Input placeholder="Tester"
                      name="Tester"
                      style={{ width: "300px" }}
                      value={this.state.value}
                      onChange={this.onChangeValue}
                    />
                    {this.state.list ?
                      <div style={{ color: 'white' }}>{this.state.list}</div> : []}

                  </Col>
                  <Col>
                    <Button
                      style={{ width: "2px" }}
                      onClick={this.onAddItem}
                    >+</Button>
                  </Col>
                </Row>
              </form>
            </Col>
            <Col xs={8}>
              <form>
                <Row>
                  <Col span={4}>
                    <label for="text" class="label" >Witness</label>
                  </Col>
                  <Col span={15}>
                    <Input placeholder="Witness" style={{ width: "300px" }} />
                  </Col>
                  <Col>
                    <Button style={{ width: "2px" }}>+</Button>
                  </Col>
                </Row>
              </form>
            </Col>
          </Row>

          <Row style={{ paddingTop: "20px", paddingRight: "20px" }}>
            <Divider style={{ borderColor: "#42dad6" }} />
            <Col span={4}>
              <Card style={{ width: 200 }}>
                <DownloadOutlined style={{ paddingLeft: '40px', paddingTop: '1px', color: 'gray', fontSize: "30px" }} />
                <p style={{ color: 'gray', fontSize: "20px", paddingLeft: '20px' }}>Initialize</p>
              </Card>,
            </Col>
            <Col span={2} style={{ marginTop: "40px", paddingRight: "20px" }}>
              <hr ></hr>
            </Col>
            <Col span={4}>
              <Card style={{ width: 200 }}>
                <PlaySquareOutlined style={{ paddingLeft: '40px', paddingTop: '1px', color: 'gray', fontSize: "30px" }} />
                <p style={{ color: 'gray', fontSize: "20px", paddingLeft: '35px' }}> Start</p>
              </Card>,
            </Col>
            <Col span={2} style={{ marginTop: "40px", paddingRight: "20px" }}>
              <hr></hr>
            </Col>
            <Col span={4}>
              <Card style={{ width: 200 }}>
                <SyncOutlined style={{ paddingLeft: '40px', paddingTop: '1px', color: 'gray', fontSize: "30px" }} />
                <p style={{ color: 'gray', fontSize: "19px", paddingLeft: '10px' }}>Reset Temp</p>
              </Card>,
            </Col>
            <Col span={2} style={{ marginTop: "40px", paddingRight: "20px" }}>
              <hr></hr>
            </Col>
            <Col span={4}>
              <Card style={{ width: 200, borderColor: "red" }}>
                <div onClick={this.onClick}>
                  <PoweroffOutlined style={{ paddingLeft: '40px', paddingTop: '1px', color: 'red', fontSize: "30px" }} />
                </div>
                <p style={{ color: '#42dad6', fontSize: "20px", paddingLeft: '15px' }}>Shutdown</p>
              </Card>,
            </Col>
            <Col span={2}>
              <RedoOutlined style={{ color: 'green', fontSize: "45px" }} /><br></br>
              <QuestionOutlined style={{ color: 'red', fontSize: "50px" }} />
            </Col>
          </Row>
        </Layout>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  app: state.app
})

const mapDispatchToProps = {
  updateTestingPage
}

const Grid = connect(
  mapStateToProps,
  mapDispatchToProps
)(GridContainer)
export default Grid;
