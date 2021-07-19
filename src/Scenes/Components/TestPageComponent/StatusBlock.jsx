import React, { Component } from "react";
import { Col, Row } from 'antd';
import { connect } from 'react-redux';
import { dashboardSensor } from "../../../Services/constants";
const { sensorLabel } = dashboardSensor;

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
    let nShutdown = false;
    let persons;
    let persons1;
    let filteredData;
    let filteredData1;
    let receivedDate;

    const arrStr = this.props.app.targetKeys;
    const dashboardDataNumArr = arrStr.map((i) => Number(i));
    console.log(dashboardDataNumArr);



    this.props.app.turboStart.map(It => {
      if (It.name === 'nshutdowncompleted') {
        nShutdown = true
      }
    })

    let filteredDataLabel = sensorLabel.filter((_, index) => dashboardDataNumArr.includes(index));
    console.log("Label Name", filteredDataLabel);

    {
      this.props.app.chartData[0] ?
        filteredData = Object.values(this.props.app.chartData[0]).filter((_, index) => dashboardDataNumArr.includes(index)) : filteredData = []
    }
    console.log(filteredData)
    {
      this.props.app.chartData[1] ?
        filteredData1 = Object.values(this.props.app.chartData[1]).filter((_, index) => dashboardDataNumArr.includes(index)) : filteredData = []
    }
    console.log(filteredData1)
    { this.props.app.chartData[0] ? persons = filteredData : persons = [0, 0, 0, 0, 0, 0] }
    { this.props.app.chartData[1] ? persons1 = filteredData1 : persons1 = [0, 0, 0, 0, 0, 0] }

    {
      this.props.app.chartData[0] ? receivedDate = this.props.app.chartData[0].testdatadate : receivedDate = null
    }
    const date = new Date();
    const db_date = new Date(receivedDate);
    let isActive = false;
    // if ((date - db_date) < 10000) { isActive = true }
    console.log(this.props.app.communication)
    if (this.props.app.communication == true) {
      isActive = true
    }
    return (
      <div >
        <div>
          <Row>
            {nShutdown ?
              <text style={styles.offline}>N-Shutdown</text>
              :
              <Row>
                {isActive ?
                  <text style={styles.online}>LIVE</text>
                  :
                  <text style={styles.offline}>OFFLINE</text>
                }
              </Row>
            }
          </Row>
        </div>
        <Row >
          {
            persons.map((It, y) =>
              <Col span={4} style={{ paddingRight: "10px" }}>
                <div class="statistic-block block" >
                  <Row class="progress-details d-flex align-items-end justify-content-between">
                    <Col>
                      {(persons1[y] < It) ?
                        <img src="./images/up-arrow-1.gif" alt="Arrow" style={{ width: '20px', height: '30px', marginTop: '8px', marginLeft: '30px' }} />
                        : <img src="./images/down-arrow-1.gif" alt="Arrow" style={{ width: '20px', height: '30px', marginTop: '8px', marginLeft: '30px' }} />}
                    </Col>
                    <Col class="number dashtext-1" style={{ paddingLeft: '30%', fontSize: '25px' }}>
                      <span>{It}</span>
                    </Col>
                  </Row>
                  <div class="progress progress-template">
                    <div role="progressbar" style={{ width: '100%', ariavaluenow: '30', ariavaluemin: '0', ariavaluemax: '100' }} class="progress-bar progress-bar-template dashbg-1"></div>
                  </div>
                  <div class="title">
                    <div style={{ fontSize: '10px' }}><strong>{filteredDataLabel[y]}</strong></div>
                  </div>
                </div>
              </Col>
            )
          }
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