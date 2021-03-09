import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
import GraphComponent from './ChartComponent';
import axios from 'axios';
import { connect } from 'react-redux';
import {updateChartData} from '../../../Redux/action';
 
class CardComponent extends Component {
  
  constructor(props) {
    super(props);
    this.state = {      
      loading: false,
      cardList: [] 
    }
  }

  interval = setInterval(() => {
    this.requestChartData();
  }, 1000);

  requestChartData() {
    axios.get('http://localhost/TVS/graph.php').then(res => {     
      let chartdata = res.data;
      this.props.updateChartData(chartdata);
    }).catch(err => {
        console.log(err);
      })
  }

  toggleBorder = () => {
    this.setState({ loading: !this.state.loading })
  }
  prepareChartParams  = (chartdata) => {
    let t1 = [];
    let t2 = [];
    let t9 = [];
    let rpm = [];
    let p2 = [];
    let date_Time = [];
    for (let i = 0; i < chartdata.length; i++) {
      t1.push(chartdata[i].T1);
      t2.push(chartdata[i].T2);
      t9.push(chartdata[i].T9);
      rpm.push(chartdata[i].RPM);
      p2.push(chartdata[i].P2);
      date_Time.push(new Date(chartdata[i].date_Time).toLocaleTimeString([], { hour12: false }));
    }
    let chartLabel = ["Temp1", "Temp2", "Temp9", "RPM", "Pressure"];
    for (let i = 0; i < chartdata.chartLabel; i++) {
      chartLabel = chartLabel[i];
    }
    let chartArray = [];
    chartArray.push(t1);
    chartArray.push(t2);
    chartArray.push(t9);
    chartArray.push(rpm);
    chartArray.push(p2);
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
            // 'rgba(54, 162, 235, 0.1)',
            // 'rgba(255, 206, 86, 0.1)',
            // 'rgba(75, 192, 192, 0.2)',
            // 'rgba(153, 102, 255, 0.2)',
            // 'rgba(255, 99, 132, 0.2)'
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
      return chart  
    }
  }

  render() {
    const { loading } = this.state;
    const chartData = this.props.app.chartData; 
    const chart = this.prepareChartParams(chartData)
     console.log(chart.dataSet.chartData)
    if (chart !== undefined && chart.dataSet.chartData.length >= 5) {
      return (
        <div style={{ backgroundColor: '#212840' }}>
          <div className="site-card-wrapper">
            <Row gutter={16}>
              <Col span={6}>
                <Card style={{ backgroundColor: '#131633', height: '200px', border: 'none', borderRadius: '0px' }}>{chart.title}
                  <GraphComponent
                    data={chart.dataSet.chartData ? chart.dataSet.chartData : []}
                    labels={chart.dataSet.chartLabel ? chart.dataSet.chartLabel : []}
                    label={chart.dataSet.chartLabel ? chart.dataSet.chartLabel : "No Lebel"}
                    backgroundColor={chart.dataSet.chartBackgroundColor ? chart.dataSet.chartBackgroundColor : []}
                    borderColor={chart.dataSet.chartBorderColor ? chart.dataSet.chartBorderColor : []}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card style={{ backgroundColor: '#131633', height: '200px', border: 'none', borderRadius: '0px' }}>{chart.title}
                  <GraphComponent
                    data={chart.dataSet.chartData ? chart.dataSet.chartData : []}
                    labels={chart.dataSet.chartLabel ? chart.dataSet.chartLabel : []}
                    label={chart.dataSet.chartLabel ? chart.dataSet.chartLabel : "No Lebel"}
                    backgroundColor={chart.dataSet.chartBackgroundColor ? chart.dataSet.chartBackgroundColor : []}
                    borderColor={chart.dataSet.chartBorderColor ? chart.dataSet.chartBorderColor : []}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card style={{ backgroundColor: '#131633', height: '200px', border: 'none', borderRadius: '0px' }}>{chart.title}
                  <GraphComponent
                    data={chart.dataSet.chartData ? chart.dataSet.chartData : []}
                    labels={chart.dataSet.chartLabel ? chart.dataSet.chartLabel : []}
                    label={chart.dataSet.chartLabel ? chart.dataSet.chartLabel : "No Lebel"}
                    backgroundColor={chart.dataSet.chartBackgroundColor ? chart.dataSet.chartBackgroundColor : []}
                    borderColor={chart.dataSet.chartBorderColor ? chart.dataSet.chartBorderColor : []}
                  />
                </Card>
              </Col><Col span={6}>
                <Card style={{ backgroundColor: '#131633', height: '200px', border: 'none', borderRadius: '0px' }}>{chart.title}
                  <GraphComponent
                    data={chart.dataSet.chartData ? chart.dataSet.chartData : []}
                    labels={chart.dataSet.chartLabel ? chart.dataSet.chartLabel : []}
                    label={chart.dataSet.chartLabel ? chart.dataSet.chartLabel : "No Lebel"}
                    backgroundColor={chart.dataSet.chartBackgroundColor ? chart.dataSet.chartBackgroundColor : []}
                    borderColor={chart.dataSet.chartBorderColor ? chart.dataSet.chartBorderColor : []}
                  />
                </Card>
              </Col><Col span={6}>
                <Card style={{ backgroundColor: '#131633', height: '200px', border: 'none', borderRadius: '0px' }}>{chart.title}
                  <GraphComponent
                    data={chart.dataSet.chartData ? chart.dataSet.chartData : []}
                    labels={chart.dataSet.chartLabel ? chart.dataSet.chartLabel : []}
                    label={chart.dataSet.chartLabel ? chart.dataSet.chartLabel : "No Lebel"}
                    backgroundColor={chart.dataSet.chartBackgroundColor ? chart.dataSet.chartBackgroundColor : []}
                    borderColor={chart.dataSet.chartBorderColor ? chart.dataSet.chartBorderColor : []}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card style={{ backgroundColor: '#131633', height: '200px', border: 'none', borderRadius: '0px' }}>{chart.title}
                  <GraphComponent
                    data={chart.dataSet.chartData ? chart.dataSet.chartData : []}
                    labels={chart.dataSet.chartLabel ? chart.dataSet.chartLabel : []}
                    label={chart.dataSet.chartLabel ? chart.dataSet.chartLabel : "No Lebel"}
                    backgroundColor={chart.dataSet.chartBackgroundColor ? chart.dataSet.chartBackgroundColor : []}
                    borderColor={chart.dataSet.chartBorderColor ? chart.dataSet.chartBorderColor : []}
                  />
                </Card>
              </Col>
              {/* <Col span={6}>
                <Card style={{ backgroundColor: '#131633', height: '200px', border: 'none', borderRadius: '0px' }}>{chart[1].title}
                  <GraphComponent
                    data={chart[1].dataSet.chartData ? chart[1].dataSet.chartData : []}
                    labels={chart[1].labels ? chart[1].labels : []}
                    label={chart[1].dataSet.chartLabel ? chart[1].dataSet.chartLabel : "No Lebel"}
                    backgroundColor={chart[1].dataSet.chartBackgroundColor ? chart[1].dataSet.chartBackgroundColor : []}
                    borderColor={chart[1].dataSet.chartBorderColor ? chart[1].dataSet.chartBorderColor : []}
                  />
                </Card>
              </Col>

              <Col span={6}>
                <Card style={{ backgroundColor: '#131633', height: '200px', border: 'none', borderRadius: '0px' }}>{chart[2].title}
                  <GraphComponent
                    data={chart[2].dataSet.chartData ? chart[2].dataSet.chartData : []}
                    labels={chart[2].labels ? chart[2].labels : []}
                    label={chart[2].dataSet.chartLabel ? chart[2].dataSet.chartLabel : "No Lebel"}
                    backgroundColor={chart[2].dataSet.chartBackgroundColor ? chart[2].dataSet.chartBackgroundColor : []}
                    borderColor={chart[2].dataSet.chartBorderColor ? chart[2].dataSet.chartBorderColor : []}
                  />
                </Card>
              </Col>

              <Col span={6} style={{ paddingTop: '15px' }}>
                <Card style={{ backgroundColor: '#131633', height: '200px', border: 'none', borderRadius: '0px' }}>{chart[3].title}
                  <GraphComponent
                    data={chart[3].dataSet.chartData ? chart[3].dataSet.chartData : []}
                    labels={chart[3].labels ? chart[3].labels : []}
                    label={chart[3].dataSet.chartLabel ? chart[3].dataSet.chartLabel : "No Lebel"}
                    backgroundColor={chart[3].dataSet.chartBackgroundColor ? chart[3].dataSet.chartBackgroundColor : []}
                    borderColor={chart[3].dataSet.chartBorderColor ? chart[3].dataSet.chartBorderColor : []}
                  />
                </Card>
              </Col>

              <Col span={6} style={{ paddingTop: '15px' }} >
                <Card style={{ backgroundColor: '#131633', height: '200px', border: 'none', borderRadius: '0px' }}>{chart[4].title}
                  <GraphComponent
                    data={chart[4].dataSet.chartData ? chart[4].dataSet.chartData : []}
                    labels={chart[4].labels ? chart[4].labels : []}
                    label={chart[4].dataSet.chartLabel ? chart[4].dataSet.chartLabel : "No Lebel"}
                    backgroundColor={chart[4].dataSet.chartBackgroundColor ? chart[4].dataSet.chartBackgroundColor : []}
                    borderColor={chart[4].dataSet.chartBorderColor ? chart[4].dataSet.chartBorderColor : []}
                  />
                </Card>
              </Col>

              <Col span={chart[4].size} style={{ paddingTop: '15px' }} >
                <Card style={{ backgroundColor: '#131633', height: '200px', border: 'none', borderRadius: '0px' }}>{chart[4].title}
                  <GraphComponent
                    data={chart[4].dataSet.chartData ? chart[4].dataSet.chartData : []}
                    labels={chart[4].labels ? chart[4].labels : []}
                    label={chart[4].dataSet.chartLabel ? chart[4].dataSet.chartLabel : "No Lebel"}
                    backgroundColor={chart[4].dataSet.chartBackgroundColor ? chart[4].dataSet.chartBackgroundColor : []}
                    borderColor={chart[4].dataSet.chartBorderColor ? chart[4].dataSet.chartBorderColor : []}
                  />
                </Card>
              </Col> */}
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