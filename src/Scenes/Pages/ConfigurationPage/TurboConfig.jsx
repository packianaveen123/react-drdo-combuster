import React, { Component } from 'react';
import { connect } from 'react-redux';
import {updateTurboConfig} from '../../../Redux/action';
import { Col, Row, Layout, Input, Button, Tooltip, InputNumber, DatePicker, Table, Form } from 'antd';
import TableElement from '../../Components/TableElement';
import SearchBox from '../../Components/SearchBox';
import TitleElement from '../../Components/TitleElement';
import moment from 'moment';
import 'moment/locale/zh-cn';
import axios from 'axios';
const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'S.No',
    dataIndex: 'S.No',

  },
  {
    title: 'Turbo ID',
    dataIndex: 'Turbo ID',

  },
  {
    title: 'Installed Date',
    dataIndex: 'Installed Date',

  },
  {
    title: 'nozzle_area',
    dataIndex: 'nozzle_area',

  },
  {
    title: 'Status',
    dataIndex: 'Status',

  },
];
class TurboConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      truboData: ''
  
    }
  }
  

  getData() {
    axios.get('http://localhost/TVS/turbo_config.php')
      .then(res => {
        let TurboData = res.data;
      this.props.updateTurboConfig(TurboData);
      console.log(TurboData)
        
      }).catch((err) => {
        console.log(err);
      })
  }


  onFinish = (values) => {
    
    axios.post('http://localhost/TVS/turbo_config_validation.php',
      values,
    )
      .then(res => {
        console.log(res.data)

        if (res.data == "success") {
          this.getData()
          console.log(values)
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
    const { tableData } = this.props;
    const text = <span> </span>;
    const chartData = this.props.app; 
    console.log(chartData.turboConfig)
    // const chart = this.prepareChartParams(chartData)

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
                {/* <Input /> */}
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
                    <InputNumber
                     min={0.0002} max={0.0005} 
                     defaultValue={0.0245} 
                     step ={0.0001}
                     style={{ width: "320px" }} 
                      />
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

            <TableElement
              data={chartData.turboConfig}
              // TurboID={true}
              // InstalledDate={true}
              // Status={true}
              editable={true}            
              // Name={false}
              // value={false}
              // Unit={false}
              // lowerLimit={false}
              // normalLimit={false}
              // upperLimit={false}
            />
            {/* <Table columns={columns} dataSource={chartData.turboConfig} /> */}
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
  updateTurboConfig
}

const TurboContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TurboConfig)
export default TurboContainer;