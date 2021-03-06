import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Layout, Input, Button, InputNumber, Select, } from 'antd';

import SearchBox from '../../Components/SearchBox';
import TableElement from '../../Components/TableElement';

const { Option } = Select;

class TestConfig extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.tableData)
    const { tableData } = this.props;
    return (
      <div style={{ paddingTop: "10px" }}>

        <Layout class="layout-container">
          <h2 class="h2" >Test Configuration</h2>
          <Row style={{ paddingTop: "20px" }} >
            <Col sm={2}>
              <label htmlFor="name" class="label">Name<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
              <span> &nbsp; &nbsp; &nbsp;</span>
            </Col>
            <Col sm={10}>
              <Input style={{ Color: "#666873" }} placeholder="Name" />
            </Col>

            <Col sm={2}>
              <label class="label" >Value<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>

            </Col>
            <Col sm={10}>
              <InputNumber
                min={-100} max={100}
                onChange={onChange}
                placeholder="Value"
              />
            </Col>
          </Row>

          <Row style={{ paddingTop: '25px', paddingLeft: "30%", paddingBottom: '30px' }}>
            <Col xs={4}>
              <Button > Save</Button>
              <span> &nbsp;</span>
            </Col>
            <Col xs={4}>
              <Button > Clear</Button>
              <span> &nbsp;</span>
            </Col>
            <Col xs={4}>
              <Button > Reset</Button>
            </Col>
          </Row>
        </Layout>

        <div style={{ paddingTop: "35px" }}>
          <Layout class="bottom-container">
            <Row>
              <Col span={8}>
                <h2 class="h2">Test Configuration</h2>
              </Col>
              <Col span={10}><SearchBox /></Col>
              <Col span={6}>
                <Row style={{ paddingTop: '5px', paddingLeft: "18%", paddingBottom: '10px' }}>
                  <Col span={8}>
                    <Button > Excel</Button>
                  </Col>
                  <Col span={8}>
                    <Button > PDF</Button>
                  </Col>
                </Row>
              </Col>
            </Row>

            <TableElement
              data={tableData}
              Name={true}
              Unit={true}
              value={true}
              editable={true}
              lowerLimit={false}
              normalLimit={false}
              upperLimit={false}
              TurboID={false}
              InstalledDate={false}
              Status={false}

            />
          </Layout>
        </div>
      </div>
    )
  }
}
const onChange = (value) => (
  console.log('changed', value)
)
const mapStateToProps = state => ({
  testConfig: state.app.testConfig,
  tableData: state.app.testdata,
  user: state.app.userParams
})

const mapDispatchToProps = {

}

const testContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TestConfig)
export default testContainer;