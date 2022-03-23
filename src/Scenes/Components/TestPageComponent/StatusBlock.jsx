import React, { Component } from "react";
import { Col, Row } from "antd";
import { connect } from "react-redux";
import { dashboardSensor } from "../../../Services/constants";
import { getTableView } from "../../../Services/requests";
import CVStageComponent from "./CVStageComponent";

const { sensorLabel, n_shutdown, e_shutdown, live, offline } = dashboardSensor;

const styles = {
  online: {
    color: "#03fc28",
    position: "absolute",
    right: 20,
    top: 120,
    fontWeight: "bold",
    fontSize: 20,
  },
  offline: {
    color: "red",
    position: "absolute",
    right: 20,
    top: 120,
    fontWeight: "bold",
    fontSize: 20,
  },
};

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
      isP2UpArrow: true,
      tabledata: [],
      filteredTableData: [],
    };
  }
  componentDidMount() {
    //getting data from DB once
    getTableView((data) => {
      const arrStr = this.props.app.targetKeys; //covertion string to number
      const dashboardDataNumArr = arrStr.map((i) => Number(i));
      this.setState({
        tabledata: data,
      });
      //filtering the limit values
      let filteredTableData = this.state.tabledata.filter((_, index) =>
        dashboardDataNumArr.includes(index)
      );
      this.setState({
        filteredTableData: filteredTableData,
      });
    });
  }
  render() {
    let nShutdown = false;
    let eShutdown = false;
    let persons;
    let persons1;
    let filteredData;
    let filteredData1;
    let receivedDate;
    let colors = [];

    //covertion string to number
    const arrStr = this.props.app.targetKeys;
    const dashboardDataNumArr = arrStr.map((i) => Number(i));

    let turboStart = [];
    if (this.props.app.turboStart) {
      turboStart = this.props.app.turboStart;
    }

    if (turboStart.length >= 0) {
      turboStart.map((they) => {
        if (they.name === "N.Shutdown Completed") {
          nShutdown = true;
        } else if (they.name === "E.Shutdown Completed") {
          eShutdown = true;
        }
      });
    }

    //filltering the status block label
    let filteredDataLabel = sensorLabel.filter((_, index) =>
      dashboardDataNumArr.includes(index)
    );

    {
      this.props.app.chartData[0]
        ? (filteredData = Object.values(this.props.app.chartData[0]).filter(
            (_, index) => dashboardDataNumArr.includes(index)
          ))
        : (filteredData = []);
    }

    {
      this.props.app.chartData[1]
        ? (filteredData1 = Object.values(this.props.app.chartData[1]).filter(
            (_, index) => dashboardDataNumArr.includes(index)
          ))
        : (filteredData1 = []);
    }

    {
      this.props.app.chartData[0]
        ? (persons = filteredData)
        : (persons = [0, 0, 0, 0, 0, 0]);
    }
    {
      this.props.app.chartData[1]
        ? (persons1 = filteredData1)
        : (persons1 = [0, 0, 0, 0, 0, 0]);
    }

    {
      this.props.app.chartData[0]
        ? (receivedDate = this.props.app.chartData[0].testdatadate)
        : (receivedDate = null);
    }

    // Assigning statusblock data color variation
    /* eslint-disable */
    this.state.filteredTableData
      ? this.state.filteredTableData.map((it, y) => {
          if (parseInt(persons[y]) > parseInt(it.upperlimit)) {
            colors = colors.concat("red");
          } else if (parseInt(persons[y]) < parseInt(it.lowerlimit)) {
            colors = colors.concat("yellow");
          } else {
            colors = colors.concat("#03fc28");
          }
        })
      : [];

    const date = new Date();
    const db_date = new Date(receivedDate);
    let isActive = false;

    if (this.props.app.communication === true) {
      isActive = true;
    }
    return (
      <div>
        <div>
          <Row>
            {eShutdown ? (
              <p style={styles.offline}>{e_shutdown}</p>
            ) : (
              <Row>
                {nShutdown ? (
                  <p style={styles.offline}>{n_shutdown}</p>
                ) : (
                  <Row>
                    {isActive ? (
                      <p style={styles.online}>{live}</p>
                    ) : (
                      <p style={styles.offline}>{offline}</p>
                    )}
                  </Row>
                )}
              </Row>
            )}
          </Row>
        </div>
        <Row>
          {persons.map((It, y) => (
            <Col span={4} style={{ paddingRight: "10px" }}>
              <div className="statistic-block block">
                <Row className="progress-details d-flex align-items-end justify-content-between">
                  {/* up and down arrow column */}
                  <Col>
                    {persons1[y] <= It ? (
                      <img
                        src="./images/up-arrow-1.gif"
                        alt="Arrow"
                        className="statistic-arrow"
                      />
                    ) : (
                      <img
                        src="./images/down-arrow-1.gif"
                        alt="Arrow"
                        className="statistic-arrow"
                      />
                    )}
                  </Col>
                  {/* value displaying column */}
                  <Col className="statistic-number">
                    <span style={{ color: colors[y] }}>{It}</span>
                  </Col>
                </Row>

                <div className="progress progress-template">
                  <div
                    role="progressbar"
                    style={{
                      width: "100%",
                      ariavaluenow: "30",
                      ariavaluemin: "0",
                      ariavaluemax: "100",
                    }}
                    className="progress-bar progress-bar-template dashbg-1"
                  ></div>
                </div>
                {/*  Title column */}
                <div className="statistic-block-title">
                  <strong>{filteredDataLabel[y]}</strong>
                </div>
              </div>
            </Col>
          ))}
          <Col>
            <CVStageComponent />
          </Col>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  app: state.app,
});
const mapDispatchToProps = {};
const statuspage = connect(mapStateToProps, mapDispatchToProps)(StatusBlock);
export default statuspage;
