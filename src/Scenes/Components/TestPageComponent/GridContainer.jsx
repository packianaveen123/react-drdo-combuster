import React, { Component } from 'react'
import { Card, Col, Row, Layout, Divider, Input, Select } from 'antd';
import {
  DownloadOutlined, PlaySquareOutlined,
  SyncOutlined, PoweroffOutlined,
  QuestionOutlined, RedoOutlined
} from '@ant-design/icons';
import { updateTestingPage } from '../../../Redux/action';
import { connect } from 'react-redux';
import RadioButton from '../RadioButton';
import ListItems from '../../ListItems';

const { Option } = Select;
const { TextArea } = Input;

class GridContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      testerItems: [],
      witnessItems: [],
      currentTesterItem: {
        text: ''
      },
      currentWitnessItem: {
        text: ''
      }
    }
    this.addItem = this.addItem.bind(this);
    this.handleTesterInput = this.handleTesterInput.bind(this);
    this.handleWitnessInput = this.handleWitnessInput.bind(this);
    this.deleteTesterItem = this.deleteTesterItem.bind(this);
    this.deleteWitnessItem = this.deleteWitnessItem.bind(this);
  }

  addItem(e, key) {
    console.log(e, key)
    e.preventDefault();
    const { currentTesterItem, currentWitnessItem, testerItems, witnessItems } = this.state
    const newItem = key === 'tester' ? currentTesterItem : currentWitnessItem
    if (newItem.text !== "") {
      key === 'tester' ?
        this.setState({ testerItems: [...testerItems, newItem] }) :
        this.setState({ witnessItems: [...witnessItems, newItem] })
    }
  }
  handleTesterInput(e) {
    this.setState({
      currentTesterItem: {
        text: e.target.value
      }
    })
  }
  handleWitnessInput(e) {
    this.setState({
      currentWitnessItem: {
        text: e.target.value
      }
    })
  }
  deleteTesterItem(e, key) {
    const { testerItems, witnessItems } = this.state
    const selectItem = key === 'tester' ? testerItems : witnessItems
    const filteredItems = this.state.testerItems.filter(item =>
      item.key !== key);
    this.setState({
      testerItems: [filteredItems, selectItem]
    })
  }
  deleteWitnessItem(key) {
    const { testerItems, witnessItems } = this.state
    const selectItem = key === 'witness' ? testerItems : witnessItems
    const filteredItems = this.state.witnessItems.filter(item =>
      item.key !== key);
    this.setState({
      witnessItems: [filteredItems, selectItem]
    })
  }

  render() {
    const testIdValue = this.props.app.turboConfig;

    return (
      <div style={{ paddingTop: "30px" }}>
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
                        {testIdValue.map(it => (
                          <Option key={it.TurboID} value={it.TurboID}>
                            {it.TurboID}
                          </Option>
                        ))}
                      </Select>
                    </Input.Group>
                  </Col>
                </Row>
              </form>
            </Col>
            <Col xs={8}>
              <form onSubmit={(e) => this.addItem(e, 'tester')}>
                <Row>
                  <Col span={4}>
                    <label for="text" class="label" >Tester</label>
                  </Col>
                  <Col span={15} >
                    <Input placeholder="Tester"
                      name="Tester"
                      style={{ width: "300px" }}
                      value={this.state.currentTesterItem.text}
                      onChange={this.handleTesterInput}
                    />
                  </Col>
                  <Col>
                    <button
                      style={{ width: "2em", height: '3em', backgroundColor: '#42dbdc' }}
                      type="submit"
                    >+</button>
                  </Col>
                </Row>
              </form>
              <Row style={{ paddingLeft: '5rem' }}>
                <Select
                  mode="multiple"
                  defaultValue={this.state.testerItems}
                  onChange={this.deleteTesterItem}
                  style={{ width: '100%' }}
                />
                {/*                 
                <ListItems items={this.state.testerItems} deleteItem={this.deleteTesterItem} /> */}
              </Row>
            </Col>

            <Col xs={8}>
              <form onSubmit={(e) => this.addItem(e, 'witness')}>
                <Row>
                  <Col span={4}>
                    <label for="text" class="label" >Witness</label>
                  </Col>
                  <Col span={15}>
                    <Input placeholder="Witness"
                      name="Witness"
                      style={{ width: "300px" }}
                      placeholder="Enter Witness"
                      value={this.state.currentWitnessItem.text}
                      onChange={this.handleWitnessInput}
                    />
                  </Col>
                  <Col>
                    <button
                      style={{ width: "2em", height: '3em', backgroundColor: '#42dbdc' }}
                      type="submit"
                    >+</button>
                  </Col>
                </Row>
              </form>
              <Row style={{ paddingLeft: '5rem' }}>
                <ListItems items={this.state.witnessItems} deleteItem={this.deleteWitnessItem} />
              </Row>
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
