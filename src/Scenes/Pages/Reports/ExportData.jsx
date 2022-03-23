import React, { Component } from "react";
import {
  Col,
  Row,
  Layout,
  Input,
  Button,
  Select,
  Table,
  Form,
  Spin,
  message,
} from "antd";
import { updateTitleElements } from "../../../Redux/action";
import { connect } from "react-redux";
import axios from "axios";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const { Option } = Select;
let paramObj = {};
class ExportData extends Component {
  formRef = React.createRef(); //this is used to reset datas
  constructor(props) {
    super(props);
    this.state = {
      turboIdVal: "",
      testno: [],
      reportDetails: [],
      emptyTestno: false,
      loading: false,
      title: [],

      formulaUnit: {
        "Combuster outlet Temperature": "Degree C",
        "Turbine Inlet Temperature": "Degree C",
        "Turbine outlet Temperature": "Degree C",
        "Compressor Inlet Temperature": "Degree C",
        "Compressor Outlet Temperature": "Degree C",
        "Ambient Temperature": "Degree C",
        "Combuster Inlet Pressure": "Kg/cm2",
        "Fuel Line Pressure": "Kg/cm2",
        "Turbine Inlet Pressure": "Kg/cm2",
        "Ambient Pressure": "Kg/cm2",
        "Compressor Inlet Pressure": "Kg/cm2",
        "Compressor Outlet Pressure": "Kg/cm2",
        "Ventury meter differencial Pressure": "Kg/cm2",
        "Fuel Flow Rate": "LPM",
        "RPM Sensor": "RPM",
      },
      timeUnit: {
        testdataTime: "Time",
      },
    };
  }

  componentDidMount() {
    this.props.updateTitleElements({
      title: "ExportData",
      type: "Report",
    });
    let paramValue = this.props.app.paramConfig
      ? this.props.app.paramConfig
      : [];

    //while adding the unit row in the table,exported excel sheet not in the correct order,
    //so here changed the order of the array index value

    const index = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    const createdData = index.map((i) => paramValue[i]);

    let createParam = this.props.app.paramConfig
      ? createdData.map((It) => It.Paramname)
      : [];
    console.log(createParam);
    let createUnit = this.props.app.paramConfig
      ? createdData.map((It) => It.unitname)
      : [];

    createParam.forEach((key, i) => (paramObj[key] = createUnit[i]));
  }
  //to reset the input box
  onReset = () => {
    this.formRef.current.resetFields();
  };

  //to view the report
  getReport = () => {
    if (this.state.turboIdVal === "" || this.state.turboIdVal.length === 0) {
      message.warning("Select the turbo ID");
    } else if (this.state.testno1 === "" || this.state.testno1 === undefined) {
      message.warning("Select the test No");
    }

    if (
      this.state.turboIdVal !== "" &&
      this.state.testno1 !== "" &&
      this.state.testno1 !== undefined &&
      this.state.turboIdVal.length !== 0
    ) {
      axios
        .post("http://localhost:5000/getReport.php", {
          //getting the exportData table value
          turboIdVal: this.state.turboIdVal,
          testno: this.state.testno1,
        })
        .then((res) => {
          let data = res.data;
          if (data.length > 5 && typeof data !== "string") {
            //updated the export data title
            this.setState({
              title: Object.keys(data[0]),
            });

            //merging the testdatatime,live data unit,formula unit
            let unitMerged = {
              ...this.state.timeUnit,
              ...paramObj,
              ...this.state.formulaUnit,
            };
            //concatinating the unitData with the live data
            let exportdataData = [].concat(unitMerged, data);

            //updating the data to the state
            this.setState({
              reportDetails: exportdataData,
            });
          } else {
            message.warning("Check the test No");
          }
        })
        .catch((err) => {
          console.log(err.res);
        });
      this.setState({ loading: true });
      axios
        .post("http://localhost:5000/getnames.php", {
          //getting the tester and witness name
          turboIdVal: this.state.turboIdVal,
          testno: this.state.testno1,
        })
        .then((res) => {
          this.setState({
            tester: res.data[0].tester,
            witness: res.data[0].witness,
            loading: false,
          });
        })
        .catch((err) => {
          console.log(err.res);
        });
    }
  };

  //select the TestID
  handleChangeTestID = (value) => {
    axios
      .post("http://localhost:5000/exportData.php", { turboIdVal: value })
      .then((res) => {
        let data = res.data;
        if (typeof data === "string") {
          this.setState({
            testno: [],
          });
        } else if (data.length > 0 && typeof data !== "string") {
          this.setState({
            testno: data,
          });
        }
        this.setState({
          turboIdVal: value,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //select the Test Number
  handleChangetestNO = (value) => {
    this.setState({
      testno1: value,
    });
  };

  //exporting csv
  exportToCSV = (csvData, fileName) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  // //export pdf
  // exportToPDF = () => {
  //   const input = document.getElementById("someRandomID");
  //   html2canvas(input).then((canvas) => {
  //     var imgWidth = 200;
  //     var imgHeight = (canvas.height * imgWidth) / canvas.width;
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF("p", "mm", "a4");
  //     var position = 0;
  //     pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
  //     pdf.save("download.pdf");
  //   });
  // };

  render() {
    const testIdValue = this.props.app.turboConfig;
    const testno = this.state.testno;
    console.log(this.state.title[0]);
    const columns = [
      {
        title: this.state.title[0],
        dataIndex: this.state.title[0],
        key: this.state.title[0],
        fixed: "left",
        width: 20,
      },
      {
        title: this.state.title[1],
        dataIndex: this.state.title[1],
        key: this.state.title[1],
        fixed: "left",
        width: 20,
      },
      {
        title: this.state.title[2],
        dataIndex: this.state.title[2],
        key: this.state.title[2],
        width: 20,
      },
      {
        title: this.state.title[3],
        dataIndex: this.state.title[3],
        key: this.state.title[3],
        width: 20,
      },
      {
        title: this.state.title[4],
        dataIndex: this.state.title[4],
        key: this.state.title[4],
        width: 20,
      },
      {
        title: this.state.title[5],
        dataIndex: this.state.title[5],
        key: this.state.title[5],
        width: 20,
      },
      {
        title: this.state.title[6],
        dataIndex: this.state.title[6],
        key: this.state.title[6],
        width: 20,
      },
      {
        title: this.state.title[7],
        dataIndex: this.state.title[7],
        key: this.state.title[7],
        width: 20,
      },
      {
        title: this.state.title[8],
        dataIndex: this.state.title[8],
        key: this.state.title[8],
        width: 15,
      },
      {
        title: this.state.title[9],
        dataIndex: this.state.title[9],
        key: this.state.title[9],
        width: 20,
      },
      {
        title: this.state.title[10],
        dataIndex: this.state.title[10],
        key: this.state.title[10],
        width: 20,
      },
      {
        title: this.state.title[11],
        dataIndex: this.state.title[11],
        key: this.state.title[11],
        width: 20,
      },
      {
        title: this.state.title[12],
        dataIndex: this.state.title[12],
        key: this.state.title[12],
        width: 20,
      },
      {
        title: this.state.title[13],
        dataIndex: this.state.title[13],
        key: this.state.title[13],
        width: 20,
      },
      {
        title: this.state.title[14],
        dataIndex: this.state.title[14],
        key: this.state.title[14],
        width: 20,
      },
      {
        title: this.state.title[15],
        dataIndex: this.state.title[15],
        key: this.state.title[15],
        width: 20,
      },
    ];
    return (
      <div style={{ paddingTop: "1px" }}>
        <Layout className="layout-container">
          <h2 className="h2"> Export Report</h2>
          <Form
            ref={this.formRef}
            style={{ paddingLeft: "3%" }}
            name="control-ref"
          >
            <Row style={{ paddingTop: "10px" }}>
              <Col sm={10}>
                <Form.Item
                  name="option"
                  label="Turbo ID"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input.Group compact>
                    <Input.Group compact>
                      <Select
                        defaultValue="Select Turbo ID"
                        style={{ width: "300px" }}
                        onChange={this.handleChangeTestID}
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

              <Form.Item
                name="options"
                label="Test No"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
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
            </Row>
            <Row
              style={{
                paddingTop: "0px",
                paddingLeft: "38%",
                paddingBottom: "25px",
              }}
            >
              <Button onClick={() => this.getReport()}> View</Button>

              <Button
                htmlType="button"
                style={{ marginLeft: "4%" }}
                onClick={this.onReset}
              >
                Reset
              </Button>
            </Row>
          </Form>
        </Layout>

        <Button
          style={{
            marginLeft: "1270px",
            marginBottom: "10px",
            marginTop: "10px",
            width: "140px",
          }}
          variant="warning"
          onClick={(e) =>
            this.exportToCSV(this.state.reportDetails, "Export Report")
          }
        >
          Export in Excel
        </Button>

        <Spin tip="Loading..." size="large" spinning={this.state.loading}>
          <Layout className="export-layout">
            <div id="allreport">
              <div className="mx-auto" style={{ marginTop: "2%" }}>
                <div
                  className="main-sparkline12-hd"
                  style={{ textAlign: "center" }}
                >
                  <h1>Export Data</h1>
                </div>
              </div>
            </div>
            <Table
              id="someRandomID"
              size="middle"
              columns={columns}
              pagination={false}
              dataSource={this.state.reportDetails}
              scroll={{ x: 2000, y: 500 }}
            />
          </Layout>
        </Spin>
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
const exportData = connect(mapStateToProps, mapDispatchToProps)(ExportData);
export default exportData;
