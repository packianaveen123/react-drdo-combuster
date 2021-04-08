import React, { Component } from 'react'
import { Card, Col, Row, Layout, Divider, Input, Select, Alert, Button } from 'antd';
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
import {
  shutdownClickEvent, resetClickEvent,
  requestChartData,
} from '../../../Services/requests';
import { connect } from 'react-redux';
import TestDetails from './TestDetails'
import axios from 'axios';
import Post from '../../Pages/Post';

const { Option } = Select;
const { Search } = Input;

class GridContainer extends Component {
  constructor(props) {
    super(props)
    var today = new Date(),
      time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    this.postID = 0;
    this.state = {
      resetTemp: [],
      Body: '',
      id: ''
      // testerValue: false,
      // testValue: '',
      // currentDateTime: time,
      // communication: false,
      // targetTemp: '',
      // targetRPM: '',
      // ResetTemp: '',
      // ResetRPM: '',
      // showTarget: false,
      // start: false,
      // reset: false,
      // gasopend: false,
      // stageOne: false,
      // fuelOpened: false,
      // stageTwo: false,
      // gasclosed: false,
      // stage3: false,
      // TargetState: false,
      // showReset: false,
      // shutdownInitiated: false,
      // TestDetails: false,
      // communicationfailed: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.startClick = this.startClick.bind(this)
  }

  onClicktestButton = () => {
    this.setState({ TestDetails: !this.state.TestDetails })
  }
  onClick = () => {
    this.setState({ testerValue: true })
  }

  shutdownClick = () => {
    this.setState({
      shutdownInitiated: true
    })
    shutdownClickEvent((data) => {
      this.props.initiateShutdown(data)
    })
  }

  handleChange = (e) => {
    this.setState({ testValue: e.target.value })
  }

  initializeClick = () => {
    axios.get('http://192.168.0.167:5000/initialize.php')
      .then(res => {
        let CommunicationData = res.data;
        console.log(CommunicationData);

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

  initializeTestClick = () => {
    axios.get('http://192.168.0.167:8000/testdata.php')
      .then(function (response) {
        console.log(response);
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

  // ResetonClick = () => {
  //   this.setState({
  //     showReset: true
  //   })
  //   resetClickEvent((data) => {
  //     this.props.initiateShowReset(data)
  //   })
  // }

  ResetonClick = () => {
    axios.post('http://192.168.0.167:5000/reset.php',
      { ResetRPM: this.props.app.resetRPM, ResetTemp: this.props.app.resetTemp })
      .then(function (response) {
      })
    this.props.initiateShowReset();
    // console.log(this.props);
  }

  startClick = () => {
    console.log(this.props.app)
    if (this.props.app.communication === true) {
      if (this.props.app.targetRPM !== '' && this.props.app.targetTemp !== '') {
        this.props.initiateShowTarget();
        console.log(this.props.getTargetTemp);
        axios.post('http://192.168.0.167:5000/start.php', { targetRPM: this.props.app.targetRPM, targetTemp: this.props.app.targetTemp },)
          .then(res => {
            let startData = res.data;
            console.log(startData)

            if (startData) {
              this.props.initiateTurboStart();
              this.props.initiateGasOpened();
              this.props.initiateStageOne();
              this.props.initiateFuelOpened();
              this.props.initiateStageTwo();
              this.props.initiateGasClosed();
              this.props.initiateStageThree();
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

  setPost = (event) => {
    this.setState({
      Body: event.target.value
    })
  }

  addPost = () => {
    this.postID = this.postID + 1;
    const copyPostArray = Object.assign([], this.state.resetTemp)
    copyPostArray.push({
      id: this.postID,
      body: this.state.Body
    })
    this.setState({
      resetTemp: copyPostArray
    })
  }

  render() {
    const appData = this.props.app;
    const shutdownInitiated = appData.shutdownInitiated;
    const showReset = appData.showReset;
    const communicationFailed = appData.communicationFailed
    const communication = appData.communication
    const targetState = appData.targetState
    const showTarget = appData.showTarget
    const turboStart = appData.turboStart;
    const gasOpend = appData.gasOpend;
    const stageOne = appData.stageOne;
    const fuelOpened = appData.fuelOpened;
    const stageTwo = appData.stageTwo;
    const gasClosed = appData.gasClosed;
    const stageThree = appData.stageThree;
    const targetTemp = appData.targetTemp;
    const targetRPM = appData.targetRPM;
    const resetTemp = appData.resetTemp;
    const resetRPM = appData.resetRPM;

    console.log(this.props.app);
    console.log(this.props.app.communication)
    console.log(communication)

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
                      <Row>
                        <CheckOutlined style={{ color: 'green' }} />
                        <p>{this.state.currentDateTime}- Communication</p>
                      </Row>
                      <Row>
                        <CheckOutlined style={{ color: 'green' }} />
                        <p>{this.state.currentDateTime}- Start INITIALIZE</p>
                      </Row>
                      <Row>
                        <CheckOutlined style={{ color: 'green' }} />
                        <p>{this.state.currentDateTime}- INITIALIZE Completed</p>
                      </Row>
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
                    <div>Target Temp : {targetTemp}<br></br> Target RPM : {targetRPM}
                    </div> : []
                }
                {
                  turboStart ?
                    <p style={{ height: '15px' }}>
                      <Row>
                        <CheckOutlined style={{ color: 'green' }} />
                        <p >{this.state.currentDateTime}- Start Initialize</p>
                      </Row>
                    </p> : []
                }
                {
                  turboStart ?
                    <p style={{ height: '15px' }}>
                      <Row>
                        <CheckOutlined style={{ color: 'green' }} />
                        <p >{this.state.currentDateTime}- Start completed</p>
                      </Row>
                    </p> : []
                }
                {
                  gasOpend ?
                    <p style={{ height: '15px' }}>
                      <Row>
                        <CheckOutlined style={{ color: 'green' }} />
                        <p>{this.state.currentDateTime}- Start Gas Opened</p>
                      </Row>
                    </p> : []
                }
                {
                  stageOne ?
                    <p style={{ height: '15px' }}>
                      <Row>
                        <CheckOutlined style={{ color: 'green' }} />
                        <p>{this.state.currentDateTime}- Stage1 Completed</p>
                      </Row>
                    </p> : []
                }
                {
                  fuelOpened ?
                    <p style={{ height: '15px' }}>
                      <Row>
                        <CheckOutlined style={{ color: 'green' }} />
                        <p>{this.state.currentDateTime}- Fuel Opened</p>
                      </Row>
                    </p> : []
                }
                {
                  stageTwo ?
                    <p style={{ height: '15px' }}>
                      <Row>
                        <CheckOutlined style={{ color: 'green' }} />
                        <p>{this.state.currentDateTime}- Stage2 Completed</p>
                      </Row>
                    </p> : []
                }
                {
                  gasClosed ?
                    <p style={{ height: '15px' }}>
                      <Row>
                        <CheckOutlined style={{ color: 'green' }} />
                        <p>{this.state.currentDateTime}- Gas Closed</p>
                      </Row>
                    </p> : []
                }
                {
                  stageThree ?
                    <p style={{ height: '15px' }}>
                      <Row>
                        <CheckOutlined style={{ color: 'green' }} />
                        <p>{this.state.currentDateTime}- Stage3 Completed</p>
                      </Row>
                    </p> : []
                }
              </Card>,
            </Col>

            <Col span={2} style={{ marginTop: "40px", paddingRight: "10px", paddingLeft: "20px" }}>
              <hr></hr>
            </Col>

            <Col span={3}>
              <Card style={{ width: 185, cursor: 'pointer' }} >
                <SyncOutlined style={{ paddingLeft: '40px', paddingTop: '1px', color: 'gray', fontSize: "30px" }} />
                <p style={{ color: 'gray', fontSize: "19px", paddingLeft: '10px' }}>Reset Temp</p>
                {
                  stageThree ?
                    <p>
                      <Row>
                        <p>Reset Temp</p>
                        <p>Reset RPM</p>
                      </Row>
                      <Row>
                        <Input
                          // value={resetTemp}
                          // onChange={this.onChangeResettempvalue}
                          onBlur={this.setPost}
                          name="ResetTemp"
                          style={{ width: "75px" }}
                        />

                        {/* <Input
                          value={resetRPM}
                          onChange={this.onChangeResetRPMvalue}
                          name="ResetRPM"
                          style={{ width: "75px" }}
                        /> */}

                        <Button
                          style={{ width: "2px" }}
                          // onClick={() => this.ResetonClick()}
                          onClick={this.addPost}
                        >
                          +
                        </Button>
                      </Row>
                    </p>
                    : []
                }
                {/* {
                  showReset ?
                    <div>
                      Target Temp : {resetTemp} <br></br>
                       Target RPM : {resetRPM}
                    </div> : []
                } */}
                <ul>
                  {
                    this.state.resetTemp.map((post, index) => {
                      <Post
                        key={post.id}
                        id={post.id}
                        body={post.body}
                      />
                    })
                  }
                </ul>
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
                      <CheckOutlined style={{ color: 'green' }} />
                      <p>{this.state.currentDateTime}- shutdown Completed</p>
                    </Row></p> : []
              }
            </Col>

            <Col span={3}>
              <Card style={{ width: 100 }}>
                <div onClick={this.onClick}>
                  <RedoOutlined style={{ paddingLeft: '5px', paddingTop: '1px', color: 'green', fontSize: "30px" }} />
                </div>
                <p style={{ color: 'gray', fontSize: "20px", paddingLeft: 'px' }}>Reset</p>
              </Card>,
            </Col>

            <Col span={2}>
              <Card style={{ width: 100 }}>
                <div onClick={this.onClick} >
                  <QuestionOutlined style={{ paddingLeft: '5px', paddingTop: '1px', color: 'red', fontSize: "30px" }} />
                </div>
                <p style={{ color: 'gray', fontSize: "20px", paddingLeft: 'px' }}>Help</p>
              </Card>
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
  getResetRPM
}

const Grid = connect(
  mapStateToProps,
  mapDispatchToProps
)(GridContainer)
export default Grid;
