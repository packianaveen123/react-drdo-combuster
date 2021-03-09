import React, { Component } from 'react'
import { EditOutlined } from '@ant-design/icons';
import { Table, Space } from 'antd';
import { connect } from 'react-redux';
const { Column } = Table;

 class TableElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Name: true,
      // Unit: true,
      // value: true,
      // lowerLimit: true,
      // normalLimit: true,
      // upperLimit: true,
      // TurboID: true,
      // InstalledDate: true,
      // Status: true,
      // editable: true,
    }
  }
  handleClick() {
    console.log('this is:', this);
  }
  render() {
    const { data } = this.props;   
    let columns = []
    if (data) {
      columns = Object.keys(data[0])      
    }
      
    return (
      <div>
        <Table dataSource={data} style={{ backgroundColor: "#131633" }} >         
            { 
            columns ?      
              columns.map(col => {                
                return <Column
                  title= {col}
                  key={col}
                  dataIndex={col}
                />
              }) : []
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

const mapStateToProps = state => ({
  
})
const mapDispatchToProps = {}

const tablePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableElement)

export default tablePage;
