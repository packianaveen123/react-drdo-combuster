import React, { Component } from 'react';
import CardComponent from '../../Components/ChartContainer/CardComponent';
import StatusBlock from '../../Components/TestPageComponent/StatusBlock';


export default class GraphView extends Component {
  render() {
    return (
      <div>
        <StatusBlock />
        <CardComponent />
      </div>
    )
  }
}

