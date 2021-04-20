import React, { Component } from 'react';
import StatusBlock from '../../Components/TestPageComponent/StatusBlock';
import { Table, Tag, Space, Row, Button } from 'antd';
import axios from 'axios';
import { updateTitleElements } from '../../../Redux/action'
import { connect } from 'react-redux';
import { updateTableData } from '../../../Redux/action';
var today = new Date(),
  time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
const columns = [
  {
    title: 'Param',
    dataIndex: 'Paramname',
    key: 'Paramname',
  },
  {
    title: 'lowerlimit',
    dataIndex: 'lowerlimit',
    key: 'lowerlimit',
  },
  {
    title: 'normallimit',
    dataIndex: 'normallimit',
    key: 'normallimit',
  },
  {
    title: 'unit_id',
    dataIndex: 'unit_id',
    key: 'unit_id',
  },
  {
    title: 'upperlimit',
    dataIndex: 'upperlimit',
    key: 'upperlimit',
  },
  {
    title: 'Live Value',
    dataIndex: 'liveData',
    key: '',
  }
];
const columns1 = [
  {
    title: 'name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'testcommandsTime',
    dataIndex: 'testcommandsTime',
    key: 'testcommandsTime',
  },
];
const x = 1;
const self = this;
class TableView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabledata: [],
      alldata: []
    }
  }
  componentDidMount() {
    this.props.updateTitleElements({
      title: 'Table View',
      type: 'Dashboard',
    })
  }
  testClick() {
    const liveDataObj = this.props.app.chartData[0]
    console.log('liveData: ', liveDataObj)
    axios.get('http://192.168.0.167:5000/tableview.php').then(res => {
      const data = res.data;
      data.map(item => {
        const key = item['paramindex']
        Object.keys(liveDataObj).map(it => {
          if (it === key) {
            item['liveData'] = liveDataObj[it]
          }
        })
      })
      this.setState({
        tabledata: data
      })
      console.log(data)
    }).catch(err => {
      console.log(err);
    })
  }
  interval = setInterval(() => { this.testClick() }, 1000)
  render() {
    let a = this.props.turboStart
    console.log(this.props.app.turboStart[0])
    return (
      <div>
        <StatusBlock />
        <div>
          <Table style={{ marginTop: '50px', minWidth: '900px', float: 'left' }} pagination={false} columns={columns} dataSource={this.state.tabledata} />
          <Table style={{ marginTop: '50px', minWidth: '400px', float: 'right', marginTop: '-350px' }} pagination={false} columns={columns1} dataSource={this.props.app.turboStart} />
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  app: state.app
})
const mapDispatchToProps = {
  updateTableData,
  updateTitleElements
}
const Tabledata = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableView)
export default Tabledata;