import React, { Component } from 'react'
import { Card, Col, Row, Layout, Divider, Input, Select, Alert, Button, Radio, Popover, Space } from 'antd';
import {
  DownloadOutlined, PlaySquareOutlined,
  SyncOutlined, PoweroffOutlined,
  QuestionOutlined, RedoOutlined, CheckOutlined, DownOutlined
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
  getResetTemp, getResetRPM
} from '../../../Redux/action';
import ListItems from '../subComponents/ListItems';
import TestDetails from '../TestPageComponent/TestDetails';
import {
  shutdownClickEvent, resetClickEvent,
  requestChartData,
} from '../../../Services/requests';
import { connect } from 'react-redux';

import axios from 'axios';
import { updateChartData } from '../../../Redux/action';
import { testParamHash } from '../../../Services/constants'
const { Option } = Select;
const { Search } = Input;
let count = 1

class GridContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      turbomode: '',
      testingData: null,
      value: null,
      testerItems: [],
      witnessItems: [],
      turboIdval: null,
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
      errormsg: ''

    }
    this.handleChange = this.handleChange.bind(this);
    this.startClick = this.startClick.bind(this);
    this.addItem = this.addItem.bind(this);
    this.handleTesterInput = this.handleTesterInput.bind(this);
    this.handleWitnessInput = this.handleWitnessInput.bind(this);
    this.deleteTesterItem = this.deleteTesterItem.bind(this);
    this.deleteWitnessItem = this.deleteWitnessItem.bind(this);
  }
  handleVisibleChange = visible => {
    this.setState({ visible });
  };
  addItem(e, key) {
    e.preventDefault();
    const { currentTesterItem, currentWitnessItem, testerItems, witnessItems } = this.state
    const newItem = key === 'tester' ? currentTesterItem : currentWitnessItem
    const isDuplicateTester = testerItems.includes(newItem);
    const isDuplicateWitness = witnessItems.includes(newItem);
    if (isDuplicateTester) {
      this.setState({
        isDuplicateTester: isDuplicateTester
      })
      alert('duplicate value')
    }

    if (isDuplicateWitness) {
      this.setState({
        isDuplicateWitness: isDuplicateWitness
      })
      alert('duplicate value')

    }

    if (newItem !== null && !isDuplicateTester && !isDuplicateWitness) {
      key === 'tester' ?
        this.setState({
          testerItems: [...testerItems, newItem],
          currentTesterItem: null
        }) :
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
  onChangeTurboId = (e) => {
    // this.getTestData()
    console.log(this.state.turboIdval)
  }
  onChangeradio = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      turbomode: e.target.value
    })
    // setValue(e.target.value);
  };
  handleChangetestID = (value) => {
    this.setState({
      turboIdVal: value
    })
  }
  onClicktestButton = () => {
    this.setState({ TestDetails: !this.state.TestDetails })
  }
  onClick = () => {
    this.setState({ testerValue: true })
  }
  requestChartData() {
    axios.get('http://192.168.0.167:5000/graph.php').then(res => {
      let chartdata = res.data;
      this.props.updateChartData(chartdata);
      console.log(chartdata)
    }).catch(err => {
      console.log(err);
    })
  }
  requestChartData1() {
    axios.get('http://192.168.0.167:5000/getdata.php',).then(res => {
      let chartdata = res.data;
      // this.props.updateChartData(chartdata);
      console.log(res.data)
      this.props.initiateTurboStart(res.data);

    }).catch(err => {
      console.log(err);
    })
  }

  shutdownClick = () => {
    this.setState({
      shutdownInitiated: true
    })
    shutdownClickEvent((data) => {
      this.props.initiateShutdown(data)
    })
  }
  communicationstatus() {
    axios.get('http://192.168.0.167:5000/initialize.php')
      .then(res => {
        let CommunicationData = res.data;
        console.log(CommunicationData);

        if (CommunicationData.status === "1") {
          console.log(this.props)
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
    if (this.state.turboIdVal === '' || this.state.turboIdVal === undefined) {
      this.setState({
        errormsg: "Please Select the turbine ID"
      })
    }
    if (this.state.testerItems.length === 0) {
      this.setState({
        errormsg: "Please Enter tester Name"
      })

    }
    if (this.state.turbomode === '' || this.state.turbomode === undefined) {
      this.setState({
        errormsg: "Please Select the turbine"
      })

    }
    if (this.state.turboIdVal !== undefined && this.state.turbomode !== '' && this.state.testerItems.length !== 0) {
      axios.post('http://192.168.0.167:5000/gettestid.php', { turboIdVal: this.state.turboIdVal, testerItems: this.state.testerItems, witnessItems: this.state.witnessItems, turbomode: this.state.turbomode },)
        .then(res => {
          this.communicationstatus()
          let interval = setInterval(() => {
            this.requestChartData1();
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
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      })

  }
  onClickhelp = () => {
    var self = this;
    axios.get('http://192.168.0.167:5000/valvestatus.php')
      .then(function (response) {
        console.log(response.data.valvestatus, response.data.testcommandsTime);
        let valvedate = response.data.valvestatus
        self.setState({
          valvestatustime: response.data.testcommandsTime
        })
        self.setState({
          valvestatus: response.data.valvestatus
        })
        if (response.data.valvestatus[0] === 1) {
          self.setState({
            svcoolingair: "ON"
          })
        }
        if (response.data.valvestatus[1] === 1) {
          self.setState({
            svpilotflameair: "ON"
          })
        }
        if (response.data.valvestatus[2] === 1) {
          self.setState({
            svnaturalgastopilotflame: "ON"
          })
        }
        if (response.data.valvestatus[3] === 1) {
          self.setState({
            svdilution: "ON"
          })
        }
        if (response.data.valvestatus[4] === 1) {
          self.setState({
            fcvcomplressorair: "ON"
          })
        }
        if (response.data.valvestatus[5] === 1) {
          self.setState({
            fcvmaingasfuel: "ON"
          })
        }

      })
      .catch((err) => {
        console.log(err);
      })

  }
  onChangeResettempvalue = event => {
    console.log(event.target.value)
    this.props.getResetTemp(event.target.value);
  }
  onChangeResetRPMvalue = event => {
    console.log(event.target.value)
    this.props.getResetRPM(event.target.value);
  }
  onChangetempvalue = event => {
    console.log(event.target.value)
    this.props.getTargetTemp(event.target.value);
  }
  onChangeRPMvalue = event => {
    console.log(event.target.value)
    this.props.getTargetRPM(event.target.value);
  }

  ResetonClick = () => {
    axios.post('http://192.168.0.167:5000/reset.php',
      { ResetRPM: this.props.app.resetRPM, ResetTemp: this.props.app.resetTemp })
      .then(function (response) {
        console.log(response)
      })
    this.props.initiateShowReset();
    // console.log(this.props);
  }

  startClick = () => {

    if (this.props.app.communication === true) {
      if (this.props.app.targetRPM !== '' && this.props.app.targetTemp !== '') {
        this.props.initiateShowTarget();
        console.log(this.props.getTargetTemp);
        let interval = setInterval(() => {
          this.requestChartData();

        }, 1000);
        axios.post('http://192.168.0.167:5000/start.php', { targetRPM: this.props.app.targetRPM, targetTemp: this.props.app.targetTemp },)
          .then(res => {
            let startData = res.data;
            console.log(startData)

            if (startData) {
              // this.props.initiateTurboStart();
              // 
            }
            console.log(this.props.app.turboStart)
            axios.post('http://192.168.0.167:7000/testdatainsert.php')
              .then(function (response) {
                console.log(response);
              })
            axios.get('http://192.168.0.167:8000/testdata.php')
              .then(res => {
                let TestDataDB = res.data;
                console.log(TestDataDB)
              }).catch((err) => {
                console.log(err);
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
  Reloadall = () => {
    this.props.initiateTurboStart([]);
    // this.props.initiateCommunication();
    this.setState({
      turbomode: '',
      testingData: null,
      value: null,
      testerItems: [],
      witnessItems: [],
      turboIdval: null,
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
      errormsg: ''
    })
  }
  render() {
    console.log(this.state.currentDateTime)
    const shutdownInitiated = this.props.app.shutdownInitiated;
    const showReset = this.props.app.showReset;
    const communicationFailed = this.props.app.communicationFailed
    const communication = this.props.app.communication
    const targetState = this.props.app.targetState
    const showTarget = this.props.app.showTarget
    const targetTemp = this.props.app.targetTemp;
    const targetRPM = this.props.app.targetRPM;
    const resetTemp = this.props.app.resetTemp;
    const resetRPM = this.props.app.resetRPM;
    const testIdValue = this.props.app.turboConfig;
    const turboStart = this.props.app.turboStart;
    const { value } = this.state;
    const { Initializedata, Startdata, Shutdowndata, Resetdata } = testParamHash
    const InitializedataArray = turboStart.filter(it => Initializedata.find(val => val === it.name))
    const StartdataArray = turboStart.filter(it => Startdata.find(val => val === it.name))
    const ShutdowndataArray = turboStart.filter(it => Shutdowndata.find(val => val === it.name))
    const ResetdataArray = turboStart.filter(it => Resetdata.find(val => val === it.name))
    console.log(value)
    console.log(StartdataArray)
    console.log(ShutdowndataArray)
    console.log(ResetdataArray)
    return (
      <div style={{ paddingTop: "30px" }}>
        <Layout style={{ backgroundColor: "#131633", paddingTop: "20px", paddingLeft: "20px", minHeight: "768px" }}>
          <TestDetails />
          <Row style={{ backgroundColor: "#131633", paddingTop: "20px", paddingRight: "20px" }}>
            <Divider style={{ borderColor: "#42dad6", backgroundColor: "#131633", }} />
            <Col span={3}>
              <Card style={{ width: 185, cursor: 'pointer' }} onClick={() => this.initializeClick()}>
                <DownloadOutlined style={{ paddingLeft: '40px', paddingTop: '1px', color: 'gray', fontSize: "30px" }} />
                <p style={{ color: 'gray', fontSize: "20px", paddingLeft: '20px' }}>Initialize</p>
                {
                  communicationFailed ?
                    <p>
                      <Row>
                        <CheckOutlined style={{ color: 'green' }} />
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
                            {(() => {
                              if (item.name === "stage3" && count === 1) {
                                this.props.initiateStageThree();
                                count++;
                                console.log(count)
                              }
                            })()}
                          </div>
                        )
                      })}
                    </p> : []
                }
              </Card>,
            </Col>

            <Col span={2} style={{ marginTop: "40px", paddingRight: "10px", paddingLeft: "20px" }}>
              <hr></hr>
            </Col>

            <Col span={3}>
              <Card style={{ width: 185, cursor: 'pointer' }}>
                <PlaySquareOutlined
                  style={{ paddingLeft: '40px', paddingTop: '1px', color: 'gray', fontSize: "30px" }}
                  onClick={() => this.startClick()}
                />
                <p style={{ color: 'gray', fontSize: "20px", paddingLeft: '35px' }}> Start</p>
                {
                  communication ?
                    <p>
                      <Row>
                        <Col>
                          <p>Target Temp</p>
                        </Col>
                        <Col>
                          <p>Target RPM</p>
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
                    <Alert className="alert_error" message="Please Enter Target values" type="error" /> : ''
                }
                {
                  showTarget ?
                    <div>Target Temp : {targetTemp} Target RPM : {targetRPM}
                    </div> : []
                }
                {
                  showTarget ?
                    <p style={{ height: '15px' }}>
                      <Row>

                        {StartdataArray.map(item => {
                          return (
                            <div>
                              <CheckOutlined style={{ color: 'green' }} />
                              {item.testcommandsTime} - {item.name}
                              {(() => {
                                if (item.name === "stage3" && count === 1) {
                                  this.props.initiateStageThree();
                                  count++;
                                  console.log(count)
                                }
                              })()}
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
              <Card style={{ width: 185, cursor: 'pointer' }} >
                <SyncOutlined style={{ paddingLeft: '40px', paddingTop: '1px', color: 'gray', fontSize: "30px" }} />
                <p style={{ color: 'gray', fontSize: "19px", paddingLeft: '10px' }}>Reset Temp</p>
                {
                  this.props.app.stageThree ?
                    <p>
                      <Row>
                        <p>Reset Temp</p>
                        <p>Reset RPM</p>
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

                        <Button style={{ width: "2px" }} onClick={() => this.ResetonClick()}>
                          +
                        </Button>
                      </Row>
                    </p>
                    : []
                }
                {
                  showReset ?
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
                                console.log(count)
                              }
                            })()}
                          </div>
                        )
                      })}
                    </div> : []
                }
              </Card>,
            </Col>

            <Col span={2} style={{ marginTop: "40px", paddingRight: "10px", paddingLeft: "20px" }}>
              <hr></hr>
            </Col>

            <Col span={4}>
              <Card style={{ width: 185, borderColor: "red", cursor: 'pointer' }} onClick={() => this.shutdownClick()}>
                <div>
                  <PoweroffOutlined style={{ paddingLeft: '40px', paddingTop: '1px', color: 'red', fontSize: "30px" }} />
                </div>
                <p style={{ color: '#42dad6', fontSize: "20px", paddingLeft: '15px' }}>Shutdown</p>
              </Card>,
              {
                shutdownInitiated ?
                  <p style={{ height: '15px', color: 'white' }}>
                    <Row>
                      <CheckOutlined style={{ color: 'green' }} />
                      <p>
                        {
                          this.state.currentDateTime
                        } - shutdown Initiated
                      </p>
                    </Row>
                  </p> : []
              }
              {
                shutdownInitiated ?
                  <p style={{ height: '15px', color: 'white' }}>
                    <Row>
                      {ShutdowndataArray.map(item => {
                        return (
                          <div>
                            <CheckOutlined style={{ color: 'green' }} />
                            {item.testcommandsTime} - {item.name}
                            {(() => {
                              if (item.name === "stage3" && count === 1) {
                                this.props.initiateStageThree();
                                count++;
                                console.log(count)
                              }
                            })()}
                          </div>
                        )
                      })}
                    </Row></p> : []
              }
            </Col>

            <Col span={3}>
              <Card style={{ width: 100 }}>
                <div onClick={this.onClick}>
                  <RedoOutlined style={{ paddingLeft: '5px', paddingTop: '1px', color: 'green', fontSize: "30px", cursor: 'pointer' }} onClick={() => this.Reloadall()} />
                </div>
                <p style={{ color: 'gray', fontSize: "20px", paddingLeft: 'px' }}>Reset</p>
              </Card>,
            </Col>

            <Col span={2}>
              <Popover

                title={<div><p>Valve status On:</p><p> {this.state.valvestatustime}</p></div>}
                content={<div><p>svcoolingair : {this.state.svcoolingair} </p> <p>svpilotflameair : {this.state.svpilotflameair}</p>
                  <p>svnaturalgastopilotflame : {this.state.svnaturalgastopilotflame}</p>
                  <p>svdilution : {this.state.svdilution}</p>
                  <p>fcvcomplressorair : {this.state.fcvcomplressorair}</p>
                  <p>svcoolingair : {this.state.fcvmaingasfuel}</p></div>}
                trigger="click"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
              >

                <Card style={{ width: 100 }}>
                  <div onClick={this.onClickhelp} >
                    <QuestionOutlined style={{ paddingLeft: '5px', paddingTop: '1px', color: 'red', fontSize: "30px" }} />
                  </div>
                  <p style={{ color: 'gray', fontSize: "20px", paddingLeft: 'px' }}>Help</p>
                </Card>
              </Popover>
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
  initiateShutdown,
  initiateShowReset,
  initiateCommunicationFailed,
  initiateCommunication,
  initiateTargetState,
  initiateShowTarget,
  initiateTurboStart,
  initiateGasOpened,
  initiateStageOne,
  initiateFuelOpened,
  initiateStageTwo,
  initiateGasClosed,
  initiateStageThree,
  getTargetRPM,
  getTargetTemp,
  getResetTemp,
  getResetRPM,
  updateChartData,
}

const Grid = connect(
  mapStateToProps,
  mapDispatchToProps
)(GridContainer)
export default Grid;
