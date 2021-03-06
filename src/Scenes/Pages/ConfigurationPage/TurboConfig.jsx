import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Layout, Input, Button, Tooltip, InputNumber, DatePicker } from 'antd';
import TableElement from '../../Components/TableElement';
import SearchBox from '../../Components/SearchBox';
import TitleElement from '../../Components/TitleElement';
class TurboConfig extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { tableData } = this.props;
    const text = <span> </span>;


    return (
      <div style={{ paddingTop: "1px" }}>
        <Layout style={{ backgroundColor: "#212840", paddingBottom: "20px" }}>
          <TitleElement />
        </Layout>
        <Layout class="layout-container">
          <h2 class="h2">Turbo Configuration</h2>
          <Row style={{ paddingTop: "20px" }} >
            <Col sm={2}>
              <label htmlFor="name" class="label" >Turbo ID<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
              <span> &nbsp; &nbsp; &nbsp;</span>
            </Col>
            <Col sm={6}>
              <Input style={{ width: "320px" }} placeholder="Turbo ID" />
            </Col>

            <Col sm={3}>
              <label htmlFor="name" class="label" >Installed Date<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
              <span> &nbsp; &nbsp; &nbsp;</span>
            </Col>
            <Col sm={5}>
              {/* <Input /> */}
              <DatePicker style={{ backgroundColor: "#131633" }} />
            </Col>

            <Col sm={2}>
              <label class="label">Nozzle Area<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
              <span> &nbsp; &nbsp; &nbsp;</span>
            </Col>
            <Col sm={6}>
              <div>
                <Tooltip placement="bottom" title='Range 0.0002 to 0.0005 m2' style={{ backgroundColor: 'pink' }}>
                  <InputNumber
                    min={0.0002} max={0.0005} step={0.0002}
                    defaultValue={0.003}
                    onChange={onChange}
                    placeholder="Nozzle Area"
                    style={{ width: "320px" }} />
                </Tooltip>
              </div>
            </Col>
          </Row>
          <Row style={{ paddingTop: "20px" }}>
            <Col sm={2}>
              <label class="label" >Description <i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
            </Col>
            <Col sm={6}>
              <Input style={{ height: "100px", width: "805px" }} placeholder="Description..." />
            </Col>
          </Row>

          <Row sm={6} style={{ paddingTop: '25px', paddingLeft: "35%", paddingBottom: '30px' }}>
            <Col xs={4}>
              <Button > Save</Button>
            </Col>
            <Col xs={4}>
              <Button > Clear</Button>
            </Col>

          </Row>
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
              data={tableData}
              TurboID={true}
              InstalledDate={true}
              Status={true}
              editable={true}            
              Name={false}
              value={false}
              Unit={false}
              lowerLimit={false}
              normalLimit={false}
              upperLimit={false}
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
  TurboConfig: state.app.TurboConfig,
  tableData: state.app.Turbodata,
  user: state.app.userParams
})

const mapDispatchToProps = {

}

const TurboContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TurboConfig)
export default TurboContainer;