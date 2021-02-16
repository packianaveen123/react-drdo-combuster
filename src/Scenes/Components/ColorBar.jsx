import React, { Component } from 'react'
import { Col, Row } from 'antd';
export default class ColorBar extends Component {
    render() {
        return (
            <div>
                <Row style={{ paddingTop: "50px" }}>
                    <Col span="8">
                        <Row>
                        <Col span="6">
                            <label style={{color:'#acadb7'}}>LowerColor</label>
                        </Col>
                    
                        <Col span="6">
                            <input type="color" 
                            ng-model="LowerColor"
                            class="form-control" 
                            placeholder="Symbol" 

                            style={{width:"20rem",
                            height:"30px",
                            backgroundColor:"#131633",
                            borderColor:"1 px solid #3e434d"}} />

                        </Col>
                        </Row>
                    </Col>

                    <Col span="8">
                        <Row>
                        <Col span="6">
                            <label style={{color:'#acadb7'}}>NormalColor</label>
                        </Col>
                    
                        <Col span="6">
                            <input type="color" 
                            ng-model="LowerColor" 
                            class="form-control" 
                            placeholder="Symbol" 

                            style={{width:"20rem",
                            height:"30px",
                            backgroundColor:"#131633",
                            borderColor:"1 px solid gray"}} />

                        </Col>
                        </Row>
                    </Col>

                    <Col span="8">
                        <Row>
                        <Col span="6">
                            <label style={{color:'#acadb7'}}>UpperColor</label>
                        </Col>
                    
                        <Col span="6">
                            <input type="color" 
                            ng-model="LowerColor" 
                            class="form-control" 
                            placeholder="Symbol" 
                            style={{width:"20rem",
                            height:"30px",
                            backgroundColor:"#131633",
                            borderColor:"1 px solid gray"}} />

                        </Col>
                        </Row>
                    </Col>

                    
                </Row>
            </div>
        )
    }
}
