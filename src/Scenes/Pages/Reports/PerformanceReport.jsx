import React, { Component } from 'react'
import { Col, Row, Layout, Input, Button, Select, Form } from 'antd';
import axios from 'axios';
import { updateTitleElements } from '../../../Redux/action'
import { connect } from 'react-redux';
import TableElement from '../../Components/subComponents/TableElement'
import { performance } from '../../../Services/constants';
import PdfContainer from './PdfContainer';
import Doc from './DocService';
import jsPDF from "jspdf";
import 'jspdf-autotable';
import logo from '../../../Images/logo.png'
import logo2 from '../../../Images/logo2.png'


const { RPM1, RPM2, Minutes, trubineInletTemp, ComprInletPr, ComprOutletPr, PrRatio, AirMassFlow } = performance;
const { Option } = Select;
class PerformanceReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportOut1: [],
      reportOut2: [],
      testno: [],
      testno1: [],
      turboIdVal: [],
      tester: '',
      witness: ''
    }
  }
  componentDidMount() {
    this.props.updateTitleElements({
      title: 'Running Report',
      type: 'Report',
    })
  }
  getreportpdf = () => {

    var doc = new jsPDF();
    doc.setFontSize(12);

    // var img = new Image();    
    // img.src = 'F:/Naveen/DRDO/enertek-combuster/src/Images/bg.jpeg';    
    // doc.text(75, 10, "ENDURANCE TEST REPORT");
    // doc.addImage(img, 'JPEG', 10, 10, 37, 16);
    // //doc.text(10, 45, "Turbine Id: " + localStorage.getItem("rTurbineId"));

    /*doc.autoTable({
    html: '#example1',
    didParseCell: function (cell, data) {
    if (cell.row.section == 'body' && cell.row.index === 0) {
      cell.cell.styles.fontStyle = 'bold';
    }
    },
    startY: 70
    })
    */
    doc.text(75, 10, "PERFORMENCE TEST REPORT");
    var image = new Image();
    image.src = "../../../Images/up-arrow-1.gif"
    doc.addImage(logo2, 'PNG', 10, 25, 75, 20);
    // const d = new Date(localStorage.getItem("rTestinDate"))
    // const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
    // const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
    // const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
    // doc.text(10, 55, "Testing Date: " + `${da}-${mo}-${ye}`);
    //   doc.text(10, 65, "Test No: " + localStorage.getItem("rTestNo"));
    doc.autoTable({
      html: '#report-constants',
      startX: 50,
      startY: 51,
      margins: {
        top: 40,
        bottom: 60,
        left: 5,
        right: 5
      },
      headerStyles: {
        lineWidth: 0.1,
        fillColor: 'white',
        textColor: 'black',
        fontStyle: 'bold',
        lineColor: 'black',
        halign: 'center',

      },

      bodyStyles: {
        lineColor: 'black'
      },
      tableWidth: 'wrap',
      theme: 'grid'
    })
    doc.autoTable({
      html: '#example1',
      startY: 70,
      didParseCell: function (cell, data) {

        if (cell.row.section == 'body' && (cell.row.index === 1 || cell.row.index === 3)) {
          cell.cell.styles.fontStyle = 'bold';
          cell.cell.styles.textColor = 'black';
        }
      },
      margins: {
        top: 40,
        bottom: 60,
        left: 5,
        right: 5
      },
      headerStyles: {
        lineWidth: 0.1,
        fillColor: 'white',
        textColor: 'black',
        fontSize: 6,
        fontStyle: 'bold',
        lineColor: 'black',
        halign: 'center'
      },
      bodyStyles: {
        lineColor: 'black',
        fontSize: 6,
        fontStyle: 'bold'
      },
      theme: 'grid'
    })

    let finalY = doc.lastAutoTable.finalY;

    let tester = this.state.tester;
    if (null != localStorage.getItem("rTestedBy")) {
      tester = localStorage.getItem("rTestedBy")
    }
    let rWitnessName = this.state.witness;
    if (null != localStorage.getItem("rWitnessName") && localStorage.getItem("rWitnessName") != undefined) {
      rWitnessName = localStorage.getItem("rWitnessName")
    }
    doc.setFontSize(12);
    //doc.setTextColor(255, 0, 0);
    doc.text(15, finalY + 10, "Tested By: ");

    const textWidth = doc.getTextWidth("Tested By: ");
    doc.setLineWidth(0.3);
    doc.setDrawColor(0, 0, 0);
    doc.line(15, finalY + 11, 10 + (textWidth + 4), finalY + 11);
    var testerAry = tester.split(',');
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
    var rWitnessNameAry = rWitnessName.split(',');
    incrementHeight = 5;
    if (rWitnessNameAry.length > 0) {
      for (var i = 0; i < rWitnessNameAry.length; i++) {
        doc.text(150, finalY + 13 + incrementHeight, rWitnessNameAry[0]);
        incrementHeight += 5;
      }
    }

    doc.save('PerformanceReport.pdf')
  }
  getreport = () => {
    axios.post('http://192.168.0.167:6002/Performance.php', { turboIdVal: this.state.turboIdVal, testno: this.state.testno1 },)
      .then(res => {
        console.log(res.data)
        this.setState({
          reportOut1: res.data[0],
          reportOut2: res.data[1]
        })
        console.log(this.state.reportOut1)
        console.log(this.state.reportOut2)
      })
      .catch(err => {
        console.log(err.res)
      })
    axios.post('http://192.168.0.167:6002/getnames.php', { turboIdVal: this.state.turboIdVal, testno: this.state.testno1 },)
      .then(res => {
        console.log(res.data[0].tester)
        this.setState({
          tester: res.data[0].tester,
          witness: res.data[0].witness
        })

      })
      .catch(err => {
        console.log(err.res)
      })

  }

  createPdf = (html) => Doc.createPdf(html);
  handleChangetestID = (value) => {
    axios.post('http://192.168.0.167:6001/exportData.php', { turboIdVal: value }).then(res => {
      let chartdata = res.data;
      console.log(res)
      this.setState({
        testno: chartdata
      })
      this.setState({
        turboIdVal: value
      })
    }).catch(err => {
      console.log(err);
    })

    console.log(this.state.turboIdVal)
    console.log(this.state.testno1)
  }
  handleChangetestNO = (value) => {

    this.setState({
      testno1: value
    })


    console.log(this.state.turboIdVal)
    console.log(this.state.testno1)
  }
  render() {
    var rpm1 = Math.round(this.state.reportOut1.speed_time * 100) / 100
    var rpm2 = Math.round(this.state.reportOut2.speed_time * 100) / 100
    var Turbine_Inlet1 = Math.round(this.state.reportOut1.Turbine_Inlet * 100) / 100
    var Turbine_Inlet2 = Math.round(this.state.reportOut2.Turbine_Inlet * 100) / 100
    var Compr_Inlet_pr1 = Math.round(this.state.reportOut1.Compr_Inlet_pr * 100) / 100
    var Compr_Inlet_pr2 = Math.round(this.state.reportOut2.Compr_Inlet_pr * 100) / 100
    var Compr_Outlet_pr1 = Math.round(this.state.reportOut1.Compr_Outlet_pr * 100) / 100
    var Compr_Outlet_pr2 = Math.round(this.state.reportOut2.Compr_Outlet_pr * 100) / 100
    var pr_ratio1 = Math.round(this.state.reportOut1.pr_ratio * 100) / 100
    var pr_ratio2 = Math.round(this.state.reportOut2.pr_ratio * 100) / 100
    var Air_Mass_Flow1 = Math.round(this.state.reportOut1.Air_Mass_Flow) / 100
    var Air_Mass_Flow2 = Math.round(this.state.reportOut1.Air_Mass_Flow) / 100
    var Compr_Efficiency1 = Math.round(this.state.reportOut1.Compr_Efficiency) / 100
    var Compr_Efficiency2 = Math.round(this.state.reportOut1.Compr_Efficiency) / 100
    var Surge_margin1 = Math.round(this.state.reportOut1.Surge_margin) / 100
    var Surge_margin2 = Math.round(this.state.reportOut1.Surge_margin) / 100
    const testIdValue = this.props.app.turboConfig;
    const testno = this.state.testno;
    console.log(testno)
    console.log(this.state.testno);

    return (
      <div style={{ paddingTop: "1px" }}>
        <Layout class="layout-container">
          <h2 class="h2">Performance  Report</h2>
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
                      <Input.Group compact>
                        <Select
                          defaultValue="Select Turbo ID"
                          style={{ width: '300px' }}
                          onChange={this.handleChangetestID}
                        >
                          {testIdValue.map(it => (
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
                <label class="label">Test No<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
                <span> &nbsp; &nbsp; &nbsp;</span>
              </Col>
              <Col sm={10}>
                <Form.Item name="options">
                  <Input.Group compact>
                    <Select
                      defaultValue="Select Test No"
                      style={{ width: '300px' }}
                      onChange={this.handleChangetestNO}
                    >
                      testno ?
                            {testno.map(it => (
                      <Option key={it.testno} value={it.testno}>
                        {it.testno}
                      </Option>
                    ))} : []
                          </Select>
                  </Input.Group>
                </Form.Item>
              </Col>

            </Row>

            <Row style={{ paddingTop: '25px', paddingLeft: "30%", paddingBottom: '10px' }}>
              <Col xs={4}>
                <Form.Item>
                  <Button onClick={this.getreport}> view</Button>
                </Form.Item>
              </Col>
              <Col xs={4}>
                <Form.Item>
                  <Button> Clear</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Layout>
        <Button
          onClick={this.getreportpdf}
          style={{ marginLeft: '1270px', marginBottom: '20px', marginTop: '20px', width: '140px' }}
        >Export Report</Button>
        <Layout class="bottom-container" style={{ paddingTop: '10px', paddingBottom: '30px', border: 'solid white' }}>
          <div id="allreport">
            <div class="mx-auto" style={{ marginBottom: '2%', marginTop: '2%' }}>
              <div class="sparkline12-hd" style={{ paddingBottom: '15px' }}>
                <div class="main-sparkline12-hd" style={{ textAlign: "center" }}>
                  <h1>Performance Report</h1>
                </div>
              </div>
            </div>

            <div class="table-responsive">
              <img src={logo} />
              <table id="report-constants" style={{ marginTop: "50px" }}>

                <tr>
                  <td>SERIAL NUMBER</td>
                  <td>{this.state.turboIdVal}</td>
                </tr>
                <tr>
                  <td>TEST ID</td>
                  <td>{this.state.testno1}</td>
                </tr>
              </table>

              <table class="table table-striped table-sm export-table" id="example1">
                <thead>
                  <tr>
                    <th style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }} colspan="12">PERFORMANCE TEST</th>

                  </tr>
                  <tr>
                    <th rowspan="2" style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}></th>

                    <th style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>Speed</th>
                    <th style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>Duration</th>
                    <th style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }} colspan="2">Oil</th>
                    <th style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>Turbo.InletTemp</th>
                    <th style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>Compr.Intlet Pr</th>
                    <th style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>Compr.Outlet Pr</th>
                    <th style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>Pr Ratio</th>
                    <th style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>Air Mass Flow</th>
                    <th style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>Compr Efficiency</th>
                    <th style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>Surge Margin</th>
                  </tr>
                  <tr>
                    <th style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>RPM</th>
                    <th style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>minutes</th>
                    <th style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>Pressure(kg/cm^2)</th>
                    <th style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>Tempr.<br />(deg.C)</th>
                    <th style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>deg.C</th>
                    <th style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>RPM</th>
                    <th style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>minutes</th>
                    <th style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>Pressure(kg/cm^2)</th>
                    <th style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>Tempr.<br />(deg.C)</th>
                    <th style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>deg.C</th>
                    <th style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>deg.C</th>
                  </tr>

                </thead>
                <tbody>
                  <tr>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>Required</td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>{RPM1}</td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>{Minutes}</td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}></td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}></td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>{trubineInletTemp}</td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>{ComprInletPr}</td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>{ComprOutletPr}</td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>{PrRatio}</td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>{AirMassFlow}</td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}></td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}></td>                </tr>
                  <tr ng-repeat="Rreport in RunningResult | filter:query  ">
                    <td style={{ border: '1px solid #6a6a6b', textAlign: 'center' }}>
                      Actual(Avg)
                      </td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>{rpm1}</td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>{this.state.reportOut1.Duration}</td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}></td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}></td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>{Turbine_Inlet1}</td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>{Compr_Inlet_pr1}</td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>{Compr_Outlet_pr1}</td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>{pr_ratio1}</td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>{Air_Mass_Flow1}</td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>{Compr_Efficiency1}</td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>{Surge_margin1}</td>
                  </tr>
                  <tr>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>Required</td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>{RPM2}</td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>{Minutes}</td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}></td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}></td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>{trubineInletTemp}</td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>{ComprInletPr}</td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>{ComprOutletPr}</td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>{PrRatio}</td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>{AirMassFlow}</td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}></td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}></td>                </tr>
                  <tr ng-repeat="Rreport in RunningResult | filter:query  ">
                    <td style={{ border: '1px solid #6a6a6b', textAlign: 'center' }}>
                      Actual(Avg)
                      </td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>{rpm2}</td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>{this.state.reportOut2.Duration}</td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}></td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}></td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>{Turbine_Inlet2}</td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>{Compr_Inlet_pr2}</td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>{Compr_Outlet_pr2}</td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>{pr_ratio2}</td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>{Air_Mass_Flow2}</td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>{Compr_Efficiency2}</td>
                    <td style={{ verticalAlign: 'middle', border: '1px solid #6a6a6b', textAlign: 'center' }}>{Surge_margin2}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="row" style={{ marginTop: '60px' }}>
              <div class="col-lg-1">
              </div>
              <div class="col-lg-4">
                <label><b><u>Tested By: {this.state.tester}</u></b></label>
                <br />
                <table>
                  <tr ng-repeat="tb in TestedBy">
                    <td></td>
                  </tr>
                </table>
              </div>
              <div class="col-lg-2">
              </div>
              <div class="col-lg-4">
                <label><b><u>Witnessed By: {this.state.witness}</u></b></label>
                <br />
                <table>
                  <tr ng-repeat="wn in WitnessName">
                    <td></td>
                  </tr>
                </table>
              </div>
              <div class="col-lg-1">
              </div>
            </div>
          </div>
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

const performanceReport = connect(
  mapStateToProps,
  mapDispatchToProps
)(PerformanceReport)

export default performanceReport;