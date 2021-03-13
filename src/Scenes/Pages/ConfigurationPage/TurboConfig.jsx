import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTurboConfig } from '../../../Redux/action';
import { Col, Row, Layout, Input, Button, Tooltip, InputNumber, DatePicker, Table, Form } from 'antd';
import TableElement from '../../Components/TableElement';
import SearchBox from '../../Components/SearchBox';
import TitleElement from '../../Components/TitleElement';
import moment from 'moment';
import 'moment/locale/zh-cn';
import axios from 'axios';


class TurboConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      truboData: '',
      nozzle_area: null,
    }
  }

  getConfigData = () => {
    axios.get('http://localhost/TVS/turbo_config.php').then(res => {
      let TurboData = res.data
      this.props.updateTurboConfig(TurboData)
      console.log(TurboData)
    }).catch((err) => {
      console.log(err);
    })
  }

  // TODO
  // handle the fetch call from remote
  componentDidMount() {
    this.getConfigData()
  }

  onFinish = (values) => {
    axios.post('http://localhost/TVS/turbo_config_validation.php', values)
      .then(res => {
        if (res.data == "success") {
          this.getConfigData()
        }
        else { }
      }).catch(err => {
        console.log(err.res)
      })
  }

  // handleNumber = (e) => {
  //   let nam = e.target.name;
  //   let val = e.target.value;
  //   if (nam === "nozzle_area") {
  //     if (!Number(val)) {
  //       alert("Your age must be a number");
  //     }
  //   }
  //   this.setState({[nam]: val});
  // }

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
                <span> &nbsp; &nbsp; &nbsp;</span>
              </Col>
              <Col sm={6}>
                <Form.Item name="turbo_id">
                  <Input style={{ width: "320px" }} placeholder="Turbo ID" />
                </Form.Item>
              </Col>
              <Col sm={3}>
                <label htmlFor="name" class="label" >Installed Date<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
                <span> &nbsp; &nbsp; &nbsp;</span>
              </Col>
              <Col sm={5}>
                <Form.Item name="date">
                  <DatePicker defaultValue={moment('2015-01-01', 'YYYY-MM-DD')} style={{ backgroundColor: "#131633" }} />
                </Form.Item>
              </Col>
              <Col sm={2}>
                <label class="label">Nozzle Area<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
              </Col>
              <Col sm={6}>
                <div>
                  <Form.Item
                    name="nozzle_area" >
                    {/* <Tooltip placement="bottom" title='Range 0.0002 to 0.0005 m2' style={{ backgroundColor: 'pink' }}>
                      <InputNumber
                        min={0.0002} max={0.0005} step={0.0002}
                        defaultValue={0.003}
                        onChange={onChange}
                        placeholder="Nozzle Area"
                        style={{ width: "320px" }} />
                    </Tooltip> */}
                    <Tooltip placement="bottom" title='Range 0.0002 to 0.0005 m2' style={{ backgroundColor: 'pink' }}>
                      <InputNumber
                        name="nozzle_area"
                        min={0.0002} max={0.0005}
                        defaultValue={0.0245}
                        step={0.0001}
                        style={{ width: "320px" }}
                      //  onChange={this.handleNumber}
                      />
                    </Tooltip>
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row style={{ paddingTop: "20px" }}>
              <Col sm={2}>
                <label class="label" >Description <i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
              </Col>
              <Col sm={6}>
                <Form.Item name="description">
                  <Input style={{ height: "100px", width: "805px" }} placeholder="Description..." />
                </Form.Item>
              </Col>
            </Row>

            <Row sm={6} style={{ paddingTop: '25px', paddingLeft: "35%", paddingBottom: '30px' }}>
              <Col xs={4}>
                <Form.Item>
                  <Button htmlType="submit" > Save</Button>  </Form.Item>
              </Col>
              <Col xs={4}>
                <Button > Clear</Button>
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
              <Col span={10}><SearchBox /></Col>
              <Col span={6}>
                <Row style={{ paddingTop: '5px', paddingLeft: "18%", paddingBottom: '10px' }}>
                  <Col span={8}>
                    <Button> Excel</Button>
                  </Col>
                  <Col span={8}>
                    <Button> PDF</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            {turboConfig ?
              <TableElement
                data={turboConfig}
                editable={true}
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
  updateTurboConfig
}

const TurboContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TurboConfig)
export default TurboContainer;