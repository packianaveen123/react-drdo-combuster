import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTurboConfig, updateTitleElements } from '../../../Redux/action';
import { turbineConfigSubmit } from '../../../Services/requests';
import { nozzleArea } from '../../../Services/constants';
import { Col, Row, Layout, Input, Button, Tooltip, InputNumber, DatePicker, Form, Descriptions } from 'antd';
import TableElement from '../../Components/subComponents/TableElement';
import moment from 'moment';
import { notification } from 'antd';
import 'moment/locale/zh-cn';

class TurboConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turboID: null,
      dateVal: '',
      nozzleArea: '',
      discriptionVal: null,
      bladeVal: '',

    }
    this.updateDate = this.updateDate.bind(this)
    this.updateBlades = this.updateBlades.bind(this)
  }

  componentDidMount() {
    this.props.updateTitleElements({
      title: 'Turbo Config',
      type: 'Config',
    })
  }
  onFinish = () => {
    console.log(this.state.turboID, this.state.dateVal, this.state.nozzleArea, this.state.discriptionVal, this.state.bladeVal)
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
  updateDate = (date, dateString) => {
    console.log(typeof (dateString))
    var installedDate = new Date(dateString)
    var today = new Date();

    if (today < installedDate) {
      this.openNotification()
    }
    this.setState({
      dateVal: dateString
    })
  }
  openNotification = () => {
    notification.open({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  }
  handleNumber = (value) => {
    this.setState({
      nozzleArea: value
    })
  }
  updateDiscription = (e) => {
    this.setState({
      discriptionVal: e.target.value
    })
  }
  updateBlades = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      this.setState({
        bladeVal: e.target.value
      })
    }
    console.log(e)
  }

  render() {
    const { appData } = this.props;
    const { turboConfig } = appData;
    const { nozzleArea_min, nozzleArea_max, nozzleArea_step, nozzleArea_defalutValue } = nozzleArea
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
                      style={{ width: '320px' }}
                      defaultValue={nozzleArea_defalutValue}
                      min={nozzleArea_min}
                      max={nozzleArea_max}
                      step={nozzleArea_step}
                      onChange={this.handleNumber}
                      stringMode
                    />,
                  </Tooltip>
                </div>
              </Col>
            </Row>
            <Row style={{ paddingTop: "20px" }}>
              <Col sm={2}>
                <label class="label" >Description <i style={{ color: 'red', fontSize: '15px' }}> </i></label>
              </Col>
              <Col sm={14}>
                <Tooltip placement="bottomLeft" title='Allowed 200 words only'>
                  <Input
                    name="description"
                    style={{ height: "100px", width: "760px" }}
                    placeholder="Description..."
                    maxLength='200'
                    onChange={this.updateDiscription} />
                </Tooltip>
              </Col>

              <Col sm={2}>
                <label class="label" >No of Blades<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
              </Col>
              <Col sm={3}>
                <Input
                  name="noofblades"
                  style={{ width: "320px" }}
                  value={this.state.bladeVal}
                  placeholder="No of Blades"
                  onChange={this.updateBlades} />
              </Col>
            </Row>

            <Row sm={6} style={{ paddingTop: '25px', paddingLeft: "35%", paddingBottom: '30px' }}>
              <Col xs={4}>
                <Form.Item>
                  <Button htmlType="submit" > Save</Button>
                </Form.Item>
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
                editableColumn={[
                  {
                    'editFeild': "description",
                    'inputType': 'input'
                  },
                  {
                    'editFeild': "status",
                    'inputType': 'select'
                  }
                ]}

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