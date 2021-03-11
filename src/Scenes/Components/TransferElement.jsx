import React from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import { updateTransferElement } from '../../Redux/action'
import { Transfer } from 'antd';
import axios from 'axios';
class TransferElement extends React.Component {
  state = {
    mockData: [],
    targetKeys: [],
    dashboardData: [{ "key": "1", "Name": "Combustor Outlet Temperature 1" },
                    { "key": "2", "Name": "Turbo Chrager Outlet Temperature 1" },
                    { "key": "3", "Name": "Cumbustor Inlet pressure 1" },
                    { "key": "4", "Name": "RPM Combustor 1" },
                    { "key": "5", "Name": "RPM Combustor 2" },
                    { "key": "6", "Name": "Combustor Outlet Temperature 2" },
                    { "key": "7", "Name": "Turbo Chrager Outlet Temperature 2" },
                    { "key": "8", "Name": "Cumbustor Inlet pressure 2" },
                    { "key": "9", "Name": "Gas Inlet pressure" }
    ]
  };

  componentDidMount() {
    this.getMock();
  }

  getMock = () => {
    const targetKeys = [];
    const mockData = [];


    for (let i = 0; i < this.state.dashboardData.length; i++) {
      const data = {
        key: this.state.dashboardData[i].key,
        title: this.state.dashboardData[i].Name,
        chosen:false,
        
      };
      console.log(data)
      console.log(Math.random() * 1 > 0)
      if (data.chosen) {

        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({ mockData, targetKeys });
  };

  handleChange = (targetKeys, direction, moveKeys) => {
    console.log(targetKeys.length, direction, moveKeys);
    if (targetKeys.length>6){
      alert("select only 6 data")
    }
    else{
    this.setState({ targetKeys });
    console.log(this.state.dashboardData)
    }
  };

  renderItem = item => {
    const customLabel = (
      <span className="custom-item">
        {item.title}
      </span>
    );

    return {
      label: customLabel, // for displayed item
      value: item.title, // for title and filter matching
    };
  };

  render() {
    return (
      <Transfer
        dataSource={this.state.mockData}
        listStyle={{
          width: 550,
          height: 350,
        }}
        targetKeys={this.state.targetKeys}
        onChange={this.handleChange}
        render={this.renderItem}

      />
    );
    console.log(this.state.targetKeys)
  }
}

const mapStateToProps = state => ({
  app: state.app
})
const mapDispatchToProps = {
  updateTransferElement
}

const transferPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransferElement)

export default transferPage;
