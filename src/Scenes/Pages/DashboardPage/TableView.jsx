import React, { Component } from 'react';
import { Col, Row } from 'antd';
import TableElement from '../../Components/TableElement';
import StatusBlock from '../../Components/TestComponent/StatusBlock';

export default class TableView extends Component {
  render() {
    return (
      <div>
        <StatusBlock />
        <Row style={{ paddingTop: '30px' }}>
          <Col span={16}>
            <TableElement />
          </Col>
          <Col style={{ paddingLeft: '40px' }}>
            <TableElement />
          </Col>
        </Row>

      </div>
    )
  }
}



