import React, { Component } from 'react';
import { Card, Button, Form, FormControl, Col, Container, Row, Table, Pagination,InputGroup } from 'react-bootstrap';
import { MdEdit } from "react-icons/md";
import Calender from '../Component/Calender';
import {turbinedatas} from '../Data/TableData.json';

import './Style.css';
export class Turbine extends Component {
  render() {
    return (

      <div class="container-fluid">
        <div class="card-container" >
          <Card>
            <Card.Body>
              <Form>
                <h4 style={{ color: 'rgb(151, 150, 151)', paddingTop: '20px' }}>Turbine Configuration</h4>
                <Container>
                  <Row>
                    <Col >
                      <Row>
                        <Col>
                        <label style={{ color: 'rgb(151, 150, 151)' }}>Turbine ID <i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
                        <span> &nbsp; &nbsp; &nbsp;</span>
                        </Col>
                        <Col>
                        <Form.Group >
                          <Form.Control
                            required
                            type="text"
                            placeholder="First name"
                          />
                        </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                    <Col >
                      <Row>
                        <Col>
                        <label style={{ color: 'rgb(151, 150, 151)' }}>Installed Date <i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
                        <span> &nbsp; &nbsp; &nbsp;</span></Col>
                        <Col>
                        <Form.Group >
                          <Calender />
                        </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                    <Col  >
                      <Row>
                        <Col>
                        <label style={{ color: 'rgb(151, 150, 151)' }}>Nozzle Area <i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
                        <span> &nbsp; &nbsp; &nbsp;</span></Col>
                        <Col>

                        <Form.Group >
                          <Form.Control
                            required
                            type="text"
                            placeholder="last name"
                          />
                        </Form.Group></Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <div class="col-lg-1 col-md-2 col-sm-2 col-xs-12">
                      <div class="input-mask-title">
                        <label style={{ color: 'rgb(151, 150, 151)' }}>Description</label>&nbsp;
                      </div>
                    </div>
                    <div class="col-lg-7 col-md-10 col-sm-10 col-xs-12">
                      <input type="text" id="txtChar" class="form-control" placeholder="Description...." style={{ height: '100px' }} />
                    </div>
                  </Row>
                </Container>

              </Form>
              <div class="row" style={{ paddingTop: '20px', paddingLeft: "15px" }}>
                <div class="col-sm-1 ">
                  <Button as="input" type="submit" value="Save" class="btn btn-primary" />
                  <span> &nbsp;</span>
                </div>
                <div class="col-sm-1 ">
                  <Button as="input" type="submit" value="Clear" class="btn btn-primary" />
                  <span> &nbsp;</span></div>
              </div>
            </Card.Body>

          </Card>
        </div>

        <Card>
          <Card.Body>
            {/* <Container > */}
            <Row>
              <Col sm={4}><h4 style={{ color: 'rgb(151, 150, 151)', paddingTop: '20px' }}>Turbine Configuration</h4></Col>
              <Col sm={8}>
                <Form inline>
                  <FormControl type="text" placeholder="Search..." className="mr-sm-2" />
                  <div class="row" style={{ paddingTop: '20px' }}>
                    <div class="col-lg-4">
                      <Button as="input" type="submit" value="Excel" class="btn btn-primary" />
                      <span> &nbsp; &nbsp; &nbsp;</span>
                    </div>
                    <div class="col-lg-4 ">
                      <Button as="input" type="submit" value="Pdf" class="btn btn-primary" />
                      <span> &nbsp;</span></div>
                  </div>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table striped bordered hover variant="dark">
                  <thead style={{ color: "rgb(151, 150, 151)", backgroundColor: "rgb(19, 23, 50)" }}>
                    <tr>
                      <th>S.No</th>
                      <th>Turbine ID</th>
                      <th>Installed Date</th>
                      <th>Status</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody style={{ color: "rgb(151, 150, 151)" }}>
                  {
                        turbinedatas.map(data =>{
                        return(
                          <tr key={data.id}>
                            <td>{data.SNo}</td>
                            <td>{data.TurbineID}</td>
                            <td>{data.InstalledDate}</td>
                            <td>{data.Status}</td>
                            <td>{data.Edit}</td>
                          </tr>
                        )
                        })}
                  </tbody>
                </Table>
                <Pagination >
                  <Pagination.First>First</Pagination.First>
                  <Pagination.Last>Last</Pagination.Last>
                </Pagination>
              </Col>
            </Row>
            {/* </Container> */}
          </Card.Body>
        </Card>
      </div>

    )
  }
}

export default Turbine


