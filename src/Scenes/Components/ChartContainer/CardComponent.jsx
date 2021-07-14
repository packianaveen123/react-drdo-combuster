import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
import GraphComponent from './ChartComponent';
import { connect } from 'react-redux';
import { updateChartData } from '../../../Redux/action';
class CardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      cardList: []
    }
  }
  interval = setInterval(() => {
    console.log(this.props.app.chartData.length)
    {
      this.props.app.chartData.length != 0 ? this.prepareChartParams(this.props.app.chartData)
        : console.log(this.props.app.chartData)
    }

    // this.setState({
    //   cardList : demo
    // })
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
    let chartLabel = ["Temp1", "Temp2", "Temp9", "RPM", "Pressure", "Gas Flow"];
    for (let i = 0; i < chartdata.chartLabel; i++) {
      chartLabel = chartLabel[i];
    }
    let chartArray = [];
    chartArray.push(t1);
    chartArray.push(t2);
    chartArray.push(t3);
    chartArray.push(t4);
    chartArray.push(t5);
    chartArray.push(t11);
    chartArray.push(rpm);
    chartArray.push(p1);
    chartArray.push(p2);
    chartArray.push(p3);
    chartArray.push(p4);
    chartArray.push(p5);
    chartArray.push(p6);
    chartArray.push(p7);
    chartArray.push(ffr);
    // console.log(chartArray)
    const chartValue = []
    for (let i = 0; i < chartArray.length; i++) {
      let chart =
      {
        // title: "chart-"+(i+1),
        size: 8,
        labels: date_Time,
        dataSet: {
          chartData: chartArray[i],
          chartLabel: chartLabel[i],
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
    // const chart = this.prepareChartParams(chartData)
    // this.setState({
    //   cardList : chart
    // })
    console.log("cardlist :" + this.state.cardList)
    if (this.state.cardList !== undefined && this.state.cardList.length >= 5) {
      return (
        <div style={{ backgroundColor: '#212840' }}>
          <div className="site-card-wrapper">
            <Row gutter={16}>
              {this.state.cardList ?
                this.state.cardList.map(it => {
                  return (
                    <Col span={8}>
                      <Row >
                        <Card style={{ backgroundColor: '#131633', height: '200px', border: 'none', borderRadius: '0px' }}>{it.title}
                          <GraphComponent
                            data={it.dataSet.chartData ? it.dataSet.chartData : []}
                            labels={it.dataSet.chartLabel ? it.dataSet.chartLabel : []}
                            label={it.dataSet.chartLabel ? it.dataSet.chartLabel : "No Lebel"}
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