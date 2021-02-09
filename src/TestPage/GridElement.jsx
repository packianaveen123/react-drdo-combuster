import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';

class GridElement extends Component {
  render() {
    return (

      <div className="site-grid-wrapper">
        <Row gutter={[6, 18]}  >
          <Col span={4} >
            <Card title="RPM" bordered={false} style={{ backgroundColor: "#131633", color: 'white' }}>
              0
                </Card>
          </Col>
          <Col span={4}>
            <Card title="TURBINE INLET TEMPERATURE" bordered={false} style={{ backgroundColor: "#131633", color: 'white' }}>
              0.0
                </Card>
          </Col>
          <Col span={4}>
            <Card title="OIL BRG INLET TEMP" bordered={false} style={{ backgroundColor: "#131633", color: 'white' }}>
              0
                </Card>
          </Col>
          <Col span={4}>
            <Card title="FUEL FLOW RATE" bordered={false} style={{ backgroundColor: "#131633", color: 'white' }}>
              00
                </Card>
          </Col>
          <Col span={4}>
            <Card title="COMPRESSOR OUTLET PRESSURE" bordered={false} style={{ backgroundColor: "#131633", color: 'white' }}>
              0.00
                </Card>
          </Col>
          <Col span={4}>
            <Card title="COMPRESSOR OUTLET TEMP " bordered={false} style={{ backgroundColor: "#131633", color: 'white' }}>
              0
                </Card>
          </Col>
        </Row>
      </div>

    )
  }

}
export default GridElement;