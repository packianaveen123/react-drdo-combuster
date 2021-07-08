import React, { Component } from "react";
import { Col, Row } from 'antd';
import { connect } from 'react-redux';

const styles = {
  online: {
    color: "green",
    position: "absolute",
    right: 20,
    top: 120,
    fontWeight: "bold",
    fontSize: 20
  },
  offline: {
    color: "red",
    position: "absolute",
    right: 20,
    top: 120,
    fontWeight: "bold",
    fontSize: 20
  }
}
class StatusBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardList: this.props.cardlist,
      persons: [],
      isRpmUpArrow: true,
      isT1UpArrow: true,
      isT2UpArrow: true,
      isT9UpArrow: true,
      isP2UpArrow: true
    }
  }
  render() {
    console.log(this.props.app.turboStart)
    // let { chartData } = this.props.app.chartData[0]
    let nShutdown = false
    this.props.app.turboStart.map(It => {
      if (It.name === 'nshutdowncompleted') {
        nShutdown = true
      }
    })
    let persons;
    { this.props.app.chartData[0] ? persons = this.props.app.chartData[0] : persons = '' }
    const date = new Date();
    const receivedDate = persons.testdatadate;
    const db_date = new Date(receivedDate);
    let isActive = false;
    if ((date - db_date) < 5000) { isActive = true }
    // console.log(persons.testdatadate)
    return (
      <div class="container-fluid">
        <div className="machinestatus">
          <row>
            {nShutdown ?
              <text style={styles.offline}>N-Shutdown</text>
              :
              <row>
                {isActive ?
                  <text style={styles.online}>LIVE</text>
                  :
                  <text style={styles.offline}>OFFLINE</text>
                }
              </row>
            }
          </row>
        </div>
        <Row>
          <Col span={4} style={{ paddingRight: "10px" }}>
            <div class="statistic-block block">
              <Row class="progress-details d-flex align-items-end justify-content-between">
                <Col>
                  <img src="./images/up-arrow-1.gif" alt="Arrow" style={{ width: '20px', height: '30px', marginTop: '8px', marginLeft: '30px' }} />
                </Col>
                <Col class="number dashtext-1" style={{ paddingLeft: '30%', fontSize: '25px' }}>
                  <span>{persons ? persons.rpm1rpm2 : ''}</span>
                </Col>
              </Row>
              <div class="progress progress-template">
                <div role="progressbar" style={{ width: '100%', ariavaluenow: '30', ariavaluemin: '0', ariavaluemax: '100' }} class="progress-bar progress-bar-template dashbg-1"></div>
              </div>
              <div class="title">
                <div class="icon"><i class="icon-user-1"></i></div><strong>Turbine RPM</strong>
              </div>
            </div>
          </Col>
          <Col span={4} style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            <div class="statistic-block block">
              <Row class="progress-details d-flex align-items-end justify-content-between">
                <Col>
                  <img src="./images/down-arrow-1.gif" alt="Arrow" style={{ width: '20px', height: '30px', marginTop: '8px', marginLeft: '15px' }} />
                </Col>
                <Col class="number dashtext-2" style={{ paddingLeft: '30%', fontSize: '25px' }}>
                  <span>{persons ? persons.T1T2 : ''}</span>
                </Col>
              </Row>
              <div class="progress progress-template">
                <div role="progressbar" style={{ width: '100%', ariavaluenow: '70', ariavaluemin: '0', ariavaluemax: '100' }} class="progress-bar progress-bar-template dashbg-2"></div>
              </div>
              <div class="title">
                <div class="icon"><i class="icon-contract"></i></div><strong>Temperature 1</strong>
              </div>
            </div>
          </Col>
          <Col span={4} style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            <div class="statistic-block block">
              <Row class="progress-details d-flex align-items-end justify-content-between">
                <Col>
                  <img src="./images/down-arrow-1.gif" alt="Arrow" style={{ width: '20px', height: '30px', marginTop: '8px', marginLeft: '15px' }} />
                </Col>
                <Col class="number dashtext-3" style={{ paddingLeft: '30%', fontSize: '25px' }}>
                  <span>{persons ? persons.T3T4 : ''}</span>
                </Col>
              </Row>
              <div class="progress progress-template">
                <div role="progressbar" style={{ width: '100%', ariavaluenow: '55', ariavaluemin: '0', ariavaluemax: '100' }} class="progress-bar progress-bar-template dashbg-3"></div>
              </div>
              <div class="title">
                <div class="icon"><i class="icon-paper-and-pencil"></i></div><strong>Temperature 2</strong>
              </div>
            </div>
          </Col>
          <Col span={4} style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            <div class="statistic-block block">
              <Row class="progress-details d-flex align-items-end justify-content-between">
                <Col>
                  <img src="./images/up-arrow-1.gif" alt="Arrow" style={{ width: '20px', height: '30px', marginTop: '8px', marginLeft: '15px' }} />
                </Col>
                <Col class="number dashtext-4" style={{ paddingLeft: '30%', fontSize: '25px' }}>
                  <span>{persons ? persons.P1P2 : ''}</span>
                </Col>
              </Row>
              <div class="progress progress-template">
                <div role="progressbar" style={{ width: '100%', ariavaluenow: '35', ariavaluemin: '0', ariavaluemax: '100' }} class="progress-bar progress-bar-template dashbg-4"></div>
              </div>
              <div class="title">
                <div class="icon"><i class="icon-writing-whiteboard"></i></div><strong>Pressure 1</strong>
              </div>
            </div>
          </Col>
          <Col span={4} style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            <div class="statistic-block block">
              <Row class="progress-details d-flex align-items-end justify-content-between">
                <Col>
                  <img src="./images/up-arrow-1.gif" alt="Arrow" style={{ width: '20px', height: '30px', marginTop: '8px', marginLeft: '15px' }} />
                </Col>
                <Col class="number dashtext-4" style={{ paddingLeft: '30%', fontSize: '25px' }}>
                  <span>{persons ? persons.G1G2 : ''}</span>
                </Col>
              </Row>
              <div class="progress progress-template">
                <div role="progressbar" style={{ width: '100%', ariavaluenow: '35', ariavaluemin: '0', ariavaluemax: '100' }} class="progress-bar progress-bar-template dashbg-4"></div>
              </div>
              <div class="title">
                <div class="icon"><i class="icon-writing-whiteboard"></i></div><strong>Pressure 2</strong>
              </div>
            </div>
          </Col>
          <Col span={4} style={{ paddingLeft: "10px", paddingRight: "0px" }}>
            <div class="statistic-block block">
              <Row class="progress-details d-flex align-items-end justify-content-between">
                <Col>
                  <img src="./images/down-arrow-1.gif" alt="Arrow" style={{ width: '20px', height: '30px', marginTop: '8px', marginLeft: '15px' }} />
                </Col>
                <Col class="number dashtext-4" style={{ paddingLeft: '30%', fontSize: '25px' }}>
                  <span>{persons ? persons.P3 : ''}</span>
                </Col>
              </Row>
              <div class="progress progress-template">
                <div role="progressbar" style={{ width: '100%', ariavaluenow: '35', ariavaluemin: '0', ariavaluemax: '100' }} class="progress-bar progress-bar-template dashbg-4"></div>
              </div>
              <div class="title">
                <div class="icon"><i class="icon-writing-whiteboard"></i></div><strong>Gas Flow </strong>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  app: state.app
})
const mapDispatchToProps = {}
const statuspage = connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusBlock)
export default statuspage;