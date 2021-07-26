import React, { Component } from 'react'
import {
  Card, Col, Row, Layout, Divider, Input, Select, Alert,
  Button, Radio, Popover, Space, Typography, message, Menu
} from 'antd';
import {
  DownloadOutlined, PlaySquareOutlined,
  SyncOutlined, PoweroffOutlined,
  QuestionOutlined, RedoOutlined, MinusOutlined,
  CheckOutlined, CloseOutlined
} from '@ant-design/icons';
import {
  initiateShutdown, initiateShowReset,
  initiateCommunicationFailed,
  initiateCommunication, initiateTargetState,
  initiateShowTarget, initiateTurboStart,
  initiateGasOpened, initiateStageOne,
  initiateFuelOpened, initiateStageTwo,
  initiateGasClosed, initiateStageThree,
  getTargetRPM, getTargetTemp,
  getResetTemp, getResetRPM, stopDbInsert, startDbInsert
} from '../../../Redux/action';
import {
  updateChartData, navigateMainPage,
  updateTestIdValue,
  updateTestIdCount, updateTurboMode,
  updateTesterData, updateDropDown
} from '../../../Redux/action';
import ListItems from '../subComponents/ListItems';
import {
  shutdownClickEvent,
  getSensorData,
  getHandleChangetestID,
  requestStatusData
} from '../../../Services/requests';
import { connect } from 'react-redux';
import axios from 'axios';
import { testParamHash, turboConfigValue, helpPopup } from '../../../Services/constants';

var { Option } = Select;
const { Text } = Typography;
const { SubMenu } = Menu;
let count = 1
const { duplicate_msg, warning_Id, warning_mode, warning_name, alert_targetval } = testParamHash;
const { installed_turbine } = turboConfigValue;
const { value, PilotFlameAirc, FuelInjectorAirc, PilotFlameGasc, FCVAirc, FCVKeroseneFuelc, ByPassValueIc, ByPassValueIIc,
  IgnitorSwitchc, KerosenePumpc, LubeOilPumpc } = helpPopup;
class TestPageContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      turboIdDefaultValue: "Select Turbo ID",
      truboIDnum: '',
      turboMode: '',
      testingData: null,
      value: null,
      testerItems: [],
      witnessItems: [],
      turboIdval: '',
      turboIdTestCount: [],
      currentTesterItem: null,
      currentWitnessItem: null,
      isDuplicateTester: false,
      isDuplicateWitness: false,
      visible: false,
      valvestatustime: '',
      valvestatus: '',
      PilotFlameAirc: 'OFF',
      FuelInjectorAirc: 'OFF',
      PilotFlameGasc: 'OFF',
      FCVAirc: 'OFF',
      FCVKeroseneFuelc: 'OFF',
      ByPassValueIc: 'OFF',
      ByPassValueIIc: 'OFF',
      IgnitorSwitchc: 'OFF',
      KerosenePumpc: 'OFF',
      LubeOilPumpc: 'OFF',
      currentDateTime: '',
      turbostartname: [],
      overalldata: [],
      errormsg: '',
      shutdownEnable: false,
      tubineStatus: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.startClick = this.startClick.bind(this);
    this.addTesterItem = this.addTesterItem.bind(this);
    this.addWitnessItem = this.addWitnessItem.bind(this);
    this.handleTesterInput = this.handleTesterInput.bind(this);
    this.handleWitnessInput = this.handleWitnessInput.bind(this);
    this.deleteTesterItem = this.deleteTesterItem.bind(this);
    this.deleteWitnessItem = this.deleteWitnessItem.bind(this);
  }

  componentDidMount() {
    requestStatusData((data) => {
      if (typeof data !== 'string' && data.length > installed_turbine) {
        this.props.navigateMainPage("turboConfig");
      }
    })
  }

  handleVisibleChange = visible => {
    if (this.state.shutdownEnable) {
      this.setState({ visible });
    }
  };

  //add Tester details
  addTesterItem(e) {
    e.preventDefault();
    const { currentTesterItem, testerItems } = this.state
    const newItem = currentTesterItem
    const isDuplicateTester = testerItems.includes(newItem);
    if (isDuplicateTester) {
      this.setState({
        isDuplicateTester: isDuplicateTester
      })
      message.warning(duplicate_msg)
    }
    if (newItem !== null && !isDuplicateTester) {
      this.setState({
        testerItems: [...testerItems, newItem],
        currentTesterItem: null
      })
    }
  }

  //add Witness details
  addWitnessItem(e) {
    e.preventDefault();
    const { currentWitnessItem, witnessItems } = this.state
    const newItem = currentWitnessItem
    const isDuplicateWitness = witnessItems.includes(newItem);
    if (isDuplicateWitness) {
      this.setState({
        isDuplicateWitness: isDuplicateWitness
      })
      message.warning(duplicate_msg)
    }
    if (newItem !== null && !isDuplicateWitness) {
      this.setState({
        witnessItems: [...witnessItems, newItem],
        currentWitnessItem: null
      })
    }
  }

  handleTesterInput(e) {
    this.setState({
      currentTesterItem: e.target.value
    })
  }
  handleWitnessInput(e) {
    this.setState({
      currentWitnessItem: e.target.value
    })
  }
  deleteTesterItem(text) {
    const filteredItems = this.state.testerItems.filter(item => item !== text);
    this.setState({
      testerItems: filteredItems
    })
  }
  deleteWitnessItem(text) {
    const filteredItems = this.state.witnessItems.filter(item => item !== text);
    this.setState({
      witnessItems: filteredItems
    })
  }

  onChangeRadio = (e) => {
    this.setState({
      turboMode: e.target.value
    })
    let data = e.target.value
    this.props.updateTurboMode(data)
  };

  //select the TestId
  handleChangetestID = (value) => {
    this.setState({
      truboIDnum: true
    })
    this.props.updateTestIdValue(value)
    const body = {
      turboIdValue: value
    }
    let that = this;
    //getting data from axios in request page
    getHandleChangetestID(body, (data) => {
      if (data === "" || data.length === 0) {
        that.setState({
          turboIdTestCount: 1
        })
      }
      else {
        that.setState({
          turboIdTestCount: data
        })
      }
      //updating to the store called turboIdTestCount
      this.props.updateTestIdCount(this.state.turboIdTestCount)
    })
  }

  shutdownClick = () => {
    this.setState({
      shutdownInitiated: true,
      shutdownEnable: false
    })
    shutdownClickEvent((data) => {
      //updating to the store called shutdownInitiated
      this.props.initiateShutdown(data)
    })
  }

  requestChartData() {
    axios.get('http://192.168.0.167:5000/graph.php').then(res => {
      let chartdata = res.data;
      //updating to the store called chartdata
      this.props.updateChartData(chartdata);
    }).catch(err => {
      console.log(err);
    })
  }

  sensorData() {
    getSensorData((data) => {
      if (this.props.app.startDbInserting === false) {
        this.props.initiateTurboStart(data);
      }
      else {
        this.props.initiateTurboStart(null)
      }
    })
  }

  communicationstatus() {
    axios.get('http://192.168.0.167:5000/initialize.php')
      .then(res => {
        let CommunicationData = res.data;
        if (CommunicationData.status === "1") {
          this.props.initiateCommunication();
        }
        if (CommunicationData.status === "") {
          this.props.initiateCommunicationFailed();
        }
        this.initializeTestClick()
      })
      .catch((err) => {
        console.log(err);
      })
  }

  handleChange = (e) => {
    this.setState({ testValue: e.target.value })
  }

  initializeClick = () => {
    this.props.startDbInsert();
    this.props.updateDropDown(null);
    if (this.props.app.turboMode === '' || this.props.app.turboMode === undefined) {
      this.setState({
        errormsg: warning_mode
      })
      return
    }
    if (this.props.app.testIdValue === '' || this.props.app.testIdValue === undefined) {
      this.setState({
        errormsg: warning_Id
      })
      return
    }
    if (this.state.testerItems.length === 0) {
      this.setState({
        errormsg: warning_name
      })
      return
    }

    if (this.props.app.testIdValue !== undefined && this.props.app.testIdValue !== "" &&
      this.props.app.turboMode !== '' && this.state.testerItems.length !== 0
      && this.props.app.communication === false) {

      axios.post('http://192.168.0.167:5000/gettestid.php',
        {
          turboIdVal: this.props.app.testIdValue,
          testerItems: this.state.testerItems,
          witnessItems: this.state.witnessItems,
          turboMode: this.props.app.turboMode
        })
        .then(res => {
          this.communicationstatus()
          let interval = setInterval(() => {
            this.sensorData();
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  initializeTestClick = () => {
    var today = new Date(),
      time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    this.setState({
      currentDateTime: time
    })
    axios.get('http://192.168.0.167:8000/testdata.php')
      .then(function (response) {
      })
      .catch((err) => {
        console.log(err);
      })
  }

  onClickhelp = () => {
    var self = this;
    axios.get('http://192.168.0.167:5000/valvestatus.php')
      .then(function (response) {
        let valveData = response.data.valvestatus.split(",")
        console.log(valveData)
        self.setState({
          valvestatustime: response.data.testcommandsTime
        })
        self.setState({
          valvestatus: response.data.valvestatus
        })
        if (valveData[0] === '1') {
          self.setState({
            PilotFlameAirc: "ON"
          })
        }
        if (valveData[1] === '1') {
          self.setState({
            FuelInjectorAirc: "ON"
          })
        }
        if (valveData[2] === '1') {
          self.setState({
            PilotFlameGasc: "ON"
          })
        }
        if (valveData[3] === '1') {
          self.setState({
            FCVAirc: "ON"
          })
        }
        if (valveData[4] === '1') {
          self.setState({
            FCVKeroseneFuelc: "ON"
          })
        }
        if (valveData[5] === '1') {
          self.setState({
            ByPassValueIc: "ON"
          })
        }
        if (valveData[6] === '1') {
          self.setState({
            ByPassValueIIc: "ON"
          })
        }
        if (valveData[7] === '1') {
          self.setState({
            IgnitorSwitchc: "ON"
          })
        }
        if (valveData[8] === '1') {
          self.setState({
            KerosenePumpc: "ON"
          })
        }
        if (valveData[9] === '1') {
          self.setState({
            LubeOilPumpc: "ON"
          })
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  //input onChange values
  onChangeResettempvalue = event => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      this.props.getResetTemp(event.target.value);
    }
  }
  onChangeResetRPMvalue = event => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      this.props.getResetRPM(event.target.value);
    }
  }
  onChangetempvalue = event => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      this.props.getTargetTemp(event.target.value);
    }
  }
  onChangeRPMvalue = event => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      this.props.getTargetRPM(event.target.value);
    }
  }

  resetOnClick = () => {
    axios.post('http://192.168.0.167:5000/reset.php',
      {
        ResetRPM: this.props.app.resetRPM,
        ResetTemp: this.props.app.resetTemp
      })
      .then(res => { })
      .catch((err) => {
        console.log(err);
      })
  }

  startClick = () => {
    if (this.props.app.communication === true) {
      if (this.props.app.targetRPM !== '' && this.props.app.targetTemp !== '') {
        this.props.initiateShowTarget();
        this.setState({
          shutdownEnable: true
        })
        setInterval(() => {
          this.requestChartData();
        }, 1000);
        axios.post('http://192.168.0.167:5000/start.php', { targetRPM: this.props.app.targetRPM, targetTemp: this.props.app.targetTemp },)
          .then(res => {
            let startData = res.data;
            axios.post('http://192.168.0.167:7000/testdatainsert.php')
              .then(function (response) {

              })
          }).catch((err) => {
            console.log(err);
          })
      }
      else {
        this.props.initiateTargetState();
      }
    }
  }
  errorDoneClick = () => {
    this.setState({
      errormsg: ''
    })
  }

  reloadAllEvents = () => {
    this.props.stopDbInsert()
    this.props.updateTestIdCount('');
    this.props.updateTestIdValue('');
    this.props.updateTurboMode('')
    // this.props.initiateCommunicationFailed('');

    this.setState({
      turboIdDefaultValue: "Select Turbo ID",
      turboIdValue: "Select Turbo ID",
      truboIDnum: false,
      turboMode: '',
      testingData: null,
      value: null,
      testerItems: [],
      witnessItems: [],
      currentTesterItem: null,
      currentWitnessItem: null,
      isDuplicateTester: false,
      isDuplicateWitness: false,
      visible: false,
      valvestatustime: '',
      valvestatus: '',
      svcoolingair: 'OFF',
      svpilotflameair: 'OFF',
      svnaturalgastopilotflame: 'OFF',
      svdilution: 'OFF',
      fcvcomplressorair: 'OFF',
      fcvmaingasfuel: 'OFF',
      currentDateTime: '',
      turbostartname: [],
      overalldata: [],
      errormsg: '',
      turboIdTestCount: null
    })

  }
  render() {
    const shutdownInitiated = this.props.app.shutdownInitiated;
    const communicationFailed = this.props.app.communicationFailed;
    const communication = this.props.app.communication;
    const targetState = this.props.app.targetState;
    const showTarget = this.props.app.showTarget;
    const targetTemp = this.props.app.targetTemp;
    const targetRPM = this.props.app.targetRPM;
    const resetTemp = this.props.app.resetTemp;
    const resetRPM = this.props.app.resetRPM;
    const turboStart = this.props.app.turboStart;
    const { Initializedata, Startdata, Shutdowndata, Resetdata } = testParamHash;
    const InitializedataArray = turboStart.filter(it => Initializedata.find(val => val === it.name))
    const StartdataArray = turboStart.filter(it => Startdata.find(val => val === it.name))
    const ShutdowndataArray = turboStart.filter(it => Shutdowndata.find(val => val === it.name))
    const ResetdataArray = turboStart.filter(it => Resetdata.find(val => val === it.name))

    var testIdValue = null;
    if (this.props.app.statusData !== "no_data" && this.props.app.statusData.length !== 0) {
      var testIdValue = this.props.app.statusData.filter(word => word.status === "installed");
    }
    return (
      <div style={{ paddingTop: "25px" }}>
        <Layout style={{ backgroundColor: "#131633", paddingLeft: "20px", minHeight: "768px" }}>
          <div >
            <Menu
              style={{ width: "100%", backgroundColor: 'transparent', paddingRight: '20px' }}
              defaultSelectedKeys={['1']}
              defaultOpenKeys={[this.props.app.testDropdown]}
              theme="dark"
              mode="inline"
            >
              <SubMenu key="sub1" className="test-dropdown" title="Turbine Details" style={{ fontSize: '18px' }}>
                <Layout style={{ backgroundColor: "transparent", paddingTop: "20px", paddingLeft: "20px" }}>
                  <Row style={{ paddingLeft: "20px" }} className="test-mode">
                    <Col xs={8}>
                      <form>
                        <Row>
                          <Col xs={5} style={{ marginTop: '20px' }}>
                            <label htmlFor="text" className="label" >Mode</label>
                          </Col>
                          {/* {
                            communication ?
                              <Radio.Group name="radiogroup"
                                disabled
                                style={{
                                  border: '1px solid #3e434d',
                                  width: "300px",
                                  height: "40px",
                                  paddingTop: '4px',
                                  paddingLeft: '25px'
                                }}>
                                <Radio value={1} style={{ color: 'rgb(151, 150, 151)', fontSize: "18px" }}>Turbo 1</Radio>
                                <Radio value={2} style={{ color: 'rgb(151, 150, 151)', fontSize: "18px" }}>Turbo 2</Radio>
                              </Radio.Group>
                              :
                              <Radio.Group name="radiogroup"
                                defaultValue={this.props.app.turboMode}
                                onChange={this.onChangeRadio}
                                style={{
                                  border: '1px solid #3e434d',
                                  width: "300px",
                                  height: "40px",
                                  paddingTop: '4px',
                                  paddingLeft: '25px'
                                }}>
                                <Radio value={1} style={{ color: 'rgb(151, 150, 151)', fontSize: "18px" }}>Turbo 1</Radio>
                                <Radio value={2} style={{ color: 'rgb(151, 150, 151)', fontSize: "18px" }}>Turbo 2</Radio>
                              </Radio.Group>
                          } */}

                          {/* for drdo */}
                          <Radio.Group name="radiogroup"
                            defaultValue={1}
                            onChange={this.onChangeRadio}
                            style={{
                              border: '1px solid #3e434d',
                              width: "300px",
                              height: "40px",
                              paddingTop: '4px',
                              paddingLeft: '25px'
                            }}>
                            <Radio value={1} style={{ color: 'rgb(151, 150, 151)', fontSize: "18px" }}>Turbo 1</Radio>
                          </Radio.Group>
                        </Row>
                      </form>
                    </Col>
                  </Row>
                  <Row style={{ paddingTop: "2%", paddingLeft: "20px" }}>
                    <Col span={8}>
                      <form>
                        <Row>
                          <Col span={5} style={{ marginTop: '20px' }} >
                            <label htmlFor="text" className="label" >Turbo ID</label>
                          </Col>
                          <Col span={6}>
                            {
                              communication ?
                                <Input.Group compact>
                                  <Select
                                    disabled
                                    defaultValue={this.state.turboIdDefaultValue}
                                    style={{ width: '300px' }}
                                  >
                                  </Select>
                                </Input.Group>
                                :
                                <Input.Group compact>
                                  {
                                    testIdValue && testIdValue.length > 0 ?
                                      <Select
                                        defaultValue={this.state.turboIdDefaultValue}
                                        style={{ width: '300px' }}
                                        onChange={this.handleChangetestID}
                                        value={this.state.turboIdValue}
                                      >
                                        {this.props.app.statusData.map(it => (
                                          <Option key={it.turboname} value={it.turboname}>
                                            {it.turboname}
                                          </Option>
                                        ))}
                                      </Select> : <p type="warning">No active turbines</p>
                                  }
                                </Input.Group>
                            }
                          </Col>
                        </Row>
                      </form>
                      {this.props.app.statusData ?
                        <Row style={{ paddingLeft: '5rem' }}>
                          {
                            this.state.truboIDnum ?
                              <div
                                style={{ color: 'white', marginLeft: '15px', marginTop: '10px' }}
                              >
                                {this.props.app.testIdValue}
                                {
                                  this.props.app.testIdValue ? < MinusOutlined style={{ color: '#42dbdc' }} />
                                    : []
                                }
                                {this.props.app.turboIdTestCount}
                              </div>
                              : []
                          }
                        </Row> : []}
                    </Col>
                    <Col span={8}>
                      <form onSubmit={(e) => this.addTesterItem(e, 'tester')}>
                        <Row>
                          <Col span={4} style={{ marginTop: '20px' }}>
                            <label htmlFor="text" className="label" >Tester</label>
                          </Col>
                          <Col span={15} >
                            {
                              communication ?
                                <Input
                                  disabled
                                  placeholder="Tester"
                                  name="Tester"
                                  style={{ width: "300px" }}
                                />
                                :
                                <Input
                                  placeholder="Tester"
                                  name="Tester"
                                  style={{ width: "300px" }}
                                  value={this.state.currentTesterItem}
                                  onChange={this.handleTesterInput}
                                />
                            }

                          </Col>
                          <Col>
                            <button
                              className="add-btn"
                              type="submit"
                            >+</button>
                          </Col>
                        </Row>
                      </form>
                      <Row style={{ paddingLeft: '5rem' }}>
                        <ListItems items={this.state.testerItems} deleteItem={this.deleteTesterItem} />
                      </Row>
                    </Col>

                    <Col span={8}>
                      <form onSubmit={(e) => this.addWitnessItem(e, 'witness')}>
                        <Row>
                          <Col span={4} style={{ marginTop: '20px' }}>
                            <label htmlFor="text" className="label" >Witness</label>
                          </Col>
                          <Col span={15}>
                            {
                              communication ?
                                <Input
                                  disabled
                                  placeholder="Witness"
                                  name="Witness"
                                  style={{ width: "300px" }}
                                />
                                :
                                <Input
                                  placeholder="Witness"
                                  name="Witness"
                                  style={{ width: "300px" }}
                                  value={this.state.currentWitnessItem}
                                  onChange={this.handleWitnessInput}
                                  onFocus="this.value=''"
                                />
                            }
                          </Col>
                          <Col>
                            <button
                              className="add-btn"
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
                  <Row>
                    {this.state.errormsg ?
                      <Alert message={this.state.errormsg} type="error"
                        action={
                          <Space>
                            <Button size="small" type="ghost" onClick={() => this.errorDoneClick()}>
                              Done
                            </Button>
                          </Space>
                        } /> : ''}
                  </Row>
                </Layout>
              </SubMenu>
            </Menu>
          </div>

          <Row style={{ backgroundColor: "#131633", paddingRight: "20px" }}>
            <Divider style={{ borderColor: "#42dad6", backgroundColor: "#131633", }} />

            <Col span={3}>
              <Card style={{ width: 185, cursor: 'pointer', borderColor: "green" }} >
                <DownloadOutlined className="icon-button1" onClick={() => this.initializeClick()}
                />
                <p style={{ color: '#42dad6', fontSize: "20px", paddingLeft: '20px' }}>Initialize</p>
                {
                  communicationFailed ?
                    <p>
                      <Row>
                        <CloseOutlined style={{ color: 'red', marginTop: '1%' }} />
                        <p>{this.state.currentDateTime}- Communication failed</p>
                      </Row>
                    </p> : []
                }
                {
                  communication ?
                    <p>
                      {InitializedataArray.map(item => {
                        return (
                          <div>
                            <CheckOutlined style={{ color: 'green' }} />
                            {item.testcommandsTime} - {item.name}
                          </div>
                        )
                      })}
                    </p> : []
                }
              </Card>,
            </Col>

            <Col span={2} style={{ marginTop: "30px", paddingRight: "10px", paddingLeft: "20px" }}>
              <hr></hr>
            </Col>

            <Col span={3}>
              <Card style={communication ?
                { width: 185, cursor: 'pointer', borderColor: 'green' } :
                { width: 185, borderColor: 'gray' }}>
                {
                  communication && showTarget !== true ?
                    <PlaySquareOutlined className="icon-button1" onClick={() => this.startClick()} /> :
                    <PlaySquareOutlined className="iconbutton1-basic" />
                }
                {communication ?
                  <p style={{ color: '#42dad6', fontSize: "20px", paddingLeft: '35px' }}> Start</p> :
                  <p style={{ color: 'gray', fontSize: "20px", paddingLeft: '35px' }}> Start</p>
                }

                {
                  communication ?
                    <p>
                      <Row>
                        <Col>
                          <p>Target Temp,</p>
                        </Col>
                        <Col>
                          <p>&nbsp;  RPM</p>
                        </Col>
                      </Row>
                      <Row>
                        <Input
                          placeholder=""
                          value={targetTemp}
                          onChange={this.onChangetempvalue}
                          name="Target_temp"
                          style={{ width: "75px" }}
                        />
                        <Input
                          placeholder=""
                          value={targetRPM}
                          onChange={this.onChangeRPMvalue}
                          name="Targrt_RPM"
                          style={{ width: "75px" }}
                        />
                      </Row>
                    </p> : []
                }
                {
                  targetState ?
                    <Alert
                      className="alert_error"
                      message={alert_targetval}
                      closable
                      style={{ width: '60%' }}
                      type="error" /> : ''
                }
                {
                  showTarget ?
                    <div>Target Temp : {targetTemp}, &nbsp;  RPM : {targetRPM}
                    </div> : []
                }
                {
                  showTarget ?
                    <p style={{ height: '15px', width: "180px" }}>
                      <Row>
                        {StartdataArray.map(item => {
                          return (
                            <div>
                              <CheckOutlined style={{ color: 'green' }} />
                              {item.testcommandsTime} - {item.name}
                            </div>
                          )
                        })}
                      </Row>
                    </p> : []
                }
              </Card>
            </Col>

            <Col span={2} style={{ marginTop: "40px", paddingRight: "10px", paddingLeft: "20px" }}>
              <hr></hr>
            </Col>

            <Col span={3}>
              <Card
                style={StartdataArray.find(it => it.name === 'Stage3') ?
                  { width: 185, cursor: 'pointer', borderColor: 'green' } :
                  { width: 185, borderColor: 'gray' }}>
                {StartdataArray.find(it => it.name === 'Stage3') ?
                  <SyncOutlined style={{ color: 'green' }} className="iconbutton1-basic" /> :
                  <SyncOutlined className="iconbutton1-basic" />
                }

                {StartdataArray.find(it => it.name === 'Stage3') ?
                  <p style={{ color: '#42dad6', fontSize: "19px", paddingLeft: '10px' }}>Reset Temp</p> :
                  <p style={{ color: 'gray', fontSize: "19px", paddingLeft: '10px' }}>Reset Temp</p>
                }

                {communication ?
                  <p>
                    {
                      StartdataArray.find(it => it.name === 'Stage3') ?
                        <p>
                          <Row>
                            <p>Reset Temp-</p>
                            <p> RPM</p>
                          </Row>
                          <Row>
                            <Input
                              value={resetTemp}
                              onChange={this.onChangeResettempvalue}
                              name="ResetTemp"
                              style={{ width: "75px" }}
                            />
                            <Input
                              value={resetRPM}
                              onChange={this.onChangeResetRPMvalue}
                              name="ResetRPM"
                              style={{ width: "75px" }}
                            />
                            <button
                              className="add-btn"
                              onClick={() => this.resetOnClick()}>
                              +
                            </button>
                          </Row>
                        </p>
                        : []
                    }

                    <div>
                      {ResetdataArray.map(item => {
                        return (
                          <div>
                            <CheckOutlined style={{ color: 'green' }} />
                            {item.testcommandsTime} -{item.name}-{item.value}
                            {(() => {
                              if (item.name === "stage3" && count === 1) {
                                this.props.initiateStageThree();
                                count++;
                              }
                            })()}
                          </div>
                        )
                      })}
                    </div>
                  </p>
                  : []}
              </Card>,
            </Col>

            <Col span={2} style={{ marginTop: "40px", paddingRight: "10px", paddingLeft: "20px" }}>
              <hr></hr>
            </Col>

            <Col span={4}>
              <Card style={showTarget ?
                { width: 185, borderColor: "red", cursor: 'pointer' } :
                { width: 185, borderColor: "gray" }}
              >
                <div>
                  {
                    showTarget ?
                      <PoweroffOutlined className='icon-button3' onClick={() => this.shutdownClick()} /> :
                      <PoweroffOutlined className='iconbutton3-basic' />
                  }
                </div>
                {
                  showTarget ?
                    <p style={{ color: '#42dad6', fontSize: "20px", paddingLeft: '15px' }}>Shutdown</p> :
                    <p style={{ color: 'gray', fontSize: "20px", paddingLeft: '15px' }}>Shutdown</p>
                }

              </Card>,
              {
                shutdownInitiated ?
                  <p style={{ height: '15px', color: 'white' }}>
                    <Row>
                      {ShutdowndataArray.map(item => {
                        return (
                          <div>
                            <CheckOutlined style={{ color: 'green' }} />
                            {item.testcommandsTime} - {item.name}
                          </div>
                        )
                      })}
                    </Row></p> : []
              }
            </Col>

            <Col span={3}>
              <Card
                style={(shutdownInitiated || showTarget === false) ?
                  { width: 100, cursor: 'pointer', borderColor: 'green' } :
                  { width: 100, borderColor: 'gray' }}>
                <div>
                  {(shutdownInitiated || showTarget === false) ?
                    <RedoOutlined className="icon-button2" onClick={() => this.reloadAllEvents()} /> :
                    <RedoOutlined className="iconbutton2-basic" />
                  }
                </div>
                {
                  (shutdownInitiated || showTarget === false) ?
                    < p style={{ color: '#42dad6', fontSize: "20px" }}>Reset</p> :
                    <p style={{ color: 'gray', fontSize: "20px" }}>Reset</p>
                }
              </Card>,
            </Col>

            <Col span={2}>
              <Popover
                title={<div><p style={{ fontWeight: 'bold' }}>{value} {this.state.valvestatustime}</p></div>}
                content={
                  <div>
                    <p>{PilotFlameAirc} {this.state.PilotFlameAirc} </p>
                    <p>{FuelInjectorAirc} {this.state.FuelInjectorAirc}</p>
                    <p>{PilotFlameGasc} {this.state.PilotFlameGasc}</p>
                    <p>{FCVAirc} {this.state.FCVAirc}</p>
                    <p>{FCVKeroseneFuelc} {this.state.FCVKeroseneFuelc}</p>
                    <p>{ByPassValueIc} {this.state.ByPassValueIc}</p>
                    <p>{ByPassValueIIc} {this.state.ByPassValueIIc}</p>
                    <p>{IgnitorSwitchc} {this.state.IgnitorSwitchc}</p>
                    <p>{KerosenePumpc} {this.state.KerosenePumpc}</p>
                    <p>{LubeOilPumpc} {this.state.LubeOilPumpc}</p>
                  </div>
                }

                trigger="click"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
              >
                <Card
                  style={showTarget ?
                    { width: 100, cursor: 'pointer', borderColor: 'green' } :
                    { width: 100, borderColor: 'gray' }}>
                  <div>
                    {
                      showTarget ? <QuestionOutlined className="icon-button4" onClick={this.onClickhelp} /> :
                        <QuestionOutlined className="iconbutton4-basic" />
                    }
                  </div>
                  {
                    showTarget ? <p style={{ color: '#42dad6', fontSize: "20px" }}>Help</p> :
                      <p style={{ color: 'gray', fontSize: "20px" }}>Help</p>
                  }
                </Card>
              </Popover>
            </Col>
          </Row>
        </Layout>

      </div >
    )
  }
}
const mapStateToProps = state => ({
  app: state.app
})

const mapDispatchToProps = {
  navigateMainPage,
  initiateShutdown, initiateShowReset,
  initiateCommunicationFailed, initiateCommunication,
  initiateTargetState, initiateShowTarget,
  initiateTurboStart, initiateGasOpened,
  initiateStageOne, initiateFuelOpened,
  initiateStageTwo, initiateGasClosed,
  initiateStageThree, getTargetRPM,
  getTargetTemp, getResetTemp,
  getResetRPM, updateChartData,
  stopDbInsert, startDbInsert,
  updateTestIdValue, updateTestIdCount,
  updateTurboMode, updateTesterData,
  updateDropDown
}

const TestContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TestPageContainer)
export default TestContainer;
