import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTurboConfig, updateTitleElements } from '../../../Redux/action';
import { turbineConfigSubmit } from '../../../Services/requests';
import { Col, Row, Layout, Input, Button, Tooltip, InputNumber, DatePicker, Form, Descriptions } from 'antd';
import TableElement from '../../Components/subComponents/TableElement';
import moment from 'moment';
import 'moment/locale/zh-cn';

class TurboConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turboID: null,
      dateVal: '',
      nozzleArea: null,
      discriptionVal: null,
      bladeVal: null
    }
  }
  componentDidMount() {
    this.props.updateTitleElements({
      title: 'Turbo Config',
      type: 'Config',
    })
  }
  onFinish = () => {
    const body = {
      turbo_id: this.state.turboID,
      date: this.state.dateVal,
      nozzle_area: this.state.nozzleArea,
      descriptions: this.state.discriptionVal,
      noofblades: this.state.bladeVal
    }
    turbineConfigSubmit(body, (data) => {
      this.props.updateTurboConfig(data)
    })
  }

  onchangeTurboID = (e) => {
    this.setState({
      turboID: e.target.value
    })
  };
  updateDate = (e) => {
    this.setState({
      dateVal: e.target.value
    })
  }
  handleNumber = (e) => {
    this.setState({
      nozzleArea: e.target.value
    })
  }
  updateDiscription = (e) => {
    this.setState({
      discriptionVal: e.target.value
    })
  }
  updateBlades = (e) => {
    this.setState({
      bladeVal: e.target.value
    })
  }

  render() {
    const { appData } = this.props;
    const { turboConfig } = appData;
    return (
      <div style={{ paddingTop: "1px" }}>
        <Layout class="layout-container">
          <h2 class="h2">Turbo Configuration</h2>
          <Form onFinish={this.onFinish}>
            <Row style={{ paddingTop: "20px" }} >
              <Col sm={2}>
                <label class="label" >Turbo ID<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>

              </Col>
              <Col sm={6}>
                <Input
                  name="turbo_id"
                  style={{ width: "320px" }}
                  placeholder="Turbo ID"
                  onChange={this.onchangeTurboID} />
              </Col>
              <Col sm={3}>
                <label htmlFor="name" class="label" >Installed Date<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
              </Col>
              <Col sm={5}>
                <Input.Group compact>
                  <DatePicker
                    name="date"
                    defaultValue={moment(Date.Now)}
                    style={{ backgroundColor: "#131633" }}
                    onChange={this.updateDate}
                  />
                </Input.Group >
              </Col>
              <Col sm={2}>
                <label class="label">Nozzle Area<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
              </Col>
              <Col sm={6}>
                <div>
                  <Tooltip placement="bottom" title='Range 0.0002 to 0.0005 m2' style={{ backgroundColor: 'pink' }}>
                    <InputNumber
                      name="nozzle_area"
                      min={0.0002} max={0.0005}
                      defaultValue={0.0245}
                      step={0.0001}
                      style={{ width: "320px" }}
                      onChange={this.handleNumber}
                    />
                  </Tooltip>
                </div>
              </Col>
            </Row>
            <Row style={{ paddingTop: "20px" }}>
              <Col sm={2}>
                <label class="label" >Description <i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
              </Col>
              <Col sm={14}>
                <Input
                  name="description"
                  style={{ height: "100px", width: "760px" }}
                  placeholder="Description..."
                  onChange={this.updateDiscription} />
              </Col>

              <Col sm={2}>
                <label class="label" >No of blades<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
              </Col>
              <Col sm={3}>
                <Input
                  name="noofblades"
                  style={{ width: "320px" }}
                  placeholder="No of Blades"
                  onChange={this.updateBlades} />
              </Col>
            </Row>

            <Row sm={6} style={{ paddingTop: '25px', paddingLeft: "35%", paddingBottom: '30px' }}>
              <Col xs={4}>
                <Form.Item>
                  <Button htmlType="submit" > Save</Button>  </Form.Item>
              </Col>
              <Col xs={4}>
                <Button> Clear</Button>
              </Col>

            </Row>
          </Form>
        </Layout>
        <div style={{ paddingTop: "35px" }}>
          <Layout class="bottom-container">
            <Row>
              <Col span={8}>
                <h2 class="h2">Turbo Configuration</h2>
              </Col>
            </Row>
            {turboConfig ?
              <TableElement
                data={turboConfig}
                editable={true}
                editableColumn={["description", "status"]}
                childrenColumnName={"turboconfig"}
              /> : []}
          </Layout>
        </div>
      </div >
    )
  }
}

const mapStateToProps = state => ({
  appData: state.app
})

const mapDispatchToProps = {
  updateTurboConfig,
  updateTitleElements
}

const TurboContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TurboConfig)
export default TurboContainer;