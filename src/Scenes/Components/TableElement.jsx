import React, { Component } from 'react'
import { EditOutlined } from '@ant-design/icons';
import { Table, Space } from 'antd';
import { connect } from 'react-redux';
const { Column } = Table;

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inEditMode: {
        status: false,
        rowKey: null
      }
    }
  }
  handleClick(event) {
    console.log('this is:', event);
    alert('Button Clicked!');
  }
  handleButtonClick = () => {
    alert('Button Clicked!');
  }

  render() {
    const { data } = this.props;
    console.log(data)
    const edit = ["edit"]
    const val = data.concat(edit)
    console.log(val)
    let columns = []
    let columnss = []
    if ((data !== null || data !== undefined) && data.length > 0) {
      columnss = Object.keys(data[0])
      columns = columnss.concat(edit)

    }
    console.log(columns)
    return (
      <div>
        <Table
          dataSource={data}
          style={{ backgroundColor: "#131633" }}
          onSelect={(e) => this.handleClick}
        >
          {

            columns && columns.length > 0 ?
              columns.map((col) => {
                return <Column title={col} key={col} dataIndex={col}
                />
              }) : []
          }
          {/* {
            this.props.editable ?
              <Column
                title="Edit"
                key="edit"
                style={{ fontSize: '20px' }}
                render={() => (
                  <Space size="middle">
                    <EditOutlined style={{ fontSize: '18px' }} onClick={this.handleButtonClick} />
                  </Space>
                )}
              /> : []
          } */}
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
)(TableComponent)

export default tablePage;
