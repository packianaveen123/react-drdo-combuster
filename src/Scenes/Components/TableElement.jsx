import React, { Component } from 'react'
import { EditOutlined } from '@ant-design/icons';
import { Table, Space, Input, Popconfirm } from 'antd';
import { connect } from 'react-redux';

const { Column } = Table;

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EditMode: false,
      data: [],
      editRowIndex: null,
      inputData: null
    }
    this.updateInputValue = this.updateInputValue.bind(this);
  }

  handleButtonClick = (index) => {
    this.setState({
      EditMode: true,
      editRowIndex: index
    })
  }

  updateInputValue = (event) => {
    console.log(event)
    this.setState
      ({
        inputData: event.target.value
      })
  }

  static getDerivedStateFromProps(props, state) {
    return {
      data: props.data
    };
  }
  render() {
    const { data, EditMode, editRowIndex } = this.state;
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
              item[it] =
                it === 'Edit' ?
                  <span>
                    <a onClick={() => this.updateData('save')} style={{ marginRight: 8 }}>
                      Save
                    </a>
                    <Popconfirm title="Sure to cancel?" onConfirm={() => this.updateData('cancel')}>
                      <a>Cancel</a>
                    </Popconfirm>
                  </span>
                  :
                  <Input
                    style={{ width: '300px' }}
                    defaultValue={item[it]}
                    value={this.state.it}
                    onChange={this.updateInputValue}
                  ></Input>

              console.log(this.state.inputData, editRowIndex)
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
