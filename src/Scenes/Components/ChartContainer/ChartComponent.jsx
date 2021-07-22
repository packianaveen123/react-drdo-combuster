import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class ChartComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
      label: this.props.label,
      labels: this.props.labels,
      title: this.props.title,
      backgroundColor: this.props.backgroundColor,
      borderColor: this.props.borderColor,
      // textColor: this.props.textColor,
      textColor: 'blue',
      upperLimit: this.props.upperLimit,
      normalLimit: this.props.lowerLimit,
      lowerLimit: this.props.lowerLimit
    }
  }
  chartColor = () => {
    for (let i = 0; i < this.state.data.length; i++) {
      let upperLimitVal = parseInt(this.state.upperLimit);
      let normalLimitVal = parseInt(this.state.normalLimit);
      let lowerLimitVal = parseInt(this.state.lowerLimit);
      if (parseInt(this.state.data[i]) > upperLimitVal) {
        this.setState({
          textColor: "red"
        })
        console.log(parseInt(this.state.data[i]))
        console.log(upperLimitVal)
      }
      if (parseInt(this.state.data[i]) > normalLimitVal && parseInt(this.state.data[i]) < upperLimitVal) {
        this.setState({
          textColor: "green"
        })
      }
      if (parseInt(this.state.data[i]) < normalLimitVal && parseInt(this.state.data[i]) > lowerLimitVal) {
        this.setState({
          textColor: "yellow"
        })
      }
      console.log(this.props.app.tableViewData[i].upperlimit)
      console.log(this.props.app.tableViewData[i].normallimit)
      console.log(this.props.app.tableViewData[i].lowerlimit)
    }
  }


  render() {
    const { data, label, backgroundColor, borderColor, title, textColor, upperLimit, lowerLimit } = this.state
    let max = parseInt(upperLimit, 10);
    let min = parseInt(lowerLimit, 10);
    let titleColor;
    data.map(It => {
      if (It > upperLimit) {
        titleColor = 'red'
      }
      else if (It < upperLimit && It > lowerLimit) {
        titleColor = 'green'
      }
      else if (It < lowerLimit) {
        titleColor = 'yellow'
      }
    })

    return (
      <div>
        <Line
          height={240}
          data={{
            labels: ["", "", "", "", "", ""],
            datasets: [{
              label: label,
              data: data,
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              borderWidth: 1,
              title: title,
              upperLimit: upperLimit,
              lowerLimit: lowerLimit
            }]
          }}
          options={{
            maintainAspectRatio: false,
            animation: {
              duration: 0
            },
            title: {
              display: true,
              text: title,
              fontColor: titleColor,
              fontSize: '13'
            },
            legend: {
              position: "top",
              align: "middle"
            },
            scales: {
              xAxes: [{
                gridLines: {
                  color: 'rgba(255, 255, 255, 0.1)',
                },
              }],
              yAxes: [{
                gridLines: {
                  color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                  max: max,
                  min: min,
                  fontColor: 'rgba(255, 255, 255, 0.5)',
                }
              }]
            }
          }}
        />
      </div>
    );
  }
}
export default ChartComponent;