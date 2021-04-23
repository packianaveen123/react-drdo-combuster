import React, { Component } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Table, Space, Input, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import {
  updateConfigData, getTurboConfigData, getTestConfigData,
  getParamConfigData
} from '../../../Services/requests';
import {
  updateTurboConfig,
  updateTestConfigPage,
  updateParamConfig,
  updateConfigTableEdit
} from '../../../Redux/action'


const { Map } = require('immutable');
const { Column } = Table;

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      editMode: false,
      editRowIndex: null,
      editData: [],
      editCancel: false
    }
    this.updateInputValue = this.updateInputValue.bind(this);
  }


  handleButtonClick = (index) => {
    this.setState({
      editMode: true,
      editRowIndex: index
    })
  }

  updateInputValue = (event, colName) => {
    const { editData: newEditData } = this.state
    newEditData[colName] = event.target.value
    this.setState({ editData: newEditData })
  }

  canceleditMode = () => {
    let key = this.props.childrenColumnName;
    this.setState({
      editMode: false,
      editRowIndex: null,
      editData: [],
      editCancel: false
    })
    getTurboConfigData((data) => {
      this.props.updateTurboConfig(data)
    })
    getTestConfigData((data) => {
      this.props.updateTestConfigPage(data)
    })
    getParamConfigData((data) => {
      this.props.updateParamConfig(data)
    })
  }

  updateData = () => {
    const configDataValue = {
      page: this.props.childrenColumnName,
      editData: Object.assign({}, this.state.editData),
      editRowIndex: this.state.editRowIndex
    }
    updateConfigData(configDataValue, (data) => {
      if (data) {
        let key = this.props.childrenColumnName;
        this.setState({
          editMode: false,
          editRowIndex: null,
          editData: [],
          editCancel: false
        })
        if (key === 'testparamconfig') {
          this.props.updateTestConfigPage(data)
        }
        else if (key === 'turboconfig') {
          this.props.updateTurboConfig(data)
        }
        else {
          this.props.updateParamConfig(data)
        }
      } else {
        console.log(`500: error data response`)
      }
    })
  }

  static getDerivedStateFromProps(props, state) {
    return {
      data: props.data || []
    };
  }
  render() {
    const appData = this.props.app;
    const { data: tableData, editMode, editCancel } = this.state;
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
    if (editCancel && !editMode) {
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
    if (editMode) {
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
                    <Popconfirm title="Sure to cancel?" onConfirm={this.canceleditMode}>
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
  updateTestConfigPage,
  updateParamConfig,
  updateConfigTableEdit
}

const tablePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableComponent)

export default tablePage;
