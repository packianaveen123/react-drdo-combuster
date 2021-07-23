import React, { Component } from "react";
import { Col, Row, Layout, Input, Button, Select, Form } from "antd";
import axios from "axios";
import { updateTitleElements } from "../../../Redux/action";
import { connect } from "react-redux";
import { endurence, CompanyDetails } from "../../../Services/constants";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo2 from "../../../Images/logo2.png";

const { Option } = Select;
const { RPM, Minutes, trubineInletTemp } = endurence;
const { drdo_logo } = CompanyDetails
class EndurenceReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportOut: [],
      reportOut1: [],
      reportOut2: [],
      testno: [],
      testno1: [],
      turboIdVal: [],
      tester: "",
      witness: "",
    };
  }
  componentDidMount() {
    this.props.updateTitleElements({
      title: "Running Report",
      type: "Report",
    });
  }
  getreportpdf = () => {
    var doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(75, 10, "ENDURENCE TEST REPORT");
    var image = new Image();
    image.src = "../../../Images/up-arrow-1.gif";
    doc.addImage(logo2, "PNG", 10, 25, 75, 20);
    doc.autoTable({
      html: "#report-constants",
      startX: 50,
      startY: 51,
      margins: {
        top: 40,
        bottom: 60,
        left: 5,
        right: 5,
      },
      headerStyles: {
        lineWidth: 0.1,
        fillColor: "white",
        textColor: "black",
        fontStyle: "bold",
        lineColor: "black",
        halign: "center",
      },

      bodyStyles: {
        lineColor: "black",
      },
      tableWidth: "wrap",
      theme: "grid",
    });
    doc.autoTable({
      html: "#example1",
      startY: 70,
      didParseCell: function (cell, data) {
        if (
          cell.row.section === "body" &&
          (cell.row.index === 1 || cell.row.index === 3)
        ) {
          cell.cell.styles.fontStyle = "bold";
          cell.cell.styles.textColor = "black";
        }
      },
      margins: {
        top: 40,
        bottom: 60,
        left: 5,
        right: 5,
      },
      headerStyles: {
        lineWidth: 0.1,
        fillColor: "white",
        textColor: "black",
        fontSize: 6,
        fontStyle: "bold",
        lineColor: "black",
        halign: "center",
      },
      bodyStyles: {
        lineColor: "black",
        fontSize: 6,
        fontStyle: "bold",
      },
      theme: "grid",
    });

    let finalY = doc.lastAutoTable.finalY;

    let tester = this.state.tester;
    if (null !== localStorage.getItem("rTestedBy")) {
      tester = localStorage.getItem("rTestedBy");
    }
    let rWitnessName = this.state.witness;
    if (
      null != localStorage.getItem("rWitnessName") &&
      localStorage.getItem("rWitnessName") !== undefined
    ) {
      rWitnessName = localStorage.getItem("rWitnessName");
    }
    doc.setFontSize(8);
    doc.text(15, finalY + 10, "Tested By: ");

    const textWidth = doc.getTextWidth("Tested By: ");
    doc.setLineWidth(0.3);
    doc.setDrawColor(0, 0, 0);
    doc.line(15, finalY + 11, 10 + (textWidth + 4), finalY + 11);
    var testerAry = tester.split(",");
    var incrementHeight = 5;
    if (testerAry.length > 0) {
      for (var i = 0; i < testerAry.length; i++) {
        doc.text(15, finalY + 13 + incrementHeight, testerAry[i]);
        incrementHeight += 5;
      }
    }
    doc.text(150, finalY + 10, "Witnessed By: ");
    const textWidth1 = doc.getTextWidth("Witnessed By: ");
    doc.line(150, finalY + 11, 150 + (textWidth1 - 2), finalY + 11);
    var rWitnessNameAry = rWitnessName.split(",");
    incrementHeight = 5;
    if (rWitnessNameAry.length > 0) {
      for (i = 0; i < rWitnessNameAry.length; i++) {
        doc.text(150, finalY + 13 + incrementHeight, rWitnessNameAry[0]);
        incrementHeight += 5;
      }
    }

    doc.save("Endurence Report.pdf");
  };
  getreport = () => {
    if (this.state.turboIdVal !== '' && this.state.testno1 !== '') {
      axios
        .post("http://192.168.0.167:5000/Endurence.php", {
          turboIdVal: this.state.turboIdVal,
          testno: this.state.testno1,
        })
        .then((res) => {
          this.setState({
            reportOut: res.data[0],
          });
        })
        .catch((err) => {
          console.log(err.res);
        });
      axios
        .post("http://192.168.0.167:5000/getnames.php", {
          turboIdVal: this.state.turboIdVal,
          testno: this.state.testno1,
        })
        .then((res) => {
          this.setState({
            tester: res.data[0].tester,
            witness: res.data[0].witness,
          });
        })
        .catch((err) => {
          console.log(err.res);
        });
    }
  };
  handleChangetestID = (value) => {
    axios
      .post("http://192.168.0.167:5000/exportData.php", { turboIdVal: value })
      .then((res) => {
        let chartdata = res.data;
        this.setState({
          testno: chartdata,
        });
        this.setState({
          turboIdVal: value,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChangetestNO = (value) => {
    this.setState({
      testno1: value,
    });
  };
  render() {
    var rpm = Math.round(this.state.reportOut.speed_time * 100) / 100;
    var Turbine_Inlet =
      Math.round(this.state.reportOut.Turbine_Inlet * 100) / 100;
    const testIdValue = this.props.app.turboConfig;
    const testno = this.state.testno;

    return (
      <div>
        <Layout class="layout-container">
          <h2 class="h2">Endurance Report</h2>
          <Form onFinish={this.onFinish}>
            <Row style={{ paddingTop: "10px" }}>
              <Col sm={2}>
                <label class="label">
                  Turbo ID<i style={{ color: "red", fontSize: "15px" }}> *</i>
                </label>
                <span> &nbsp; &nbsp; &nbsp;</span>
              </Col>
              <Col sm={10}>
                <Col sm={10}>
                  <Form.Item name="option">
                    <Input.Group compact>
                      <Input.Group compact>
                        <Select
                          defaultValue="Select Turbo ID"
                          style={{ width: "300px" }}
                          onChange={this.handleChangetestID}
                        >
                          {testIdValue.map((it) => (
                            <Option key={it.turboname} value={it.turboname}>
                              {it.turboname}
                            </Option>
                          ))}
                        </Select>
                      </Input.Group>
                    </Input.Group>
                  </Form.Item>
                </Col>
              </Col>

              <Col sm={2}>
                <label class="label">
                  Test No<i style={{ color: "red", fontSize: "15px" }}> *</i>
                </label>
                <span> &nbsp; &nbsp; &nbsp;</span>
              </Col>
              <Col sm={10}>
                <Form.Item name="options">
                  <Input.Group compact>
                    <Select
                      defaultValue="Select Test No"
                      style={{ width: "300px" }}
                      onChange={this.handleChangetestNO}
                    >
                      testno ?
                      {testno.map((it) => (
                      <Option key={it.testno} value={it.testno}>
                        {it.testno}
                      </Option>
                    ))}{" "}
                      : []
                    </Select>
                  </Input.Group>
                </Form.Item>
              </Col>
            </Row>

            <Row
              style={{
                paddingTop: "0px",
                paddingLeft: "38%",
                paddingBottom: "10px",
              }}
            >
              <Col xs={4}>
                <Form.Item>
                  <Button onClick={this.getreport}> view</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Layout>
        <Button
          onClick={this.getreportpdf}
          style={{
            marginLeft: "1270px",
            marginBottom: "10px",
            marginTop: "10px",
            width: "140px",
          }}
        >
          Export Report
        </Button>
        {this.state.reportOut ? (
          <Layout
            class="bottom-container"
            style={{
              paddingTop: "10px",
              paddingBottom: "30px",
              border: "solid white",
            }}
          >
            <div id="allreport">
              <div
                class="mx-auto"
                style={{ marginBottom: "1%", marginTop: "2%" }}
              >
                <div class="sparkline12-hd" style={{ paddingBottom: "5px" }}>
                  <div
                    class="main-sparkline12-hd"
                    style={{ textAlign: "center" }}
                  >
                    <h1>Endurance Report</h1>
                  </div>
                </div>
              </div>

              <div class="table-responsive">
                <img alt="logo" src={drdo_logo} />
                <table id="report-constants" style={{ marginTop: "10px" }}>
                  <tr>
                    <td>SERIAL NUMBER</td>
                    <td>{this.state.turboIdVal}</td>
                  </tr>
                  <tr>
                    <td>TEST ID</td>
                    <td>{this.state.testno1}</td>
                  </tr>
                </table>

                <table
                  class="table table-striped table-sm export-table"
                  id="example1"
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                        colspan="6"
                      >
                        ENDURANCE TEST
                      </th>
                    </tr>
                    <tr>
                      <th
                        rowspan="2"
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      ></th>

                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Speed
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Duration
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                        colspan="2"
                      >
                        Oil
                      </th>

                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Turbo <br /> Inlet Temp
                      </th>
                    </tr>
                    <tr>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        RPM
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        minutes
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Pressure <br /> (kg/cm^2)
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Temperature
                        <br />
                        (deg.C)
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        deg.C
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Required
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {RPM}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {Minutes}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      ></td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      ></td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {trubineInletTemp}
                      </td>
                    </tr>
                    <tr ng-repeat="Rreport in RunningResult | filter:query  ">
                      <td
                        style={{
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Actual(Avg)
                      </td>
                      <td
                        style={{
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {rpm}
                      </td>
                      <td
                        style={{
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {this.state.reportOut.Duration}
                      </td>
                      <td
                        style={{
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      ></td>
                      <td
                        style={{
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      ></td>
                      <td
                        style={{
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {Turbine_Inlet}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="row" style={{ marginTop: "10px" }}>
                <div class="col-lg-1"></div>
                <div class="col-lg-4">
                  <label>
                    <b>
                      <u>Tested By: {this.state.tester}</u>
                    </b>
                  </label>
                  <br />
                  <table>
                    <tr ng-repeat="tb in TestedBy">
                      <td></td>
                    </tr>
                  </table>
                </div>
                <div class="col-lg-2"></div>
                <div class="col-lg-4">
                  <label>
                    <b>
                      <u>Witnessed By: {this.state.witness}</u>
                    </b>
                  </label>
                  <br />
                  <table>
                    <tr ng-repeat="wn in WitnessName">
                      <td></td>
                    </tr>
                  </table>
                </div>
                <div class="col-lg-1"></div>
              </div>
            </div>
          </Layout>
        ) : (
          []
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  app: state.app,
});
const mapDispatchToProps = {
  updateTitleElements,
};

const endurenceReport = connect(
  mapStateToProps,
  mapDispatchToProps
)(EndurenceReport);

export default endurenceReport;