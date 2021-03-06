import React, { Component } from "react";
import { Col, Row } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';

class StatusBlock extends Component {
  constructor(props){
    super(props);
    this.state={
      cardList:this.props.cardlist
    }
  }
  state = {
    persons: []
  }

  // interval = setInterval(() => {
  //   this.requestChartData();
  // }, 1000);

  // requestChartData() {

  //   axios.get('http://localhost/TVS/index.php').then(res => {
  //     const persons = res.data;
  //     // console.log(res);
  //     this.setState({ persons });
  //   })
  // }
  render() {
   console.log(this.props);
    return (
      <div class="container-fluid">
        <Row>
          <Col span={4} style={{ paddingLeft: "0px", paddingRight: "10px" }}>
            <div class="statistic-block block" >
              <Row class="progress-details d-flex align-items-end justify-content-between">
                <Col>
                  <img src="./images/up-arrow-1.gif" alt="Arrow" style={{ width: '20px', height: '30px', marginTop: '8px', marginLeft: '30px' }} />
                </Col>
                <Col class="number dashtext-1" style={{ paddingLeft: '50%', fontSize: '25px' }}>{this.state.persons.map(person =>
                  <span>{person.RPM}</span>
                )}</Col>
              </Row>
              <div class="progress progress-template">
                <div role="progressbar" style={{ width: '100%', ariavaluenow: '30', ariavaluemin: '0', ariavaluemax: '100' }} class="progress-bar progress-bar-template dashbg-1"></div>
              </div>
              <div class="title">
                <div class="icon"><i class="icon-user-1"></i></div><strong>Turbine RPM</strong>
              </div>
            </div>
          </Col>

          <Col span={4} style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            <div class="statistic-block block">
              <Row class="progress-details d-flex align-items-end justify-content-between">
                <Col>
                  <img src="./images/down-arrow-1.gif" alt="Arrow" style={{ width: '20px', height: '30px', marginTop: '8px', marginLeft: '15px' }} />
                </Col>
                <Col class="number dashtext-2" style={{ paddingLeft: '50%', fontSize: '25px' }}>{this.state.persons.map(person =>
                  <span>{this.props.T1}</span>
                )}</Col>
              </Row>
              <div class="progress progress-template">
                <div role="progressbar" style={{ width: '100%', ariavaluenow: '70', ariavaluemin: '0', ariavaluemax: '100' }} class="progress-bar progress-bar-template dashbg-2"></div>
              </div>
              <div class="title">
                <div class="icon"><i class="icon-contract"></i></div><strong>Temperature 1</strong>
              </div>
            </div>
          </Col>

          <Col span={4} style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            <div class="statistic-block block">
              <Row class="progress-details d-flex align-items-end justify-content-between">
                <Col>
                  <img src="./images/down-arrow-1.gif" alt="Arrow" style={{ width: '20px', height: '30px', marginTop: '8px', marginLeft: '15px' }} />
                </Col>
                <Col class="number dashtext-3" style={{ paddingLeft: '50%', fontSize: '25px' }}>
                  {this.state.persons.map(person =>
                    <span>{person.T2}</span>
                  )}</Col>
              </Row>
              <div class="progress progress-template">
                <div role="progressbar" style={{ width: '100%', ariavaluenow: '55', ariavaluemin: '0', ariavaluemax: '100' }} class="progress-bar progress-bar-template dashbg-3"></div>
              </div>
              <div class="title">
                <div class="icon"><i class="icon-paper-and-pencil"></i></div><strong>Temperature 2</strong>
              </div>
            </div>
          </Col>

          <Col span={4} style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            <div class="statistic-block block">
              <Row class="progress-details d-flex align-items-end justify-content-between">
                <Col>
                  <img src="./images/up-arrow-1.gif" alt="Arrow" style={{ width: '20px', height: '30px', marginTop: '8px', marginLeft: '15px' }} />
                </Col>
                <Col class="number dashtext-4" style={{ paddingLeft: '50%', fontSize: '25px' }}>
                  {this.state.persons.map(person =>
                    <span>{person.T9}</span>
                  )}</Col>
              </Row>
              <div class="progress progress-template">
                <div role="progressbar" style={{ width: '100%', ariavaluenow: '35', ariavaluemin: '0', ariavaluemax: '100' }} class="progress-bar progress-bar-template dashbg-4"></div>
              </div>
              <div class="title">
                <div class="icon"><i class="icon-writing-whiteboard"></i></div><strong>Temperature 9</strong>
              </div>
            </div>
          </Col>

          <Col span={4} style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            <div class="statistic-block block">
              <Row class="progress-details d-flex align-items-end justify-content-between">
                <Col>
                  <img src="./images/up-arrow-1.gif" alt="Arrow" style={{ width: '20px', height: '30px', marginTop: '8px', marginLeft: '15px' }} />
                </Col>
                <Col class="number dashtext-4" style={{ paddingLeft: '50%', fontSize: '25px' }}>
                  {this.state.persons.map(person =>
                    <span>{person.P2}</span>
                  )}</Col>
              </Row>
              <div class="progress progress-template">
                <div role="progressbar" style={{ width: '100%', ariavaluenow: '35', ariavaluemin: '0', ariavaluemax: '100' }} class="progress-bar progress-bar-template dashbg-4"></div>
              </div>
              <div class="title">
                <div class="icon"><i class="icon-writing-whiteboard"></i></div><strong>Pressure 2</strong>
              </div>
            </div>
          </Col>

          <Col span={4} style={{ paddingLeft: "10px", paddingRight: "0px" }}>
            <div class="statistic-block block">
              <Row class="progress-details d-flex align-items-end justify-content-between">
                <Col>
                  <img src="./images/down-arrow-1.gif" alt="Arrow" style={{ width: '20px', height: '30px', marginTop: '8px', marginLeft: '15px' }} />
                </Col>
                <Col class="number dashtext-4" style={{ paddingLeft: '50%', fontSize: '25px' }}>
                  {this.state.persons.map(person =>
                    <span>{person.P2}</span>
                  )}</Col>
              </Row>
              <div class="progress progress-template">
                <div role="progressbar" style={{ width: '100%', ariavaluenow: '35', ariavaluemin: '0', ariavaluemax: '100' }} class="progress-bar progress-bar-template dashbg-4"></div>
              </div>
              <div class="title">
                <div class="icon"><i class="icon-writing-whiteboard"></i></div><strong>Pressure 2</strong>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  app: state.app
})

const mapDispatchToProps = {}

const statuspage = connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusBlock)

export default statuspage;


