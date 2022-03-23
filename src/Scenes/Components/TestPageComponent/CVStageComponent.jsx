import React, { Component } from "react";
import { Row, Layout, Progress, Col, Input, Alert, Space, Button } from "antd";
import { connect } from "react-redux";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { fcvTransferEvent } from "../../../Services/requests";
import { testParamHash } from "../../../Services/constants";
import {
  updatingAirFCVInput,
  updatingKeroseneFCVInput,
} from "../../../Redux/action";
const { Startdata, nShutdowndata, eShutdowndata, airFCVValue_warning } =
  testParamHash;

class CVStageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errormsg: "",
    };
  }

  //FCV value increasing and decreasing
  fineCVIncreseClick = () => {
    if (
      this.props.app.airFCVInput === 0 ||
      this.props.app.airFCVInput === undefined ||
      this.props.app.airFCVInput < 0.1 ||
      this.props.app.airFCVInput > 0.55
    ) {
      this.setState({
        errormsg: airFCVValue_warning,
      });
      return;
    }
    const body = {
      state: 1,
      fcvValue: this.props.app.chartData[0].Air_FCV,
      decimalNum: this.props.app.airFCVInput,
      operationType: 1,
      testId: this.props.app.testIdData,
    };
    fcvTransferEvent(body, (data) => {});
  };

  fineCVDecreseClick = () => {
    if (
      this.props.app.airFCVInput === 0 ||
      this.props.app.airFCVInput === undefined ||
      this.props.app.airFCVInput < 0.1 ||
      this.props.app.airFCVInput > 0.55
    ) {
      this.setState({
        errormsg: airFCVValue_warning,
      });
      return;
    }
    const body = {
      state: 1,
      fcvValue: this.props.app.chartData[0].Air_FCV,
      decimalNum: this.props.app.airFCVInput,
      operationType: 2,
      testId: this.props.app.testIdData,
    };
    fcvTransferEvent(body, (data) => {});
  };

  fuelCVIncreseClick = () => {
    if (
      this.props.app.keroseneFCVInput === 0 ||
      this.props.app.keroseneFCVInput === undefined ||
      this.props.app.keroseneFCVInput < 0.1 ||
      this.props.app.keroseneFCVInput > 0.55
    ) {
      this.setState({
        errormsg: airFCVValue_warning,
      });
      return;
    }
    const body = {
      state: 2,
      fcvValue: this.props.app.chartData[0].Kerosene_FCV,
      decimalNum: this.props.app.keroseneFCVInput,
      operationType: 1,
      testId: this.props.app.testIdData,
    };
    fcvTransferEvent(body, (data) => {});
  };

  fuelCVDecreseClick = () => {
    if (
      this.props.app.keroseneFCVInput === 0 ||
      this.props.app.keroseneFCVInput === undefined ||
      this.props.app.keroseneFCVInput < 0.1 ||
      this.props.app.keroseneFCVInput > 0.55
    ) {
      this.setState({
        errormsg: airFCVValue_warning,
      });
      return;
    }
    const body = {
      state: 2,
      fcvValue: this.props.app.chartData[0].Kerosene_FCV,
      decimalNum: this.props.app.keroseneFCVInput,
      operationType: 2,
      testId: this.props.app.testIdData,
    };
    fcvTransferEvent(body, (data) => {});
  };

  //error msg onclick
  errorDoneClick = () => {
    this.setState({
      errormsg: "",
    });
  };

  onChangeFineAirInput = (event) => {
    this.props.updatingAirFCVInput(event.target.value);
  };
  onChangeFuelInput = (event) => {
    this.props.updatingKeroseneFCVInput(event.target.value);
  };

  render() {
    let fine_FCV = this.props.app.chartData[0].Air_FCV;
    let fuel_FCV = this.props.app.chartData[0].Kerosene_FCV;
    let turboStart = [];
    if (this.props.app.turboStart) {
      turboStart = this.props.app.turboStart;
    }

    const StartdataArray = turboStart.filter((it) =>
      Startdata.find((val) => val === it.name)
    );
    const nShutdowndataArray = turboStart.filter((it) =>
      nShutdowndata.find((val) => val === it.name)
    );

    const eShutdowndataArray = turboStart.filter((it) =>
      eShutdowndata.find((val) => val === it.name)
    );

    return (
      <div>
        <Layout
          style={{
            backgroundColor: "transparent",
            marginTop: "14px",
          }}
        >
          <Row gutter={[16, 24]}>
            <Col xl={10} style={{ marginLeft: "5px" }}>
              <Row
                gutter={[8, 4]}
                className="progress_box"
                style={{ marginRight: "10px" }}
              >
                <Col span={6}>
                  <Progress
                    strokeWidth={10}
                    strokeColor="#03fc28"
                    type="circle"
                    width={65}
                    style={{ marginLeft: "2px" }}
                    percent={fine_FCV}
                  />
                </Col>

                <Col span={4} style={{ marginTop: "8%", marginLeft: "2%" }}>
                  {StartdataArray.find((it) => it.name === "Stage 3") &&
                  nShutdowndataArray.length === 0 &&
                  eShutdowndataArray.length === 0 ? (
                    <div>
                      {fine_FCV >= 100 ? (
                        <ImArrowUp className="arrow-btn-disable" size={30} />
                      ) : (
                        <ImArrowUp
                          size={30}
                          className="arrow-btn"
                          onClick={() => this.fineCVIncreseClick()}
                        />
                      )}
                    </div>
                  ) : (
                    <div className="arrow-btn-disable">
                      <ImArrowUp size={30} />
                    </div>
                  )}
                </Col>

                <Col span={4} style={{ marginTop: "2%", marginLeft: "2%" }}>
                  <Input
                    value={this.props.app.airFCVInput}
                    onChange={this.onChangeFineAirInput}
                    name="FineAir"
                    style={{ width: "75px" }}
                  />
                </Col>

                <Col span={4} style={{ marginTop: "8%", marginLeft: "18%" }}>
                  {StartdataArray.find((it) => it.name === "Stage 3") &&
                  nShutdowndataArray.length === 0 &&
                  eShutdowndataArray.length === 0 ? (
                    <div>
                      {fine_FCV <= 0 ? (
                        <ImArrowDown className="arrow-btn-disable" size={30} />
                      ) : (
                        <ImArrowDown
                          size={30}
                          className="arrow-btn"
                          onClick={() => this.fineCVDecreseClick()}
                        />
                      )}
                    </div>
                  ) : (
                    <div className="arrow-btn-disable">
                      <ImArrowDown size={30} />
                    </div>
                  )}
                </Col>

                <Row
                  className="progress_title"
                  style={{ marginTop: "9px", marginLeft: "25%" }}
                >
                  <strong>Air Fine Control Valve</strong>
                </Row>
              </Row>
            </Col>

            <Col xl={10} style={{ marginLeft: "5px" }}>
              <Row
                gutter={[8, 4]}
                className="progress_box"
                style={{ marginRight: "10px" }}
              >
                <Col span={6}>
                  <Progress
                    strokeWidth={10}
                    strokeColor="#03fc28"
                    type="circle"
                    width={65}
                    style={{ marginLeft: "2px" }}
                    percent={fuel_FCV}
                  />
                </Col>

                <Col span={4} style={{ marginTop: "8%", marginLeft: "2%" }}>
                  {StartdataArray.find((it) => it.name === "Stage 3") &&
                  nShutdowndataArray.length === 0 &&
                  eShutdowndataArray.length === 0 ? (
                    <div>
                      {fuel_FCV >= 100 ? (
                        <ImArrowUp className="arrow-btn-disable" size={30} />
                      ) : (
                        <ImArrowUp
                          size={30}
                          className="arrow-btn"
                          onClick={() => this.fuelCVIncreseClick()}
                        />
                      )}
                    </div>
                  ) : (
                    <div className="arrow-btn-disable">
                      <ImArrowUp size={30} />
                    </div>
                  )}
                </Col>

                <Col span={4} style={{ marginTop: "2%", marginLeft: "2%" }}>
                  <Input
                    value={this.props.app.keroseneFCVInput}
                    onChange={this.onChangeFuelInput}
                    name="FineAir"
                    style={{ width: "75px" }}
                  />
                </Col>

                <Col span={4} style={{ marginTop: "8%", marginLeft: "18%" }}>
                  {StartdataArray.find((it) => it.name === "Stage 3") &&
                  nShutdowndataArray.length === 0 &&
                  eShutdowndataArray.length === 0 ? (
                    <div>
                      {fuel_FCV <= 0 ? (
                        <ImArrowDown className="arrow-btn-disable" size={30} />
                      ) : (
                        <ImArrowDown
                          size={30}
                          className="arrow-btn"
                          onClick={() => this.fuelCVDecreseClick()}
                        />
                      )}
                    </div>
                  ) : (
                    <div className="arrow-btn-disable">
                      <ImArrowDown size={30} />
                    </div>
                  )}
                </Col>

                <Row
                  className="progress_title"
                  style={{ marginTop: "9px", marginLeft: "25%" }}
                >
                  <strong>Kerosene Fuel control </strong>
                </Row>
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
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  app: state.app,
});

const mapDispatchToProps = { updatingAirFCVInput, updatingKeroseneFCVInput };

const CVStage = connect(mapStateToProps, mapDispatchToProps)(CVStageComponent);
export default CVStage;
