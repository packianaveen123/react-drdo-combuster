import React, { Component } from "react";
import {
  Card,
  Col,
  Row,
  Layout,
  Divider,
  Input,
  Select,
  Alert,
  Button,
  Radio,
  Popover,
  Space,
  Typography,
  message,
  Menu,
} from "antd";
import {
  DownloadOutlined,
  PlaySquareOutlined,
  SyncOutlined,
  PoweroffOutlined,
  QuestionOutlined,
  RedoOutlined,
  MinusOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import {
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
  stopDbInsert,
  startDbInsert,
  updateNotifyAction,
  initializeEnableEvent,
} from "../../../Redux/action";
import {
  navigateMainPage,
  updateTestIdValue,
  updateTestIdCount,
  updateDropDown,
  gettingTestIdData,
  startDisableEvent,
} from "../../../Redux/action";
import ListItems from "../subComponents/ListItems";
import {
  shutdownClickEvent,
  getSensorData,
  getHandleChangetestID,
  requestStatusData,
} from "../../../Services/requests";
import { connect } from "react-redux";
import axios from "axios";
import {
  testParamHash,
  turboConfigValue,
  helpPopup,
} from "../../../Services/constants";

var { Option } = Select;
const { Text } = Typography;
const { SubMenu } = Menu;
let count = 1;

const {
  duplicate_msg,
  warning_Id,
  warning_name,
  alert_targetval,
  Initializedata,
  Startdata,
  nShutdowndata,
  eShutdowndata,
  Resetdata,
} = testParamHash;

const { installed_turbine } = turboConfigValue;

const {
  value,
  PilotFlameAir,
  FuelInjectorAir,
  PilotFlameGas,
  FCVAir,
  FCVKeroseneFuel,
  ByPassValueI,
  ByPassValueII,
  IgnitorSwitch,
  KerosenePump,
  LubeOilPump,
} = helpPopup;

class TestPageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turboIdDefaultValue: "Select Turbo ID",
      // turboIdValue: "Select Turbo ID",
      truboIDnum: true,

      testingData: null,
      value: null,
      testerItems: [],
      witnessItems: [],
      turboIdval: "",
      turboIdTestCount: [],
      currentTesterItem: null,
      currentWitnessItem: null,
      isDuplicateTester: false,
      isDuplicateWitness: false,
      visible: false,
      valvestatustime: "",
      valvestatus: "",
      PilotFlameAir: "OFF",
      FuelInjectorAir: "OFF",
      PilotFlameGas: "OFF",
      FCVAir: "OFF",
      FCVKeroseneFuel: "OFF",
      ByPassValueI: "OFF",
      ByPassValueII: "OFF",
      IgnitorSwitch: "OFF",
      KerosenePump: "OFF",
      LubeOilPump: "OFF",
      currentDateTime: "",
      turbostartname: [],
      overalldata: [],
      errormsg: "",
      tubineStatus: false,
      failedField: [],
    };

    this.startClick = this.startClick.bind(this);
    this.addTesterItem = this.addTesterItem.bind(this);
    this.addWitnessItem = this.addWitnessItem.bind(this);
    this.handleTesterInput = this.handleTesterInput.bind(this);
    this.handleWitnessInput = this.handleWitnessInput.bind(this);
    this.deleteTesterItem = this.deleteTesterItem.bind(this);
    this.deleteWitnessItem = this.deleteWitnessItem.bind(this);
  }

  componentDidMount() {
    // this.props.updateTestIdValue('')

    //getting installed turbine name form db
    requestStatusData((data) => {
      if (typeof data !== "string" && data.length > installed_turbine) {
        this.props.navigateMainPage("turboConfig");
        this.props.updateNotifyAction("true");
      } else if (typeof data !== "string" && data.length <= installed_turbine) {
        this.props.updateNotifyAction("false");
      }
    });
  }

  //helpPopover action
  handleVisibleChange = (visible) => {
    if (this.props.app.showTarget === true) {
      this.setState({ visible });
    }
  };

  //add Tester details
  addTesterItem(e) {
    e.preventDefault();
    const { currentTesterItem, testerItems } = this.state;
    const newItem = currentTesterItem;
    const isDuplicateTester = testerItems.includes(newItem);
    if (isDuplicateTester) {
      this.setState({
        isDuplicateTester: isDuplicateTester,
      });
      message.warning(duplicate_msg);
    }
    if (newItem !== null && !isDuplicateTester) {
      this.setState({
        testerItems: [...testerItems, newItem],
        currentTesterItem: null,
      });
    }
  }

  //add Witness details
  addWitnessItem(e) {
    e.preventDefault();
    const { currentWitnessItem, witnessItems } = this.state;
    const newItem = currentWitnessItem;
    const isDuplicateWitness = witnessItems.includes(newItem);
    if (isDuplicateWitness) {
      this.setState({
        isDuplicateWitness: isDuplicateWitness,
      });
      message.warning(duplicate_msg);
    }
    if (newItem !== null && !isDuplicateWitness) {
      this.setState({
        witnessItems: [...witnessItems, newItem],
        currentWitnessItem: null,
      });
    }
  }

  //Tester onchange
  handleTesterInput(e) {
    this.setState({
      currentTesterItem: e.target.value,
    });
  }

  //witness onchange
  handleWitnessInput(e) {
    this.setState({
      currentWitnessItem: e.target.value,
    });
  }

  //deletion for tester
  deleteTesterItem(text) {
    const filteredItems = this.state.testerItems.filter(
      (item) => item !== text
    );
    this.setState({
      testerItems: filteredItems,
    });
  }

  //deletion for witness
  deleteWitnessItem(text) {
    const filteredItems = this.state.witnessItems.filter(
      (item) => item !== text
    );
    this.setState({
      witnessItems: filteredItems,
    });
  }

  //select the TestId
  handleChangetestID = (value) => {
    this.setState({
      truboIDnum: true,
    });
    this.props.updateTestIdValue(value);
    const body = {
      turboIdValue: value,
    };
    let that = this;

    //getting data from axios in request page
    getHandleChangetestID(body, (data) => {
      if (data === "" || data.length === 0) {
        that.setState({
          turboIdTestCount: 1,
        });
      } else {
        that.setState({
          turboIdTestCount: data,
        });
      }
      //updating to the store called turboIdTestCount
      this.props.updateTestIdCount(this.state.turboIdTestCount);
    });
  };

  //onclick for shutdown
  shutdownClick = () => {
    this.props.initializeEnableEvent(false);
    shutdownClickEvent((data) => {
      //updating to the store called shutdownInitiated
      this.props.initiateShutdown(data);
    });
  };

  //getting communication value in request page
  communicationstatus() {
    axios
      .post("http://localhost:5000/initialize.php", {
        testId: this.props.app.testIdData,
      })
      .then((res) => {
        let CommunicationData = res.data;
        if (CommunicationData.status === "1") {
          this.props.initiateCommunication();
        }
        if (CommunicationData.status === "") {
          this.props.initiateCommunicationFailed();
          this.setState({ failedField: true });
        }
        this.initializeTestClick();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //initialize event onclick
  initializeClick = () => {
    this.props.startDbInsert();
    this.props.updateDropDown(null);

    if (
      this.props.app.testIdValue === "" ||
      this.props.app.testIdValue === undefined ||
      this.props.app.testIdValue.length === 0
    ) {
      this.setState({
        errormsg: warning_Id,
      });
      return;
    }
    if (this.state.testerItems.length === 0) {
      this.setState({
        errormsg: warning_name,
      });
      return;
    }

    if (
      this.props.app.testIdValue !== undefined &&
      this.props.app.testIdValue !== "" &&
      this.state.testerItems.length !== 0 &&
      this.props.app.communication === false &&
      this.props.app.testIdValue.length !== 0
    ) {
      axios
        .post("http://localhost:5000/gettestid.php", {
          turboIdVal: this.props.app.testIdValue,
          testerItems: this.state.testerItems,
          witnessItems: this.state.witnessItems,
        })
        .then((res) => {
          let data = res.data;
          this.props.gettingTestIdData(data);
          this.communicationstatus();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //start click event
  initializeTestClick = () => {
    var today = new Date(),
      time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    this.setState({
      currentDateTime: time,
    });
    this.props.initializeEnableEvent(true);
    axios
      .get("http://localhost:8000/testdata.php")
      .then(function (response) {})
      .catch((err) => {
        console.log(err);
      });
  };

  //help event onClick
  onClickhelp = () => {
    var self = this;
    axios
      .get("http://localhost:5000/valvestatus.php")
      .then(function (response) {
        let valveData = response.data.valvestatus.split(",");
        self.setState({
          valvestatustime: response.data.testcommandsTime,
        });
        self.setState({
          valvestatus: response.data.valvestatus,
        });
        if (valveData[0] === "1") {
          self.setState({
            PilotFlameAir: "ON",
          });
        }
        if (valveData[1] === "1") {
          self.setState({
            FuelInjectorAir: "ON",
          });
        }
        if (valveData[2] === "1") {
          self.setState({
            PilotFlameGas: "ON",
          });
        }
        if (valveData[3] === "1") {
          self.setState({
            FCVAir: "ON",
          });
        }
        if (valveData[4] === "1") {
          self.setState({
            FCVKeroseneFuel: "ON",
          });
        }
        if (valveData[5] === "1") {
          self.setState({
            ByPassValueI: "ON",
          });
        }
        if (valveData[6] === "1") {
          self.setState({
            ByPassValueII: "ON",
          });
        }
        if (valveData[7] === "1") {
          self.setState({
            IgnitorSwitch: "ON",
          });
        }
        if (valveData[8] === "1") {
          self.setState({
            KerosenePump: "ON",
          });
        }
        if (valveData[9] === "1") {
          self.setState({
            LubeOilPump: "ON",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //input onChange values
  onChangeResettempvalue = (event) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      this.props.getResetTemp(event.target.value);
    }
  };

  //resetRPM onclick
  onChangeResetRPMvalue = (event) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      this.props.getResetRPM(event.target.value);
    }
  };

  //targetTemp onclick
  onChangetempvalue = (event) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      this.props.getTargetTemp(event.target.value);
    }
  };

  //targetRPM onclick
  onChangeRPMvalue = (event) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      this.props.getTargetRPM(event.target.value);
    }
  };

  //reset event onClick
  resetOnClick = () => {
    axios
      .post("http://localhost:5000/reset_targetVal.php", {
        testId: this.props.app.testIdData,
        ResetRPM: this.props.app.resetRPM,
        ResetTemp: this.props.app.resetTemp,
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  //start event onClick
  startClick = () => {
    if (this.props.app.communication === true) {
      if (this.props.app.targetRPM !== "" && this.props.app.targetTemp !== "") {
        this.props.initiateShowTarget();
        this.props.startDisableEvent(true);
        //delay for receiving sensor data from plc
        axios
          .post("http://localhost:5000/start.php", {
            //set target rpm & temp value to sent plc
            testId: this.props.app.testIdData,
            targetRPM: this.props.app.targetRPM,
            targetTemp: this.props.app.targetTemp,
            initialAirFCV: this.props.app.cvStageValue.AirInitValve,
            initialkeroseneFCV: this.props.app.cvStageValue.KeroseneInitValve,
          })
          .then((res) => {})
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.props.initiateTargetState();
      }
    }
  };

  //error msg onclick
  errorDoneClick = () => {
    this.setState({
      errormsg: "",
    });
  };

  //reSet action
  reloadAllEvents = () => {
    this.props.gettingTestIdData(0);
    this.props.stopDbInsert();
    this.props.updateTestIdCount("");
    this.props.updateTestIdValue("");
    this.props.startDisableEvent(false);
    this.props.initiateTurboStart([]);

    this.setState({
      turboIdDefaultValue: "Select Turbo ID",
      turboIdValue: "Select Turbo ID",
      truboIDnum: false,
      testingData: null,
      value: null,
      testerItems: [],
      witnessItems: [],
      currentTesterItem: null,
      currentWitnessItem: null,
      isDuplicateTester: false,
      isDuplicateWitness: false,
      visible: false,
      valvestatustime: "",
      valvestatus: "",
      svcoolingair: "OFF",
      svpilotflameair: "OFF",
      svnaturalgastopilotflame: "OFF",
      svdilution: "OFF",
      fcvcomplressorair: "OFF",
      fcvmaingasfuel: "OFF",
      currentDateTime: "",
      turbostartname: [],
      overalldata: [],
      errormsg: "",
      turboIdTestCount: null,
      failedField: [],
    });
  };

  //alertOnclose
  alertOnClose = () => {
    this.props.initiateTargetState();
  };

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

    let turboStart = this.props.app.turboStart;

    const InitializedataArray = turboStart.filter((it) =>
      Initializedata.find((val) => val === it.name)
    );

    const StartdataArray = turboStart.filter((it) =>
      Startdata.find((val) => val === it.name)
    );

    const nShutdowndataArray = turboStart.filter((it) =>
      nShutdowndata.find((val) => val === it.name)
    );

    const eShutdowndataArray = turboStart.filter((it) =>
      eShutdowndata.find((val) => val === it.name)
    );

    const ResetdataArray = turboStart.filter((it) =>
      Resetdata.find((val) => val === it.name)
    );

    const InitializedCompletedStatus = InitializedataArray.filter(
      (word) => word.name === "Initialize Completed"
    );

    var testIdValue = null;
    if (
      this.props.app.statusData !== "no_data" &&
      this.props.app.statusData.length !== 0
    ) {
      var testIdValue = this.props.app.statusData.filter(
        (word) => word.status === "installed"
      );
    }
    return (
      <div style={{ paddingTop: "25px" }}>
        <Layout
          style={{
            backgroundColor: "#131633",
            paddingLeft: "20px",
            minHeight: "768px",
          }}
        >
          <div>
            <Menu
              style={{
                width: "100%",
                backgroundColor: "transparent",
                paddingRight: "20px",
              }}
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={[this.props.app.testDropdown]}
              theme="dark"
              mode="inline"
            >
              <SubMenu
                key="sub1"
                className="test-dropdown"
                title="Turbo Details"
                style={{ fontSize: "18px" }}
              >
                <Layout
                  style={{
                    backgroundColor: "transparent",
                    paddingLeft: "20px",
                  }}
                >
                  <Row style={{ paddingTop: "2%", paddingLeft: "20px" }}>
                    <Col span={8}>
                      <form>
                        <Row>
                          <Col span={5} style={{ marginTop: "20px" }}>
                            <label htmlFor="text" className="label">
                              Turbo ID
                            </label>
                          </Col>
                          <Col span={6}>
                            {communication ? (
                              <Input.Group compact>
                                <Select
                                  disabled
                                  defaultValue={this.state.turboIdDefaultValue}
                                  style={{ width: "300px" }}
                                ></Select>
                              </Input.Group>
                            ) : (
                              <Input.Group compact>
                                {testIdValue && testIdValue.length > 0 ? (
                                  <Select
                                    defaultValue={
                                      this.state.turboIdDefaultValue
                                    }
                                    style={{ width: "300px" }}
                                    onChange={this.handleChangetestID}
                                    value={this.state.turboIdValue}
                                  >
                                    {this.props.app.statusData.map((it) => (
                                      <Option
                                        key={it.turboname}
                                        value={it.turboname}
                                      >
                                        {it.turboname}
                                      </Option>
                                    ))}
                                  </Select>
                                ) : (
                                  <Space
                                    type="warning"
                                    style={{ color: "red" }}
                                  >
                                    No active turbo
                                  </Space>
                                )}
                              </Input.Group>
                            )}
                          </Col>
                        </Row>
                      </form>
                      {this.props.app.statusData ? (
                        <Row style={{ paddingLeft: "5rem" }}>
                          {this.state.truboIDnum ? (
                            <div
                              style={{
                                color: "white",
                                marginLeft: "15px",
                                marginTop: "10px",
                              }}
                            >
                              {this.props.app.testIdValue}
                              {this.props.app.testIdValue.length !== 0 ? (
                                <MinusOutlined style={{ color: "#42dbdc" }} />
                              ) : (
                                []
                              )}
                              {this.props.app.turboIdTestCount}
                            </div>
                          ) : (
                            []
                          )}
                        </Row>
                      ) : (
                        []
                      )}
                    </Col>
                    <Col span={8}>
                      <form onSubmit={(e) => this.addTesterItem(e, "tester")}>
                        <Row>
                          <Col span={4} style={{ marginTop: "20px" }}>
                            <label htmlFor="text" className="label">
                              Tester
                            </label>
                          </Col>
                          <Col span={15}>
                            {communication ? (
                              <Input
                                disabled
                                placeholder="Tester"
                                name="Tester"
                                style={{ width: "300px" }}
                              />
                            ) : (
                              <Input
                                placeholder="Tester"
                                name="Tester"
                                style={{ width: "300px" }}
                                value={this.state.currentTesterItem}
                                onChange={this.handleTesterInput}
                              />
                            )}
                          </Col>
                          <Col>
                            <button className="add-btn" type="submit">
                              +
                            </button>
                          </Col>
                        </Row>
                      </form>
                      <Row style={{ paddingLeft: "5rem" }}>
                        <ListItems
                          items={this.state.testerItems}
                          deleteItem={this.deleteTesterItem}
                        />
                      </Row>
                    </Col>

                    <Col span={8}>
                      <form onSubmit={(e) => this.addWitnessItem(e, "witness")}>
                        <Row>
                          <Col span={4} style={{ marginTop: "20px" }}>
                            <label htmlFor="text" className="label">
                              Witness
                            </label>
                          </Col>
                          <Col span={15}>
                            {communication ? (
                              <Input
                                disabled
                                placeholder="Witness"
                                name="Witness"
                                style={{ width: "300px" }}
                              />
                            ) : (
                              <Input
                                placeholder="Witness"
                                name="Witness"
                                style={{ width: "300px" }}
                                value={this.state.currentWitnessItem}
                                onChange={this.handleWitnessInput}
                              />
                            )}
                          </Col>
                          <Col>
                            <button className="add-btn" type="submit">
                              +
                            </button>
                          </Col>
                        </Row>
                      </form>
                      <Row style={{ paddingLeft: "5rem" }}>
                        <ListItems
                          items={this.state.witnessItems}
                          deleteItem={this.deleteWitnessItem}
                        />
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    {this.state.errormsg ? (
                      <Alert
                        message={this.state.errormsg}
                        type="error"
                        action={
                          <Space>
                            <Button
                              size="small"
                              type="ghost"
                              onClick={() => this.errorDoneClick()}
                            >
                              Done
                            </Button>
                          </Space>
                        }
                      />
                    ) : (
                      ""
                    )}
                  </Row>
                </Layout>
              </SubMenu>
            </Menu>
          </div>

          <Row style={{ backgroundColor: "#131633", paddingRight: "20px" }}>
            <Divider
              style={{ borderColor: "#42dad6", backgroundColor: "#131633" }}
            />

            <Col span={3}>
              <Card
                style={{ width: 185, cursor: "pointer", borderColor: "green" }}
              >
                {communication === true || communicationFailed === true ? (
                  <DownloadOutlined className="iconbutton1-basic" />
                ) : (
                  <DownloadOutlined
                    className="icon-button1"
                    onClick={() => this.initializeClick()}
                  />
                )}
                <p
                  style={{
                    color: "#42dad6",
                    fontSize: "20px",
                    paddingLeft: "20px",
                  }}
                >
                  Initialize
                </p>
                {communicationFailed ? (
                  <p>
                    {this.state.failedField === true ? (
                      <Row>
                        <CloseOutlined
                          style={{ color: "red", marginTop: "1%" }}
                        />

                        <p>
                          {this.state.currentDateTime}- Communication failed
                        </p>
                      </Row>
                    ) : (
                      []
                    )}
                  </p>
                ) : (
                  []
                )}
                {communication ? (
                  <p>
                    {InitializedataArray.map((item) => {
                      return (
                        <div>
                          <CheckOutlined
                            style={{ color: "green", marginTop: "1%" }}
                          />
                          {item.testcommandsTime} - {item.name}
                        </div>
                      );
                    })}
                  </p>
                ) : (
                  []
                )}
              </Card>
              ,
            </Col>

            <Col
              span={2}
              style={{
                marginTop: "30px",
                paddingRight: "10px",
                paddingLeft: "20px",
              }}
            >
              <hr></hr>
            </Col>

            <Col span={3}>
              <Card
                style={
                  InitializedCompletedStatus.length == 1 && communication
                    ? { width: 185, cursor: "pointer", borderColor: "green" }
                    : { width: 185, borderColor: "gray" }
                }
              >
                {InitializedCompletedStatus.length == 1 &&
                communication &&
                this.props.app.startDisable === false ? (
                  <PlaySquareOutlined
                    className="icon-button1"
                    onClick={() => this.startClick()}
                  />
                ) : (
                  <PlaySquareOutlined className="iconbutton1-basic" />
                )}
                {InitializedCompletedStatus.length == 1 && communication ? (
                  <p
                    style={{
                      color: "#42dad6",
                      fontSize: "20px",
                      paddingLeft: "35px",
                    }}
                  >
                    {" "}
                    Start
                  </p>
                ) : (
                  <p
                    style={{
                      color: "gray",
                      fontSize: "20px",
                      paddingLeft: "35px",
                    }}
                  >
                    {" "}
                    Start
                  </p>
                )}

                {InitializedCompletedStatus.length == 1 && communication ? (
                  <p>
                    <Row>
                      <Col>
                        <p>Target Temp,</p>
                      </Col>
                      <Col>
                        <p> &nbsp; RPM</p>
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
                  </p>
                ) : (
                  []
                )}
                {targetState ? (
                  <Alert
                    className="alert_error"
                    message={alert_targetval}
                    closable
                    onClose={this.alertOnClose}
                    style={{ width: "60%" }}
                    type="error"
                  />
                ) : (
                  ""
                )}
                {showTarget ? (
                  <div>
                    Target Temp : {targetTemp}, &nbsp; RPM : {targetRPM}
                  </div>
                ) : (
                  []
                )}
                {showTarget ? (
                  <p style={{ height: "15px", width: "180px" }}>
                    <Row>
                      {StartdataArray.map((item) => {
                        return (
                          <div>
                            <CheckOutlined
                              style={{ color: "green", marginTop: "1%" }}
                            />
                            {item.testcommandsTime} - {item.name}
                          </div>
                        );
                      })}
                    </Row>
                  </p>
                ) : (
                  []
                )}
              </Card>
            </Col>

            <Col
              span={2}
              style={{
                marginTop: "40px",
                paddingRight: "10px",
                paddingLeft: "20px",
              }}
            >
              <hr></hr>
            </Col>

            <Col span={3}>
              <Card
                style={
                  StartdataArray.find((it) => it.name === "Stage3") &&
                  communication
                    ? { width: 185, cursor: "pointer", borderColor: "green" }
                    : { width: 185, borderColor: "gray" }
                }
              >
                {StartdataArray.find((it) => it.name === "Stage3") &&
                communication ? (
                  <SyncOutlined
                    style={{ color: "green" }}
                    className="iconbutton1-basic"
                  />
                ) : (
                  <SyncOutlined className="iconbutton1-basic" />
                )}

                {StartdataArray.find((it) => it.name === "Stage3") &&
                communication ? (
                  <p
                    style={{
                      color: "#42dad6",
                      fontSize: "19px",
                      paddingLeft: "10px",
                    }}
                  >
                    Reset Temp
                  </p>
                ) : (
                  <p
                    style={{
                      color: "gray",
                      fontSize: "19px",
                      paddingLeft: "10px",
                    }}
                  >
                    Reset Temp
                  </p>
                )}

                {communication ? (
                  <p>
                    {StartdataArray.find((it) => it.name === "Stage3") ? (
                      <p>
                        <Row>
                          <p>Reset Temp,</p>
                          <p> &nbsp; RPM</p>
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
                            onClick={() => this.resetOnClick()}
                          >
                            +
                          </button>
                        </Row>
                      </p>
                    ) : (
                      []
                    )}

                    <div>
                      {ResetdataArray.map((item) => {
                        return (
                          <div>
                            <CheckOutlined
                              style={{ color: "green", marginTop: "1%" }}
                            />
                            {item.testcommandsTime} - {item.name} - {item.value}
                            {(() => {
                              if (item.name === "stage3" && count === 1) {
                                this.props.initiateStageThree();
                                count++;
                              }
                            })()}
                          </div>
                        );
                      })}
                    </div>
                  </p>
                ) : (
                  []
                )}
              </Card>
            </Col>

            <Col
              span={2}
              style={{
                marginTop: "40px",
                paddingRight: "10px",
                paddingLeft: "20px",
              }}
            >
              <hr></hr>
            </Col>

            <Col span={4}>
              <Card
                style={
                  this.props.app.initializeEnable
                    ? { width: 185, borderColor: "red", cursor: "pointer" }
                    : { width: 185, borderColor: "gray" }
                }
              >
                <div>
                  {this.props.app.initializeEnable ? (
                    <PoweroffOutlined
                      className="icon-button3"
                      onClick={() => this.shutdownClick()}
                    />
                  ) : (
                    <PoweroffOutlined className="iconbutton3-basic" />
                  )}
                </div>
                {this.props.app.initializeEnable ? (
                  <p
                    style={{
                      color: "#42dad6",
                      fontSize: "20px",
                      paddingLeft: "15px",
                    }}
                  >
                    Shutdown
                  </p>
                ) : (
                  <p
                    style={{
                      color: "gray",
                      fontSize: "20px",
                      paddingLeft: "15px",
                    }}
                  >
                    Shutdown
                  </p>
                )}
              </Card>

              {/* nShutdown */}
              {shutdownInitiated ? (
                <p style={{ height: "15px", color: "white" }}>
                  <Row>
                    {nShutdowndataArray.map((item) => {
                      return (
                        <div>
                          <CheckOutlined
                            style={{ color: "green", marginTop: "3%" }}
                          />
                          {item.testcommandsTime} - {item.name}
                        </div>
                      );
                    })}
                  </Row>
                </p>
              ) : (
                []
              )}
              {/* E-shutdown */}
              {showTarget ? (
                <p style={{ height: "15px", color: "white", marginTop: "7px" }}>
                  <Row>
                    {eShutdowndataArray.map((item) => {
                      return (
                        <div>
                          <CheckOutlined
                            style={{ color: "green", marginTop: "3%" }}
                          />
                          {item.testcommandsTime} - {item.name}
                        </div>
                      );
                    })}
                  </Row>
                </p>
              ) : (
                []
              )}
            </Col>

            <Col span={3}>
              <Card
                style={
                  (nShutdowndataArray.length >= 1 &&
                    eShutdowndataArray.length >= 1) ||
                  nShutdowndataArray.length >= 2 ||
                  eShutdowndataArray.length >= 2 ||
                  (showTarget === false && communication === false)
                    ? { width: 100, cursor: "pointer", borderColor: "green" }
                    : { width: 100, borderColor: "gray" }
                }
              >
                <div>
                  {(nShutdowndataArray.length >= 1 &&
                    eShutdowndataArray.length >= 1) ||
                  nShutdowndataArray.length >= 2 ||
                  eShutdowndataArray.length >= 2 ||
                  (showTarget === false && communication === false) ? (
                    <RedoOutlined
                      className="icon-button2"
                      onClick={() => this.reloadAllEvents()}
                    />
                  ) : (
                    <RedoOutlined className="iconbutton2-basic" />
                  )}
                </div>

                {(nShutdowndataArray.length >= 1 &&
                  eShutdowndataArray.length >= 1) ||
                nShutdowndataArray.length >= 2 ||
                eShutdowndataArray.length >= 2 ||
                (showTarget === false && communication === false) ||
                communicationFailed === true ? (
                  <p style={{ color: "#42dad6", fontSize: "20px" }}>Reset</p>
                ) : (
                  <p style={{ color: "gray", fontSize: "20px" }}>Reset</p>
                )}
              </Card>
            </Col>

            <Col span={2}>
              <Popover
                title={
                  <div>
                    <p style={{ fontWeight: "bold" }}>
                      {value} {this.state.valvestatustime}
                    </p>
                  </div>
                }
                content={
                  <div>
                    <p>
                      {PilotFlameAir} {this.state.PilotFlameAir}{" "}
                    </p>
                    <p>
                      {FuelInjectorAir} {this.state.FuelInjectorAir}
                    </p>
                    <p>
                      {PilotFlameGas} {this.state.PilotFlameGas}
                    </p>
                    <p>
                      {FCVAir} {this.state.FCVAir}
                    </p>
                    <p>
                      {FCVKeroseneFuel} {this.state.FCVKeroseneFuel}
                    </p>
                    <p>
                      {ByPassValueI} {this.state.ByPassValueI}
                    </p>
                    <p>
                      {ByPassValueII} {this.state.ByPassValueII}
                    </p>
                    <p>
                      {IgnitorSwitch} {this.state.IgnitorSwitch}
                    </p>
                    <p>
                      {KerosenePump} {this.state.KerosenePump}
                    </p>
                    <p>
                      {LubeOilPump} {this.state.LubeOilPump}
                    </p>
                  </div>
                }
                trigger="click"
                placement="bottomRight"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
              >
                <Card
                  style={
                    showTarget
                      ? { width: 100, cursor: "pointer", borderColor: "green" }
                      : { width: 100, borderColor: "gray" }
                  }
                >
                  <div>
                    {showTarget ? (
                      <QuestionOutlined
                        className="icon-button4"
                        onClick={this.onClickhelp}
                      />
                    ) : (
                      <QuestionOutlined className="iconbutton4-basic" />
                    )}
                  </div>
                  {showTarget ? (
                    <p style={{ color: "#42dad6", fontSize: "20px" }}>Help</p>
                  ) : (
                    <p style={{ color: "gray", fontSize: "20px" }}>Help</p>
                  )}
                </Card>
              </Popover>
            </Col>
          </Row>
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  app: state.app,
});

const mapDispatchToProps = {
  navigateMainPage,
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
  stopDbInsert,
  startDbInsert,
  updateTestIdValue,
  updateTestIdCount,
  updateDropDown,
  updateNotifyAction,
  initializeEnableEvent,
  gettingTestIdData,
  startDisableEvent,
};

const TestContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TestPageContainer);
export default TestContainer;
