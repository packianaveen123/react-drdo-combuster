import React, { Component } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Table, Space, Input, Popconfirm, Button, Col, Row, Layout, Select, Tooltip } from 'antd';
import { connect } from 'react-redux';
import {
  updateConfigData, getTurboConfigData, getTestConfigData,
  getParamConfigData, requestStatusData
} from '../../../Services/requests';
import {
  updateTurboConfig,
  updateTestConfigPage,
  updateParamConfig,
  updateConfigTableEdit,
  updateTableStatusData
} from '../../../Redux/action';

const { Option } = Select
const { Map } = require('immutable');
const { Column } = Table;
const text = <span>Click Start Edit</span>;
class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: null,
      editMode: false,
      editSession: false,
      editRowIndex: null,
      editData: [],
      editCancel: false,
      col: '',
      turbo_status: [
        { status: 'installed' },
        { status: 'Completed' },
        { status: 'onRepair' }
      ]
    }
    this.updateInputValue = this.updateInputValue.bind(this);
  }

  handleButtonClick = (index) => {
    this.setState({
      editMode: true,
      editRowIndex: index
    })
  }
  startEdit = () => {
    this.setState({
      editSession: true
    })
  }
  updateInputValue = (event, colName) => {
    const { editData: newEditData } = this.state
    newEditData[colName] = event.target.value
    this.setState({ editData: newEditData })
  }
  updateSelectValue = (event, colName) => {
    const { editData: newEditData } = this.state
    newEditData[colName] = event
    this.setState({ editData: newEditData })
  }

  cancelEditMode = () => {
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

  updateData = (value) => {
    const configDataValue = {
      page: this.props.childrenColumnName,
      editData: Object.assign({}, this.state.editData),
      editRowIndex: this.state.editRowIndex,
      turboIdVal: value.turboconfig_id,
      paramIdVal: value.paramconfig_id,
      testIdVal: value.testparamconfig_id
    }

    updateConfigData(configDataValue, (data) => {
      console.log(data)
      if (data) {
        let key = this.props.childrenColumnName;
        this.setState({
          editMode: false,
          editRowIndex: null,
          editData: [],
          editCancel: false
        })
        console.log(key)
        if (key === "testparamconfig") {
          this.props.updateTestConfigPage(data)
        }
        else if (key === 'turboconfig') {
          this.props.updateTurboConfig(data)
        }
        // else if (key === 'paramconfig') {
        //    this.props.updateParamConfig(data)
        // }

      } else {
        console.log(`500: error data response`)
      }
      requestStatusData((data) => {
        this.props.updateTableStatusData(data)
      })
      console.log(data)
    })
  }

  static getDerivedStateFromProps(props, state) {
    return {
      data: props.data || []
    };
  }
  render() {
    const appData = this.props.app;
    const { data: tableData, editMode, editCancel, editSession } = this.state;
    const { editableColumn } = this.props;
    const editRowIndex = this.state.editRowIndex;
    console.log(editMode)
    if (editSession) {
      tableData.forEach((it, index) => {
        console.log(editSession && (index != editRowIndex))
        it['Edit'] = <Space size="middle">
          <Tooltip placement="rightBottom" title={text}>
            <EditOutlined
              style={{
                fontSize: '18px',
                cursor: editRowIndex && index != editRowIndex ? "not-allowed! important" : "pointer"
              }}
              onClick={() => {
                if (editSession && !editRowIndex && editRowIndex !== 0) {
                  this.handleButtonClick(index)
                } else if (index === editRowIndex) {
                  this.handleButtonClick(index)
                }
              }
              }
            /> </Tooltip>
        </Space>
      })
    }
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
                    <a onClick={() => this.updateData(item)} style={{ marginRight: 8 }}>
                      Save
                    </a>
                    <Popconfirm title="Sure to cancel?" onConfirm={this.cancelEditMode}>
                      <a>Cancel</a>
                    </Popconfirm>
                  </span>
              }
              else {
                editableColumn.map(colName => {
                  if (colName.inputType === 'input') {
                    if (it === colName.editFeild)
                      item[it] =
                        <Input
                          style={{ width: '200px' }}
                          defaultValue={item[it]}
                          value={this.state.it}
                          onChange={(e) => this.updateInputValue(e, colName.editFeild)}
                        ></Input>
                  }
                  if (colName.inputType === "select") {
                    if (it === colName.editFeild)
                      item[it] =
                        <Input.Group compact>
                          <Select
                            defaultValue={item[it]}
                            style={{ width: '300px' }}
                            onChange={(e) => this.updateSelectValue(e, colName.editFeild)}
                          >
                            {
                              this.state.turbo_status.map(status => (
                                <Option value={status.status}>
                                  {status.status}
                                </Option>
                              ))
                            }
                          </Select>
                        </Input.Group>
                  }
                })
              }
            })
        }
      })
    }

    let columns = []
    if ((tableData !== null || tableData !== undefined) && tableData.length > 0) {
      columns = Object.keys(tableData[0])
      console.log(tableData)
      console.log(columns)
    }
    return (
      <div>
        <div>
          <Row style={{ float: 'right' }}>
            {
              this.props.childrenColumnName == "testparamconfig" ?
                <Col xs={12}>
                  <Button
                    type="primary"
                    onClick={this.updateData}> Reset</Button>
                </Col>
                : []
            }
            <Col xs={12}>
              {
                this.props.childrenColumnName !== "paramconfig" ?
                  <Button
                    type="primary"
                    style={{ width: '6rem' }}
                    onClick={this.startEdit}
                  >
                    Start Edit
                  </Button>
                  : []
              }
            </Col>
          </Row>
        </div>

        <Table
          dataSource={tableData}
          size='middle'
          style={{ backgroundColor: "#131633", paddingBottom: '10px', marginTop: '10px' }}
        >
          {
            columns && columns.length > 0 ?
              columns.map((col) => {
                if (col != this.props.configIdKeyValue) {
                  return <Column title={col} key={col} dataIndex={col}
                  />
                }
                else {
                  console.log(this.state.col)
                }
              }) : []
          }
        </Table>
      </div >
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
  updateConfigTableEdit,
  updateTableStatusData
}

const tablePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableComponent)

export default tablePage;
