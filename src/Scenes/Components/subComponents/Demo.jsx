import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Col, Row, Button, Form, Transfer, message } from "antd";

import { connect } from "react-redux";
import {
  updateTransferElement,
  updateDashboardData,
} from "../../../Redux/action";
import { dashboardDataMessage } from "../../../Services/constants";

class Demo extends React.Component {
  state = {
    mockData: [],
    targetKeys: [],
    dashboardData: [
      { key: "1", Name: "Combustor Outlet Temperature ", chosen: true },
      { key: "2", Name: " Turbine Inlet Temperature ", chosen: true },
      { key: "3", Name: "Turbine Outlet Temperature ", chosen: true },
      { key: "4", Name: "Compressor Inlet Temperature ", chosen: true },
      { key: "5", Name: "Compressor Outlet Temperature", chosen: true },
      { key: "6", Name: "Ambient Temperature", chosen: false },
      { key: "7", Name: "Combustor Inlet Pressure", chosen: false },
      { key: "8", Name: "Fuel Line Pressure  ", chosen: false },
      // { key: "9", Name: "Turbine Inlet Pressure", chosen: false },
      // { key: "10", Name: "Ambient Pressure  ", chosen: false },
      // { key: "11", Name: " Compressor Inlet Pressure", chosen: false },
      // { key: "12", Name: "Compressor Outlet Pressure ", chosen: false },
      // { key: "13", Name: "Ventury meter differential pressure", chosen: false },
      // { key: "14", Name: "Fuel Flow Rate  ", chosen: false },
      // { key: "15", Name: "Rpm sensor  ", chosen: false },
    ],
  };

  componentDidMount() {
    this.getMock();
  }

  getMock = () => {
    const targetKeys = [];
    const mockData = [];
    console.log(this.state.dashboardData);
    for (let i = 0; i < this.state.dashboardData.length; i++) {
      const data = {
        // key: i.toString(),
        // title: `content${i + 1}`,
        // description: `description of content${i + 1}`,
        // chosen: Math.random() * 2 > 1,
        key: this.state.dashboardData[i].key,
        title: this.state.dashboardData[i].Name,
        chosen: this.state.dashboardData[i].chosen,
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
      // console.log(data);
      this.props.updateDashboardData(this.state.mockData);
    }
    this.setState({ mockData, targetKeys });
    console.log(this.state.mockData);
  };

  handleChange = (targetKeys, direction, moveKeys) => {
    console.log(targetKeys, direction, moveKeys);
    // this.setState({ targetKeys });
    if (targetKeys.length > 6) {
      message.warning("select only 6 data");
    } else {
      this.setState({
        targetKeys,
      });
      console.log(this.state.targetKeys);
    }
  };

  clearChosen = () => {
    this.getMock();
  };
  submitClick = () => {
    if (this.state.targetKeys.length == 6) {
      message.warning("transfer_warning");
    } else {
      console.log(this.state.mockData);

      message.success("transfer_success");
    }
  };
  renderItem = (item) => {
    const customLabel = (
      <span className="custom-item">
        {item.title} - {item.description}
      </span>
    );

    return {
      label: customLabel, // for displayed item
      value: item.title, // for title and filter matching
    };
  };

  render() {
    console.log(this.props.app.dashboardData);
    return (
      <Form>
        <Transfer
          dataSource={this.state.mockData}
          listStyle={{
            width: 300,
            height: 300,
          }}
          targetKeys={this.state.targetKeys}
          onChange={this.handleChange}
          render={this.renderItem}
        />
        <Row
          style={{
            paddingTop: "25px",
            paddingLeft: "40%",
            paddingBottom: "10px",
          }}
        >
          <Col xs={3}>
            <Form.Item>
              <Button
                htmlType="submit"
                style={{ width: "82px" }}
                onClick={() => this.submitClick()}
              >
                {" "}
                Submit
              </Button>
            </Form.Item>
          </Col>
          <Col xs={3}>
            <Form.Item>
              <Button onClick={() => this.clearChosen()}> Reset</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  app: state.app,
});
const mapDispatchToProps = {
  updateTransferElement,
  updateDashboardData,
};

const demoPage = connect(mapStateToProps, mapDispatchToProps)(Demo);

export default demoPage;
