import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateParamConfig } from '../../../Redux/action';
import { Col, Row, Layout, Input, Button, Select, InputNumber } from 'antd';
import SearchBox from '../../Components/SearchBox';
import TableElement from '../../Components/TableElement';

const { Option } = Select;

class ParamConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paramData: ''
    }
  }

  render() {
    const appData = this.props.app;
    return (
      <div style={{ paddingTop: "1px" }}>
        <Layout class="layout-container">
          <h2 class="h2" >Param Configuration</h2>
          <Row style={{ paddingTop: "20px" }} >
            <Col sm={3}>
              <label htmlFor="name" class="label" >Name<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
              <span> &nbsp; &nbsp; &nbsp;</span>
            </Col>
            <Col sm={9}>
              <Input placeholder="Param Name" />
            </Col>

            <Col sm={3}>
              <label htmlFor="Unit" class="label" >Unit<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
              <span> &nbsp; &nbsp; &nbsp;</span>
            </Col>
            <Col sm={9}>
              <Input.Group compact>
                <Select defaultValue="Select Unit" style={{ width: '450px' }}>
                  <Option value="Option1">km/cm2</Option>
                  <Option value="Option2">Lit</Option>
                  <Option value="Option3">Degree C</Option>
                  <Option value="Option4">mm of Water</Option>
                </Select>
              </Input.Group>
            </Col>
          </Row>

          <Row style={{ paddingTop: "20px" }}>
            <Col sm={3}>
              <label htmlFor="Param Index" class="label" >Param Index<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
            </Col>
            <Col sm={9}>
              <Input placeholder="Param Index" />
            </Col>

            <Col sm={3}>
              <label htmlFor="Lowwer Limit" class="label" >Lower Limit<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>

            </Col>
            <Col sm={9}>
              <InputNumber
                min={-100} max={100}
                onChange={onChange}
                placeholder="Lowwer Limit"
              />
            </Col>
          </Row>

          <Row style={{ paddingTop: "20px" }}>
            <Col sm={3}>
              <label htmlFor="Normal Limit" class="label" >Normal Limit<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
              <span> &nbsp; &nbsp; &nbsp;</span>
            </Col>
            <Col sm={9}>
              <Input placeholder="Normal Limit" />
            </Col>

            <Col sm={3}>
              <label htmlFor="Upper Limit" class="label" >Upper Limit<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
              <span> &nbsp; &nbsp; &nbsp;</span>
            </Col>
            <Col sm={9}>
              <InputNumber
                min={-100} max={100}
                onChange={onChange}
                placeholder="Upper Limit"
              />
            </Col>
          </Row>

          <Row style={{ paddingTop: '25px', paddingLeft: "35%", paddingBottom: '30px' }}>

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
                <h2 class="h2">Param Configuration</h2>
              </Col>
              <Col span={10}><SearchBox /></Col>             
            </Row>

            {appData.paramConfig ?
              <TableElement
                data={appData ? appData.paramConfig : []}
                editable={true}
              /> : []}
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
  app: state.app
})

const mapDispatchToProps = {
  updateParamConfig
}

const paramContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ParamConfig)
export default paramContainer;


