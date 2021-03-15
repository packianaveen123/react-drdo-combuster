import React, { Component } from 'react'
import { EditOutlined } from '@ant-design/icons';
import { Table, Space } from 'antd';
import { connect } from 'react-redux';
const { Column } = Table;

 class TableElement extends Component {
  constructor(props) {
    super(props);
  }
  handleClick(event) {
    console.log('this is:', event);
  }
  render() {
    const { data } = this.props;
     
    let columns = []
    if ((data !== null || data !== undefined) && data.length > 0) {
      columns = Object.keys(data[0])      
    }
      
    return (
      <div>
        <Table 
          dataSource={data} 
          style={{ backgroundColor: "#131633" }}
          onSelect={(e) => this.handleClick}
        >         
            { 
            columns && columns.length > 0 ?      
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
                        <EditOutlined style={{ fontSize: '18px' }} />
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
  app: state.app
})
const mapDispatchToProps = {}

const tablePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableElement)

export default tablePage;
