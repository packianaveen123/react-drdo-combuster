import React, { Component } from 'react';
import { Card, Button, Form, FormControl, Col, Container, Row, Table, Pagination } from 'react-bootstrap';
import { MdEdit } from "react-icons/md";
import { testdatas } from '../Data/TableData.json';
import InputText from '../Component/InputText';

export class Test extends Component {
  render() {
    return (
      <div class="container-fluid">
        <div class="card-container" >
          <Card>
            <Card.Body><>
              <Form>
                <h4 style={{ color: 'rgb(151, 150, 151)', paddingTop: '20px' }}>Test Configuration</h4>
                <Form.Row>
                  <Col sm={6}>
                    <InputText />
                    {/* <label style={{ color: 'rgb(151, 150, 151)' }}>Name <i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
                    <span> &nbsp; &nbsp; &nbsp;</span>
                    <Form.Control type="text" placeholder="Name" /> */}

                  </Col>
                  
                  <Col sm={6}>
                  <Row>
                    <Col sm={2}>
                    <label style={{ color: 'rgb(151, 150, 151)' }}>Unit <i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
                    </Col>
                    <Col sm={10}>
                    <Form.Control as="select">
                      <option>select</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Form.Control>
                    </Col>
                    </Row>
                  </Col>
                </Form.Row>
              </Form>

              <div class="row" style={{ paddingTop: '20px', paddingLeft: "15px" }}>

                <div class="col-xs-1 ">
                  <Button as="input" type="submit" value="Save" class="btn btn-primary" />
                  <span> &nbsp;</span>
                </div>
                <div class="col-xs-1 ">
                  <Button as="input" type="submit" value="Clear" class="btn btn-primary" />
                  <span> &nbsp;</span></div>
                <div class="col-xs-1 ">
                  <Button as="input" type="reset" value="Reset" class="btn btn-primary" />
                </div>
              </div>
            </>
            </Card.Body>
          </Card>
        </div>

        <div class="card-container" >
          <card>
            <Container >
              <Row>
                <Col sm={4}><h4 style={{ color: 'rgb(151, 150, 151)', paddingTop: '20px' }}>Test Param</h4></Col>
                <Col sm={8}>
                  <Form inline>
                    <FormControl type="text" placeholder="Search..." className="mr-sm-2" />
                    <div class="row" style={{ paddingTop: '20px' }}>
                      <div class="col-lg-4">
                        <Button as="input" type="submit" value="Excel" />
                        <span> &nbsp; &nbsp; </span>
                      </div>
                      <div class="col-lg-4 ">
                        <Button as="input" type="submit" value="Pdf" />
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
                        <th>value</th>
                        <th>Edit</th>
                      </tr>
                    </thead>
                    <tbody style={{ color: "rgb(151, 150, 151)" }}>

                      {
                        testdatas.map(data => {
                          return (
                            <tr key={data.id}>
                              <td>{data.SNo}</td>
                              <td>{data.Name}</td>
                              <td>{data.Unit}</td>
                              <td>{data.Value}</td>
                              <td>{data.Edit}</td>
                            </tr>
                          )
                        }
                        )
                      }
                    </tbody>
                  </Table>
                  {/* <TableElement/> */}
                  <Pagination >
                    <Pagination.First>First</Pagination.First>
                    <Pagination.Last>Last</Pagination.Last>
                  </Pagination>
                </Col>
              </Row>
            </Container>
          </card>
        </div>
      </div>

    )
  }
}

export default Test


