import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
import GraphComponent from './ChartComponent';
import { connect } from 'react-redux';
import { updateChartData } from '../../../Redux/action';
import { dashboardSensor } from "../../../Services/constants";
const { sensorLabel } = dashboardSensor;
class CardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      cardList: [], dummygraphData: [
        {
          FFR: "0",
          P1: "0",
          P2: "0",
          P3: "0",
          P4: "0",
          P5: "0",
          P6: "0",
          P7: "0",
          T1: "0",
          T2: "0",
          T3: "0",
          T4: "0",
          T5: "0",
          T11: "0",
          rpm: "0",
          testdatadate: "0",
        },
        {
          FFR: "0",
          P1: "0",
          P2: "0",
          P3: "0",
          P4: "0",
          P5: "0",
          P6: "0",
          P7: "0",
          T1: "0",
          T2: "0",
          T3: "0",
          T4: "0",
          T5: "0",
          T11: "0",
          rpm: "0",
          testdatadate: "0",
        },
        {
          FFR: "0",
          P1: "0",
          P2: "0",
          P3: "0",
          P4: "0",
          P5: "0",
          P6: "0",
          P7: "0",
          T1: "0",
          T2: "0",
          T3: "0",
          T4: "0",
          T5: "0",
          T11: "0",
          rpm: "0",
          testdatadate: "0",
        },
        {
          FFR: "0",
          P1: "0",
          P2: "0",
          P3: "0",
          P4: "0",
          P5: "0",
          P6: "0",
          P7: "0",
          T1: "0",
          T2: "0",
          T3: "0",
          T4: "0",
          T5: "0",
          T11: "0",
          rpm: "0",
          testdatadate: "0",
        },
        {
          FFR: "0",
          P1: "0",
          P2: "0",
          P3: "0",
          P4: "0",
          P5: "0",
          P6: "0",
          P7: "0",
          T1: "0",
          T2: "0",
          T3: "0",
          T4: "0",
          T5: "0",
          T11: "0",
          rpm: "0",
          testdatadate: "0",
        },
        {
          FFR: "0",
          P1: "0",
          P2: "0",
          P3: "0",
          P4: "0",
          P5: "0",
          P6: "0",
          P7: "0",
          T1: "0",
          T2: "0",
          T3: "0",
          T4: "0",
          T5: "0",
          T11: "0",
          rpm: "0",
          testdatadate: "0",
        },
      ],
    }
  }
  componentDidMount() {
    const stableValue = this.props.app.dashboardData.filter((it) =>
      this.props.app.targetKeys.find((val) => val === it.key)
    );
    console.log(stableValue);
  }
  interval = setInterval(() => {
    console.log(this.props.app.chartData.length)
    {
      this.props.app.chartData.length != 0
        ? this.prepareChartParams(this.props.app.chartData)
        : this.prepareChartParams(this.state.dummygraphData);
    }

  }, 1000);
  toggleBorder = () => {
    this.setState({ loading: !this.state.loading })
  }
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
      date_Time.push(new Date(chartdata[i].date_Time).toLocaleTimeString([], { hour12: false }));
    }

    const arrStr = this.props.app.targetKeys;
    const dashboardDataNumArr = arrStr.map((i) => Number(i)); //covertion string to number
    console.log(dashboardDataNumArr);

    let filteredDataLabel = sensorLabel.filter((_, index) => dashboardDataNumArr.includes(index)); //chartlabel
    console.log("Label Name", filteredDataLabel);

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
    console.log(chartArray)
    console.log(this.props.app.targetKeys)

    let filteredData = chartArray.filter((_, index) => dashboardDataNumArr.includes(index));
    console.log("ChartArray Value", filteredData);
    const chartValue = []
    for (let i = 0; i < filteredData.length; i++) {
      let chart =
      {
        size: 8,
        labels: date_Time,
        dataSet: {
          chartData: filteredData[i],
          filteredDataLabel: filteredDataLabel[i],
          chartBackgroundColor: [
            'rgba(24,144,255,0.2)'
          ],
          chartBorderColor: [
            'rgba(24, 144, 255, 0.5)',
            'rgba(24, 144, 255, 0.5)',
            'rgba(24, 144, 255, 0.5)',
            'rgba(24, 144, 255, 0.5)',
            'rgba(24, 144, 255, 0.5)',
            'rgba(24, 144, 255, 0.5)'
          ]
        }
      }
      chartValue.push(chart)
      this.setState({
        cardList: chartValue
      })
    }
  }
  render() {
    const chartData = this.props.app.chartData ? this.props.app.chartData : null;
    console.log("cardlist :" + this.state.cardList)
    if (this.state.cardList !== undefined && this.state.cardList.length >= 5) {
      return (
        <div className="site-card-wrapper">
          <Row gutter={16}>
            {this.state.cardList ?
              this.state.cardList.map(it => {
                return (
                  <Col span={8}>
                    <Row style={{ paddingTop: '50px' }}>
                      <Card style={{ backgroundColor: '#131633', height: '200px', border: 'none', borderRadius: '0px' }}>{it.title}
                        <GraphComponent
                          data={it.dataSet.chartData ? it.dataSet.chartData : []}
                          labels={it.dataSet.filteredDataLabel ? it.dataSet.filteredDataLabel : []}
                          label={it.dataSet.filteredDataLabel ? it.dataSet.filteredDataLabel : "No Lebel"}
                          backgroundColor={it.dataSet.chartBackgroundColor ? it.dataSet.chartBackgroundColor : []}
                          borderColor={it.dataSet.chartBorderColor ? it.dataSet.chartBorderColor : []}
                        />
                      </Card>
                    </Row>
                  </Col>
                )
              }) : []
            }
          </Row>
        </div>
      );
    }
    else {
      return (<div className="site-card-wrapper"></div>);
    }
  }
}
const mapStateToProps = state => ({
  app: state.app
})
const mapDispatchToProps = {
  updateChartData
}
const card = connect(
  mapStateToProps,
  mapDispatchToProps
)(CardComponent)
export default card;