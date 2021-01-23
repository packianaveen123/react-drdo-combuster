import React, { Component } from 'react'
import { Card, Button, Form, FormControl, Col, Container, Row, Table, Pagination, InputGroup } from 'react-bootstrap';
import { MdEdit } from "react-icons/md";
import InputText from '../Component/InputText';
import {paramdatas} from '../Data/TableData.json';

export default class Param extends Component {
  render() {
    return (
      
        <div class="container-fluid">
          <div class="card-container" >
            <Card>
              <Card.Body>
                <Form>
                  <h4 style={{ color: 'rgb(151, 150, 151)', paddingTop: '20px' }}>Param Configuration</h4>
                  <Container>
                    <Row>
                      <Col sm={6} >
                          {/* <Col sm={3}>
                            <label style={{ color: 'rgb(151, 150, 151)' }}>Name <i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
                          </Col>
                          <Col sm={9}>
                            <Form.Group >
                              <Form.Control
                                required
                                type="text"
                                placeholder="First name"
                              />
                            </Form.Group>
                          </Col> */}
                          <InputText/>                      
                      </Col>

                      <Col sm={6}>
                        
                          {/* <Col sm={3}>
                            <label style={{ color: 'rgb(151, 150, 151)' }}>Unit  <i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
                          </Col>
                          <Col sm={9}>
                            <Form.Group >
                              <Form.Control
                                required
                                type="text"
                                placeholder="First name"
                              />
                            </Form.Group>
                          </Col> */}
                           <InputText/>                       
                      </Col>
                    </Row>

                    <Row>
                      <Col sm={6}>
                          {/* 
                          <Row>
                          <Col sm={3}>
                            <label style={{ color: 'rgb(151, 150, 151)' }}>Param index<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
                          </Col>
                          <Col sm={9}>
                            <Form.Group >
                              <Form.Control
                                required
                                type="text"
                                placeholder="First name"
                              />
                            </Form.Group>
                          </Col> 
                          </Row>*/}
                         <InputText/>
                      </Col>
                      <Col sm={6}>
                        {/* <Row>
                          <Col sm={3}>
                          <label style={{ color: 'rgb(151, 150, 151)' }}>Lower Limit <i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
                          </Col>
                          <Col sm={9}>
                          <Form.Group >
                            <Form.Control
                              required
                              type="text"
                              placeholder="First name"
                            />
                          </Form.Group>
                          </Col>
                        </Row> */}
                         <InputText/>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm={6}>
                        {/* <Row>
                          <Col sm={3}>
                          <label style={{ color: 'rgb(151, 150, 151)' }}>Normal Limit <i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
                          </Col>
                          <Col sm={9}>
                          <Form.Group >
                            <Form.Control
                              required
                              type="text"
                              placeholder="First name"
                            />
                          </Form.Group></Col>
                        </Row> */}
                         <InputText/>
                      </Col>

                      <Col sm={6}>
                        {/* <Row>
                          <Col sm={3}>
                          <label style={{ color: 'rgb(151, 150, 151)' }}>Upper Limit <i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
                          </Col>
                          <Col sm={9}>
                          <Form.Group >
                            <Form.Control
                              required
                              type="text"
                              placeholder="First name"
                            />
                          </Form.Group></Col>
                        </Row> */}
                         <InputText/>
                      </Col>
                    </Row>
                  </Container>
                </Form>

                <div class="row" style={{ paddingTop: '20px', paddingLeft: "15px" }}>
                  <div class="col-sm-1 ">
                    <Button as="input" type="submit" value="Clear" class="btn btn-primary" />
                    <span> &nbsp;</span></div>
                  <div class="col-sm-1 ">
                    <Button as="input" type="reset" value="Reset" class="btn btn-primary" />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>

          <Card>
            <Card.Body>
              {/* <Container > */}
              <Row>
                <Col sm={4}><h4 style={{ color: 'rgb(151, 150, 151)', paddingTop: '20px' }}>Param Configuration</h4></Col>
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
                        <th>Name</th>
                        <th>Unit</th>
                        <th>Lower Limit</th>
                        <th>Normal Limit</th>
                        <th>Upper Limit</th>
                        <th>Edit</th>
                      </tr>
                    </thead>
                    <tbody style={{ color: "rgb(151, 150, 151)" }}>
                    {
                        paramdatas.map(data =>{
                        return(
                          <tr key={data.id}>
                            <td>{data.SNo}</td>
                            <td>{data.Name}</td>
                            <td>{data.Unit}</td>
                            <td>{data.LowerLimit}</td>
                            <td>{data.NormalLimit}</td>
                            <td>{data.UpperLimit}</td>
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
