import React, { Component } from 'react'
import Tab from 'react-bootstrap/Tab'
import { Card, Button, Form, Col, Nav, Row, Sonnet, Pagination } from 'react-bootstrap';
import Test from './Test'
import Param from './Param'
export default class example extends Component {
  render() {
    return (
      <div>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={2} >
              <Nav variant="pills" className="flex-column" >
                <Nav.Item>
                  <Nav.Link eventKey="first" style={{color: "green"}}> Test</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second" style={{color: "green"}}>Param</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                 <Test/>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Param/>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    )
  }
}
