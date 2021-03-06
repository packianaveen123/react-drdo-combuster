import React, { Component } from 'react'
import { EditOutlined } from '@ant-design/icons';
import { Table, Space } from 'antd';

const { Column } = Table;

export default class TableElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: true,
      Unit: true,
      value: true,
      lowerLimit: true,
      normalLimit: true,
      upperLimit: true,
      TurboID: true,
      InstalledDate: true,
      Status: true,
      editable: true,
    }
  }
  handleClick() {
    console.log('this is:', this);
  }
  render() {
    const { data } = this.props;
    // console.log(data);
    return (
      <div>
        <Table dataSource={data} style={{ backgroundColor: "#131633" }} >
          <Column title="S.No" dataIndex="SNo" />

          {
            this.props.Name ?
              <Column
                title="Name"
                key="Name"
                dataIndex="Name"
              /> : []
          }
          {
            this.props.Unit ?
              <Column
                title="Unit"
                key="Unit"
                dataIndex="Unit"
              /> : []
          }
          {
            this.props.value ?
              <Column
                title="Value"
                key="value"
                dataIndex="Value"
              /> : []
          }
          {
            this.props.lowerLimit ?
              <Column
                title="LowerLimit"
                key="lowerLimit"
                dataIndex="LowerLimit"
              /> : []
          }
          {
            this.props.normalLimit ?
              <Column
                title="NormalLimit"
                key="normalLimit"
                dataIndex="NormalLimit"
              /> : []
          }
          {
            this.props.upperLimit ?
              <Column
                title="UpperLimit"
                key="upperLimit"
                dataIndex="UpperLimit"
              /> : []
          }
          {
            this.props.TurboID ?
              <Column
                title="TurboID"
                key="TurboID"
                dataIndex="TurboID"
              /> : []
          }
          {
            this.props.InstalledDate ?
              <Column
                title="InstalledDate"
                key="InstalledDate"
                dataIndex="InstalledDate"
              /> : []
          }
          {
            this.props.Status ?
              <Column
                title="Status"
                key="Status"
                dataIndex="Status"
              /> : []
          }
          {
            this.props.editable ?
              <Column
                title="Edit"
                key="edit"
                style={{ fontSize: '20px' }}
                render={() => (
                  <Space size="middle">
                    <span onClick={() => this.handleClick()}>
                      <EditOutlined style={{ fontSize: '18px' }} />
                    </span>
                  </Space>
                )}
              /> : []
          }

        
        </Table>
      </div>
    )
  }
}
