import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Radio } from 'antd';

export default class RadioButton extends Component {
    render() {
        return (
            <div>
            <Radio.Group name="radiogroup" defaultValue={1} style={{border:'1px solid gray',width:"300Px"}}>
                <Radio value={1} style={{color:'rgb(151, 150, 151)',fontSize:"15px"}}>Turbine 1</Radio>
                <Radio value={2} style={{color:'rgb(151, 150, 151)',fontSize:"15px"}}>Turbine 2</Radio>             
            </Radio.Group>
            </div>
        );
    }
}
