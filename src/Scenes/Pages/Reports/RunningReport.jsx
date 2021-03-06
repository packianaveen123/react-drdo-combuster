import React, { Component } from 'react'
import { Col, Row, Layout, Input, Button, Select } from 'antd';
import axios from 'axios';
import TableElement from '../../Components/TableElement'
const { Option } = Select;
class RunningReport extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  onClick = (option, options) => {
    axios.post('http://localhost/TVS/graph_data.php',
      option,
      options,
    )

      .then(res => {
        console.log(res.data)

        if (res.data == "success") {
          console.log(option, options)
          alert("success")
        }
        else if (res.data == "failed") {
          alert("incorrect ")
        }
      })
      .catch(err => {
        console.log(err.res)
      })
  }
  render() {
    return (
      <div style={{ paddingTop: "1px" }}>
        <Layout class="layout-container">
          <h2 class="h2">Running Report</h2>
          {/* <form onclick={this.onClick}> */}
          <Row style={{ paddingTop: "20px" }} >

            <Col sm={2}>
              <label class="label" >Turbo ID<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
              <span> &nbsp; &nbsp; &nbsp;</span>
            </Col>
            <Col sm={10}>
              <Col sm={10}>
                <Input.Group compact>
                  <Select defaultValue="Select" name="option" style={{ width: '450px' }}>
                    <Option value="Option1">Option1</Option>
                    <Option value="Option2">Option2</Option>
                    <Option value="Option3">Option3</Option>
                    <Option value="Option4">Option4</Option>
                  </Select>
                </Input.Group>
              </Col>
            </Col>

            <Col sm={2}>
              <label class="label">Test No<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
              <span> &nbsp; &nbsp; &nbsp;</span>
            </Col>
            <Col sm={10}>
              <Input.Group compact>
                <Select defaultValue="Select" name="options" style={{ width: '450px' }}>
                  <Option value="Option1">Option1</Option>
                  <Option value="Option2">Option2</Option>
                  <Option value="Option3">Option3</Option>
                  <Option value="Option4">Option4</Option>
                </Select>
              </Input.Group>
            </Col>
          </Row>

          <Row style={{ paddingTop: '25px', paddingLeft: "30%", paddingBottom: '30px' }}>
            <Col xs={4}>
              <Button onClick={() => this.onClick()} > view</Button>
              <span> &nbsp;</span>
            </Col>
            <Col xs={4}>
              <Button > Clear</Button>
              <span> &nbsp;</span>
            </Col>
          </Row>
          {/* </form> */}
        </Layout>
        
        <Layout class="bottom-container" style={{ paddingTop: '50px', paddingBottom: '30px' }}>
            <TableElement />         
        </Layout>
      </div>
    )
  }
}
export default RunningReport;