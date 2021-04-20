
import { Alert } from 'antd';
import React, { Component } from 'react';
import 'antd/dist/antd.css';


export default class alertElement extends Component {
  render() {
    return (
      <div>
        <Alert
          message="Warning"
          description="This value is already exist."
          type="warning"
          showIcon
          closable
        />
      </div>
    );
  }
}


