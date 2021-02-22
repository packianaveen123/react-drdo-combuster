import React, { Component } from 'react'
import {  Row, Layout } from 'antd';
export default class TitleComponent extends Component {
    constructor(props){
        super(props);
        
        }
    render() {
        return (
            <div>
                <Layout style={{ backgroundColor: "#212840", paddingBottom: "20px",paddingTop:'10px' }}>
                    <Row>
                        <text style={{ color: '#42dad6', fontSize: "25px" }}>EnerTek</text>
                        <text style={{ color: '#585a5f', fontSize: "25px" }}>  / Config / Test Config</text>
                    </Row>
                </Layout>
            </div>
        )
    }
}

