import React from "react";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import { Col, Row, Button, Form, Transfer, message } from "antd";
import {
  updateTransferElement,
  updateDashboardData,
} from "../../../Redux/action";
import TurboConfig from "../../Pages/ConfigurationPage/TurboConfig";
import { dashboardDataMessage } from "../../../Services/constants";
const { transfer_warning, transfer_success } = dashboardDataMessage;
class TransferElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mockData: [],
      targetKeys: [],
      dashboardData: [
        { key: "1", Name: "Combustor Outlet Temperature ", chosen: true },
        { key: "2", Name: " Turbine Inlet Temperature ", chosen: true },
        { key: "3", Name: "Turbine Outlet Temperature ", chosen: true },
        { key: "4", Name: "Compressor Inlet Temperature ", chosen: true },
        { key: "5", Name: "Compressor Outlet Temperature", chosen: true },
        { key: "6", Name: "Ambient Temperature", chosen: true },
        { key: "7", Name: "Combustor Inlet Pressure", chosen: false },
        { key: "8", Name: "Fuel Line Pressure  ", chosen: false },
        { key: "9", Name: "Turbine Inlet Pressure", chosen: false },
        { key: "10", Name: "Ambient Pressure  ", chosen: false },
        { key: "11", Name: " Compressor Inlet Pressure", chosen: false },
        { key: "12", Name: "Compressor Outlet Pressure ", chosen: false },
        {
          key: "13",
          Name: "Ventury meter differential pressure",
          chosen: false,
        },
        { key: "14", Name: "Fuel Flow Rate  ", chosen: false },
        { key: "15", Name: "Rpm sensor  ", chosen: false },
      ],
    };
  }
  componentDidMount() {
    this.getMock();
  }

  getMock = () => {
    const targetKeys = [];
    const mockData = [];
    console.log(this.state.dashboardData);
    for (let i = 0; i < this.state.dashboardData.length; i++) {
      const data = {
        key: this.state.dashboardData[i].key,
        title: this.state.dashboardData[i].Name,
        chosen: this.state.dashboardData[i].chosen,
      };

      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
      // console.log(data);
    }
    this.setState({ mockData, targetKeys });
    this.props.updateTransferElement(this.state.mockData);
    this.props.updateDashboardData(this.state.targetKeys);
    console.log(this.state.mockData);
  };

  handleChange = (targetKeys, direction, moveKeys) => {
    console.log(targetKeys, direction, moveKeys);
    const transValue = this.props.app.dashboardData.filter((it) =>
      moveKeys.find((val) => val === it.key)
    );
    // console.log(transValue);
    // console.log(transValue[0].chosen);
    // this.props.app.dashboardData.map((it) => {
    //   if (transValue) {
    //     this.props.updateDashboardData();
    //   }
    // });
    // if (transValue) {
    //   this.props.updateDashboardData(transValue[0].chosen);
    //   console.log(this.props.app.dashboardData);
    // }

    if (targetKeys.length > 6) {
      message.warning("select only 6 data");
    } else {
      this.setState({
        targetKeys,
      });
      this.props.updateDashboardData(this.state.targetKeys);
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
      // this.props.updateDashboardData(this.state.mockData);
      //     console.log(this.props.app.dashboardData);
    }
  };

  renderItem = (item) => {
    const customLabel = <span className="custom-item">{item.title}</span>;

    return {
      label: customLabel, // for displayed item
      value: item.title, // for title and filter matching
    };
  };

  render() {
    console.log(this.state.mockData);
    return (
      <div>
        <Form>
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
      </div>
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

const transferPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransferElement);

export default transferPage;
