import React, { Component } from 'react'
import { Col, Row, Layout, Input, Button, Select, Table } from 'antd';
import { updateTitleElements } from '../../../Redux/action'
import { connect } from 'react-redux';
import axios from 'axios';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const { Option } = Select;
const columns = [
  {
    title: 'T1T2',
    dataIndex: 'T1T2',
    key: 'T1T2',
  },
  {
    title: 'T3T4',
    dataIndex: 'T3T4',
    key: 'T3T4',
  },
  {
    title: 'rpm1rpm2',
    dataIndex: 'rpm1rpm2',
    key: 'rpm1rpm2',
  },
  {
    title: 'P1P2',
    dataIndex: 'P1P2',
    key: 'P1P2',
  },
  {
    title: 'P3',
    dataIndex: 'P3',
    key: 'P3',
  },
  {
    title: 'G1G2',
    dataIndex: 'G1G2',
    key: 'G1G2',
  },
  {
    title: 'testdatadate',
    dataIndex: 'testdatadate',
    key: 'testdatadate',
  }
];
class ExportData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      turboIdVal: '',
      testno: [],
      reportDetails: [],
      emptyTestno: false
    }
  }
  componentDidMount() {
    this.props.updateTitleElements({
      title: 'ExportData',
      type: 'Report',
    })
  }
  handleChangetestID = (value) => {
    axios.post('http://192.168.0.167:5000/exportData.php', { turboIdVal: value }).then(res => {
      let chartdata = res.data;
      console.log(res)
      this.setState({
        testno: chartdata
      })
    }).catch(err => {
      console.log(err);
    })
    this.setState({
      turboIdVal: value
    })
    console.log(this.state.turboIdVal)
    console.log(this.state.testno)
  }
  getReport = () => {
    axios.post('http://192.168.0.167:5000/getReport.php', { turboIdVal: this.state.turboIdVal, testno: this.state.testno }).then(res => {
      let chartdata = res.data;
      console.log('chartdata:' + chartdata)
      this.setState({
        reportDetails: res.data
      })
    }).catch(err => {
      console.log(err);
    })
  }
  exportToCSV = (csvData, fileName) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }
  exportToPDF = () => {
    const input = document.getElementById('someRandomID');
    html2canvas(input)
      .then((canvas) => {
        var imgWidth = 200;
        var pageHeight = 290;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4')
        var position = 0;
        var heightLeft = imgHeight;
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        pdf.save("download.pdf");
      });
  }
  render() {
    const testIdValue = this.props.app.turboConfig;
    console.log(this.state.testno)
    return (
      <div style={{ paddingTop: "1px" }}>
        <Layout class="layout-container">
          <h2 class="h2"> Export Report</h2>
          <Row style={{ paddingTop: "20px" }} >
            <Col sm={2}>
              <label htmlFor="name" class="label">Turbo ID<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
              <span> &nbsp; &nbsp; &nbsp;</span>
            </Col>
            <Col sm={10}>
              <Col sm={10}>
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
              </Col>
            </Col>
            <Col sm={2}>
              <label htmlFor="name" class="label" >Test No<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
              <span> &nbsp; &nbsp; &nbsp;</span>
            </Col>
            <Col sm={10}>
              <Input.Group compact>
                {(this.state.testno) ?
                  <Select
                    defaultValue="Select Turbo ID"
                    style={{ width: '300px' }}
                    onChange={this.handleChangetestID}
                  >
                    {this.state.testno.map(it => (
                      <Option key={it.testno} value={it.testno}>
                        {it.testno}
                      </Option>
                    ))}
                  </Select> : []}
              </Input.Group>
            </Col>
          </Row>
          <Row style={{ paddingTop: '25px', paddingLeft: "30%", paddingBottom: '30px' }}>
            <Col xs={4}>
              <Button onClick={() => this.getReport()}> View</Button>
              <span> &nbsp;</span>
            </Col>
            <Col xs={4}>
              <Button > Clear</Button>
              <span> &nbsp;</span>
            </Col>
          </Row>
          <Button variant="warning" onClick={(e) => this.exportToPDF()}>Export in Pdf</Button>
          <Button variant="warning" onClick={(e) => this.exportToCSV(this.state.reportDetails, 'Export Report')}>Export in Excel</Button>
          <Layout style={{ backgroundColor: "#131633", paddingTop: "20px", paddingLeft: "20px" }}>
            <Table id="someRandomID" style={{ marginTop: '50px', width: '95%', float: 'left' }} pagination={false} columns={columns} dataSource={this.state.reportDetails} />
          </Layout>
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
const exportData = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExportData)
export default exportData;