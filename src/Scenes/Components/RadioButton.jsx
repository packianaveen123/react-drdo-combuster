import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Radio } from 'antd';

export default class RadioButton extends Component {
    render() {
        return (
            <div>
            <Radio.Group name="radiogroup" 
            defaultValue={1} 
            style={{
                border:'1px solid #3e434d',
                width:"300px",
                height:"40px",
                paddingTop:'4px',
                paddingLeft:'25px'
                }}>
                <Radio value={1} style={{color:'rgb(151, 150, 151)',fontSize:"18px"}}>Turbo 1</Radio>
                <Radio value={2} style={{color:'rgb(151, 150, 151)',fontSize:"18px"}}>Turbo 2</Radio>             
            </Radio.Group>
            </div>
        );
    }
}
