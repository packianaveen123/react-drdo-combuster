import React, { Component } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Table, Space, Input, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';

const { Column } = Table;

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      EditMode: false,
      editRowIndex: null,
      editData: []
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
  }

  update = () => {

  }
  updateData = () => {
    axios.post('http://192.168.0.167:5000/testconfigedit.php',
      { page: this.props.childrenColumnName })
      .then(res => {
        console.log(res.data)
      }).catch(err => {
        console.log(err.res)
      })
  }

  static getDerivedStateFromProps(props, state) {
    return {
      data: props.data
    };
  }
  render() {
    const appData = this.props.app;
    const { data, EditMode } = this.state;
    const { editableColumn } = this.props;
    const editRowIndex = this.state.editRowIndex;

    console.log(editRowIndex)
    data.forEach((it, index) => {
      it['Edit'] = <Space size="middle">
        <EditOutlined style={{ fontSize: '18px' }} onClick={() => this.handleButtonClick(index)} />
      </Space>
    })
    if (EditMode) {
      data.forEach((item, currentIndex) => {
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
                    <Popconfirm title="Sure to cancel?" onConfirm={() => this.update('cancel')}>
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
    if ((data !== null || data !== undefined) && data.length > 0) {
      columns = Object.keys(data[0])
    }
    return (
      <div>
        <Table
          dataSource={data}
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
const mapDispatchToProps = {}

const tablePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableComponent)

export default tablePage;
