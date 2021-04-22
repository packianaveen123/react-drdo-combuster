import React, { Component } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Table, Space, Input, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import { updateConfigData } from '../../../Services/requests'
import {
  updateTurboConfig,
  updateTestConfig,
  updateParamConfig
} from '../../../Redux/action'
const { Map } = require('immutable');
const { Column } = Table;

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentData: [],
      data: [],
      EditMode: false,
      editRowIndex: null,
      editData: [],
      editCancel: false
    }
    this.updateInputValue = this.updateInputValue.bind(this);
  }


  handleButtonClick = (index) => {
    this.setState({
      EditMode: true,
      editRowIndex: index
    })
  }

  updateInputValue = (event, colName) => {
    const { editData: newEditData } = this.state
    newEditData[colName] = event.target.value
    this.setState({ editData: newEditData })
    console.log(colName)
    console.log(this.state.editData)
    Object.assign({}, this.state.editData)
  }

  cancelEditMode = () => {
    this.setState({
      EditMode: false,
      editCancel: true
    })
  }

  updateData = () => {
    const configDataValue = {
      page: this.props.childrenColumnName,
      editData: Object.assign({}, this.state.editData),
      editRowIndex: this.state.editRowIndex
    }
    updateConfigData(configDataValue, (data) => {
      console.log(data)
    })
  }

  static getDerivedStateFromProps(props, state) {
    return {
      currentData: props.data,
      data: props.data
    };
  }
  render() {
    const appData = this.props.app;
    const { data: tableData, EditMode, editCancel } = this.state;
    const { editableColumn } = this.props;
    const editRowIndex = this.state.editRowIndex;

    tableData.forEach((it, index) => {
      it['Edit'] = <Space size="middle">
        <EditOutlined
          style={{ fontSize: '18px' }}
          onClick={() => this.handleButtonClick(index)}
          disabled={!index} />
      </Space>
    })
    if (editCancel && !EditMode) {
      tableData.forEach((item, index) => {
        if (index === editRowIndex) {
          Object.keys(item).map(it => {
            if (it != 'Edit') {
              editableColumn.map(colName => {
                if (it === colName) {
                  item[it] = item[it].props.defaultValue
                }
              })
            }
          })
        }
      })
    }
    if (EditMode) {
      tableData.forEach((item, currentIndex) => {
        if (currentIndex === editRowIndex) {
          Object
            .keys(item)
            .map((it) => {
              if (it === 'Edit') {
                item[it] =
                  <span>
                    <a onClick={() => this.updateData('save')} style={{ marginRight: 8 }}>
                      Save
                    </a>
                    <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancelEditMode()}>
                      <a>Cancel</a>
                    </Popconfirm>
                  </span>
              }
              else {
                editableColumn.map(colName => {
                  if (it === colName)
                    item[it] =
                      <Input
                        style={{ width: '200px' }}
                        defaultValue={item[it]}
                        value={this.state.it}
                        onChange={(e) => this.updateInputValue(e, colName)}
                      ></Input>
                })
              }
            })
        }
      })
    }
    let columns = []
    if ((tableData !== null || tableData !== undefined) && tableData.length > 0) {
      columns = Object.keys(tableData[0])
    }
    return (
      <div>
        <Table
          dataSource={tableData}
          style={{ backgroundColor: "#131633" }}
        >
          {
            columns && columns.length > 0 ?
              columns.map((col) => {
                return <Column title={col} key={col} dataIndex={col}
                />
              }) : []
          }
        </Table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  app: state.app
})
const mapDispatchToProps = {
  updateTurboConfig,
  updateTestConfig,
  updateParamConfig
}

const tablePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableComponent)

export default tablePage;
