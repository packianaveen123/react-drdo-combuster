import React, { Component } from 'react';
import { Row, Col, Divider } from 'antd';

const style = { background: '#0092ff', padding: '8px 0' };

class Testvb extends Component {
    render() {
        return (
            <div>
                <Row gutter={16}>
                    <Col className="gutter-row" span={4}>
                        <div style={style}>col-6</div>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <div style={style}>col-6</div>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <div style={style}>col-6</div>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <div style={style}>col-6</div>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <div style={style}>col-6</div>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <div style={style}>col-6</div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Testvb;
