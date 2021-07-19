import React, { Component } from 'react';
import StatusBlock from '../../Components/TestPageComponent/StatusBlock';
import { Table, Row, Col } from 'antd';
import { updateTitleElements } from '../../../Redux/action'
import { connect } from 'react-redux';
import { updateTableData } from '../../../Redux/action';
import { getTableView } from '../../../Services/requests';

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

class TableView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabledata: [],
      alldata: [],
      filteredTableData: []
    }
  }

  componentDidMount() {
    this.props.updateTitleElements({
      title: 'Table View',
      type: 'Dashboard',
    })
  }

  testClick = () => {
    getTableView((data) => {
      const arrStr = this.props.app.targetKeys;
      const dashboardDataNumArr = arrStr.map((i) => Number(i));
      const liveDataObj = this.props.app.chartData[0]
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

      let filteredTableData = this.state.tabledata.filter((_, index) => dashboardDataNumArr.includes(index));
      this.setState({
        filteredTableData: filteredTableData
      })

    })
  }

  interval = setInterval(() => { this.testClick() }, 1000)
  render() {
    return (
      <div>
        <StatusBlock />
        <div>
          <Row>
            <Col >
              <Table
                style={{ marginTop: '50px', minWidth: '700px', float: 'left' }}
                size='middle'
                pagination={false}
                columns={columns}
                dataSource={this.state.filteredTableData} />
            </Col>
            <Col >
              <Table
                size='middle'
                style={{ marginTop: '50px', paddingLeft: '30%', minWidth: '690px', float: 'right', }}
                pagination={false} columns={columns1} dataSource={this.props.app.turboStart} />
            </Col>
          </Row>

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