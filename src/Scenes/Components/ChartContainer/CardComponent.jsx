import React, { Component } from "react";
import { Card, Col, Row } from "antd";
import GraphComponent from "./ChartComponent";
import { connect } from "react-redux";
import { updateTableViewData } from "../../../Redux/action";
import { dashboardSensor } from "../../../Services/constants";
import { getTableView } from "../../../Services/requests";

const { sensorLabel, dummyData, chartMax } = dashboardSensor;

class CardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartValue: [],
      textColor: "",
      cardList: [],
      dummygraphData: [
        {
          FFR: dummyData, //dummyData = 0 in constant page
          P1: dummyData,
          P2: dummyData,
          P3: dummyData,
          P4: dummyData,
          P5: dummyData,
          P6: dummyData,
          P7: dummyData,
          T1: dummyData,
          T2: dummyData,
          T3: dummyData,
          T4: dummyData,
          T5: dummyData,
          T11: dummyData,
          rpm: dummyData,
          testdatadate: dummyData,
        },
        {
          FFR: dummyData,
          P1: dummyData,
          P2: dummyData,
          P3: dummyData,
          P4: dummyData,
          P5: dummyData,
          P6: dummyData,
          P7: dummyData,
          T1: dummyData,
          T2: dummyData,
          T3: dummyData,
          T4: dummyData,
          T5: dummyData,
          T11: dummyData,
          rpm: dummyData,
          testdatadate: dummyData,
        },
        {
          FFR: dummyData,
          P1: dummyData,
          P2: dummyData,
          P3: dummyData,
          P4: dummyData,
          P5: dummyData,
          P6: dummyData,
          P7: dummyData,
          T1: dummyData,
          T2: dummyData,
          T3: dummyData,
          T4: dummyData,
          T5: dummyData,
          T11: dummyData,
          rpm: dummyData,
          testdatadate: dummyData,
        },
        {
          FFR: dummyData,
          P1: dummyData,
          P2: dummyData,
          P3: dummyData,
          P4: dummyData,
          P5: dummyData,
          P6: dummyData,
          P7: dummyData,
          T1: dummyData,
          T2: dummyData,
          T3: dummyData,
          T4: dummyData,
          T5: dummyData,
          T11: dummyData,
          rpm: dummyData,
          testdatadate: dummyData,
        },
        {
          FFR: dummyData,
          P1: dummyData,
          P2: dummyData,
          P3: dummyData,
          P4: dummyData,
          P5: dummyData,
          P6: dummyData,
          P7: dummyData,
          T1: dummyData,
          T2: dummyData,
          T3: dummyData,
          T4: dummyData,
          T5: dummyData,
          T11: dummyData,
          rpm: dummyData,
          testdatadate: dummyData,
        },
        {
          FFR: dummyData,
          P1: dummyData,
          P2: dummyData,
          P3: dummyData,
          P4: dummyData,
          P5: dummyData,
          P6: dummyData,
          P7: dummyData,
          T1: dummyData,
          T2: dummyData,
          T3: dummyData,
          T4: dummyData,
          T5: dummyData,
          T11: dummyData,
          rpm: dummyData,
          testdatadate: dummyData,
        },
      ],
    };
  }

  //Rendering the 6 graph y axis limits while updatinh the table
  componentDidMount() {
    getTableView((data) => {
      //getting this function(data) from request page
      const arrStr = this.props.app.targetKeys; //covertion string to number
      const dashboardDataNumArr = arrStr.map((i) => Number(i));
      let filteredTableData = data.filter((_, index) =>
        dashboardDataNumArr.includes(index)
      );
      //update the tableView rendering the component
      this.props.updateTableViewData(filteredTableData);
    });
  }

  //Initially to render graph with 0 value
  interval = setInterval(() => {
    {
      this.props.app.chartData.length !== 0
        ? this.prepareChartParams(this.props.app.chartData)
        : this.prepareChartParams(this.state.dummygraphData);
    }
  }, 1000);

  prepareChartParams = (chartdata) => {
    let t1 = [];
    let t2 = [];
    let t3 = [];
    let t4 = [];
    let t5 = [];
    let t11 = [];
    let rpm = [];
    let p1 = [];
    let p2 = [];
    let p3 = [];
    let p4 = [];
    let p5 = [];
    let p6 = [];
    let p7 = [];
    let ffr = [];
    let date_Time = [];
    for (let i = 0; i < 6; i++) {
      t1.push(chartdata[i].T1);
      t2.push(chartdata[i].T2);
      t3.push(chartdata[i].T3);
      t4.push(chartdata[i].T4);
      t5.push(chartdata[i].T5);
      t11.push(chartdata[i].T11);
      rpm.push(chartdata[i].rpm);
      p1.push(chartdata[i].P1);
      p2.push(chartdata[i].P2);
      p3.push(chartdata[i].P3);
      p4.push(chartdata[i].P4);
      p5.push(chartdata[i].P5);
      p6.push(chartdata[i].P6);
      p7.push(chartdata[i].P7);
      ffr.push(chartdata[i].FFR);
      date_Time.push(
        new Date(chartdata[i].date_Time).toLocaleTimeString([], {
          hour12: false,
        })
      );
    }

    const arrStr = this.props.app.targetKeys;
    const dashboardDataNumArr = arrStr.map((i) => Number(i)); //covertion string to number

    let filteredDataLabel = sensorLabel.filter((_, index) =>
      dashboardDataNumArr.includes(index)
    ); //chartlabel

    let chartArray = [];
    chartArray.push(t1);
    chartArray.push(t2);
    chartArray.push(t3);
    chartArray.push(t4);
    chartArray.push(t5);
    chartArray.push(t11);
    chartArray.push(p1);
    chartArray.push(p2);
    chartArray.push(p3);
    chartArray.push(p4);
    chartArray.push(p5);
    chartArray.push(p6);
    chartArray.push(p7);
    chartArray.push(ffr);
    chartArray.push(rpm);

    let filteredData = chartArray.filter((_, index) =>
      dashboardDataNumArr.includes(index)
    );
    let filteredDataText;
    {
      this.props.app.chartData[0]
        ? (filteredDataText = Object.values(this.props.app.chartData[0]).filter(
            (_, index) => dashboardDataNumArr.includes(index)
          ))
        : (filteredDataText = []);
    }

    let textColor;
    const chartValue = [];
    for (let i = 0; i < filteredData.length; i++) {
      if (this.props.app.tableViewData) {
        let chart = {
          size: 8,
          labels: date_Time,
          dataSet: {
            title: filteredDataText,
            chartData: filteredData[i],
            filteredDataLabel: filteredDataLabel[i],
            chartBackgroundColor: ["rgba(24,144,255,0.2)"],
            chartBorderColor: [
              "rgba(24, 144, 255, 0.5)",
              "rgba(24, 144, 255, 0.5)",
              "rgba(24, 144, 255, 0.5)",
              "rgba(24, 144, 255, 0.5)",
              "rgba(24, 144, 255, 0.5)",
              "rgba(24, 144, 255, 0.5)",
            ],
            chartTextColor: textColor,

            // /*DEL bugid-(GTRE_7001)*/
            // upperLimitVal: this.props.app.tableViewData[i].upperlimit,
            // normalLimitVal: this.props.app.tableViewData[i].normallimit,
            // lowerLimitVal: this.props.app.tableViewData[i].lowerlimit,

            ///*ADD bugid-(GTRE_7001)*/
            upperLimitVal: this.props.app.tableViewData[i].graph_upper,
            normalLimitVal: this.props.app.tableViewData[i].normallimit,
            lowerLimitVal: this.props.app.tableViewData[i].graph_lower,
          },
        };
        chartValue.push(chart);
        this.setState({
          cardList: chartValue,
        });
      }
    }
  };

  render() {
    if (
      this.state.cardList !== undefined &&
      this.state.cardList.length >= chartMax
    ) {
      return (
        <div className="site-card-wrapper">
          <Row gutter={16}>
            {this.state.cardList
              ? this.state.cardList.map((it, y) => {
                  return (
                    <Col span={8}>
                      <Row style={{ paddingTop: "30px" }}>
                        <Card
                          style={{
                            backgroundColor: "#131633",
                            height: "250px",
                            border: "none",
                            borderRadius: "0px",
                            width: "450px",
                          }}
                        >
                          {it.title}
                          <GraphComponent
                            data={
                              it.dataSet.chartData ? it.dataSet.chartData : []
                            }
                            labels={
                              it.dataSet.filteredDataLabel
                                ? it.dataSet.filteredDataLabel
                                : []
                            }
                            label={
                              it.dataSet.filteredDataLabel
                                ? it.dataSet.filteredDataLabel
                                : "No Label"
                            }
                            title={
                              it.dataSet.title[y]
                                ? it.dataSet.title[y]
                                : "No Data"
                            }
                            backgroundColor={
                              it.dataSet.chartBackgroundColor
                                ? it.dataSet.chartBackgroundColor
                                : []
                            }
                            borderColor={
                              it.dataSet.chartBorderColor
                                ? it.dataSet.chartBorderColor
                                : []
                            }
                            textColor={
                              it.dataSet.chartTextColor
                                ? it.dataSet.chartTextColor
                                : []
                            }
                            upperLimit={
                              it.dataSet.upperLimitVal
                                ? it.dataSet.upperLimitVal
                                : []
                            }
                            normalLimit={
                              it.dataSet.normalLimitVal
                                ? it.dataSet.normalLimitVal
                                : []
                            }
                            lowerLimit={
                              it.dataSet.lowerLimitVal
                                ? it.dataSet.lowerLimitVal
                                : []
                            }
                          />
                        </Card>
                      </Row>
                    </Col>
                  );
                })
              : []}
          </Row>
        </div>
      );
    } else {
      return <div className="site-card-wrapper"></div>;
    }
  }
}
const mapStateToProps = (state) => ({
  app: state.app,
});
const mapDispatchToProps = {
  updateTableViewData,
};
const card = connect(mapStateToProps, mapDispatchToProps)(CardComponent);
export default card;
