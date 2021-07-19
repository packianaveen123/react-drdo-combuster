import React, { Component } from "react";
import { connect } from "react-redux";
import {
  updateTurboConfig,
  updateTitleElements,
  updateTableStatusData,
} from "../../../Redux/action";
import {
  turbineConfigSubmit,
  requestStatusData,
} from "../../../Services/requests";
import { turboConfigValue } from "../../../Services/constants";
import {
  Col, Row,
  Layout, Input,
  Button, Tooltip,
  InputNumber, DatePicker,
  Form, message, notification,
} from "antd";
import TableElement from "../../Components/subComponents/TableElement";
import moment from "moment";
import "moment/locale/zh-cn";

const {
  nozzleArea_min,
  nozzleArea_max,
  nozzleArea_step,
  nozzleArea_defalutValue,
  blade_defalutValue,
  blade_min,
  blade_max,
  error_turbo_msg,
  added_turbo_msg,
  message_title,
  description_data
} = turboConfigValue;
const key = "updatable";
class TurboConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turboID: "",
      dateVal: "",
      nozzleArea: nozzleArea_defalutValue,
      discriptionVal: null,
      bladeVal: blade_defalutValue,
      turbineStatus: false,
    };
    this.updateDate = this.updateDate.bind(this);
    this.updateBlades = this.updateBlades.bind(this);
  }

  openNotification = (value) => {
    setTimeout(() => {
      notification.open({
        key,
        message: message_title,
        description:
          description_data,
        value,
      });
    }, 1000);
  };

  componentDidMount() {
    let data = this.props.appData.statusData;
    if (data.length > 2) {
      this.setState({
        turbineStatus: true,
      });
      this.openNotification();
    }

    this.props.updateTitleElements({
      title: "Turbo Config",
      type: "Config",
    });
  }

  onFinish = () => {
    const body = {
      turbo_id: this.state.turboID,
      date: this.state.dateVal,
      nozzle_area: this.state.nozzleArea,
      descriptions: this.state.discriptionVal,
      noofblades: this.state.bladeVal,
    };
    message.success(added_turbo_msg);
    turbineConfigSubmit(body, (data) => {
      this.props.updateTurboConfig(data);
    });
    requestStatusData((data) => {
      this.props.updateTableStatusData(data);
    });
  };

  onchangeTurboID = (e) => {
    this.setState({
      turboID: e.target.value,
    });
  };

  updateDate = (date, dateString) => {
    this.setState({
      dateVal: dateString,
    });
  };

  handleNumber = (value) => {
    this.setState({
      nozzleArea: value,
    });
  };
  updateDiscription = (e) => {
    this.setState({
      discriptionVal: e.target.value,
    });
  };
  updateBlades = (value) => {
    if (value === null) {
      this.setState({
        bladeVal: blade_defalutValue,
      });
    } else {
      this.setState({
        bladeVal: value,
      });
    }
  };

  render() {
    const { appData } = this.props;
    const { turboConfig } = appData;

    if (this.state.turbineStatus) {
      this.openNotification("bottomRight");
    }
    return (
      <div>
        <Layout class="layout-container">
          <h2 class="h2">Turbo Configuration</h2>
          <Form
            onFinish={() => {
              const isDuplicateId = turboConfig
                .map((it) => it.turboname)
                .includes(this.state.turboID);
              {
                isDuplicateId
                  ? message.warning(error_turbo_msg)
                  : this.onFinish();
              }
            }}
          >
            <Row style={{ paddingTop: "20px" }}>
              <Col sm={2}>
                <label class="label">
                  Turbo ID<i style={{ color: "red", fontSize: "15px" }}> *</i>
                </label>
              </Col>
              <Col sm={6}>
                <Form.Item name="Turbo ID" rules={[{ required: true }]}>
                  <div>
                    <Input
                      name="turbo_id"
                      style={{ width: "320px" }}
                      placeholder="Turbo ID"
                      defaultValue={this.state.turboID}
                      onChange={this.onchangeTurboID}
                    />
                  </div>
                </Form.Item>
              </Col>
              <Col sm={3}>
                <label htmlFor="name" class="label">
                  Installed Date
                  <i style={{ color: "red", fontSize: "15px" }}> *</i>
                </label>
              </Col>
              <Col sm={5}>
                <Form.Item name="Date " rules={[{ required: true }]}>
                  <DatePicker
                    name="date"
                    disabledDate={(current) => {
                      return current && current > moment(Date.now());
                    }}
                    style={{ backgroundColor: "#131633" }}
                    onChange={this.updateDate}
                  />
                </Form.Item>
              </Col>
              <Col sm={2}>
                <label class="label">
                  Nozzle Area
                  <i style={{ color: "red", fontSize: "15px" }}> *</i>
                </label>
              </Col>
              <Col sm={6}>
                <div>
                  <Tooltip
                    placement="bottom"
                    title="Range 0.0002 to 0.0005 m2"
                    style={{ backgroundColor: "pink" }}
                  >
                    <div>
                      <InputNumber
                        style={{ width: "320px" }}
                        min={nozzleArea_min}
                        max={nozzleArea_max}
                        step={nozzleArea_step}
                        defaultValue={nozzleArea_defalutValue}
                        value={this.state.nozzleArea || nozzleArea_defalutValue}
                        onChange={this.handleNumber}
                        stringMode
                      />
                    </div>
                  </Tooltip>
                </div>
              </Col>
            </Row>
            <Row style={{ marginTop: "5px" }}>
              <Col sm={2}>
                <label class="label">
                  Description{" "}
                  <i style={{ color: "red", fontSize: "15px" }}> </i>
                </label>
              </Col>
              <Col sm={14}>
                <Tooltip placement="bottomLeft" title="Allowed 200 words only">
                  <Input
                    name="description"
                    style={{ height: "100px", width: "760px" }}
                    placeholder="Description..."
                    maxLength="200"
                    onChange={this.updateDiscription}
                  />
                </Tooltip>
              </Col>

              <Col sm={2}>
                <label class="label">
                  No of Blades
                  <i style={{ color: "red", fontSize: "15px" }}> *</i>
                </label>
              </Col>
              <Col sm={3}>
                <Form.Item
                  name="No of Blades "
                >
                  <InputNumber
                    min={blade_min}
                    max={blade_max}
                    defaultValue={blade_defalutValue}
                    step={1}
                    precision={0}
                    required
                    style={{ width: "320px" }}
                    onChange={this.updateBlades}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row sm={6} style={{ paddingTop: "25px", marginLeft: "93%" }}>
              <Col xs={4}>
                <Form.Item>
                  <div>
                    <Button htmlType="submit"> Save</Button>
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Layout>

        <div style={{ paddingTop: "25px" }}>
          <Layout class="bottom-container">
            <Row>
              <Col span={8}>
                <h2 class="h2">Turbo Configuration</h2>
              </Col>
            </Row>
            {turboConfig ? (
              <TableElement
                data={turboConfig}
                editable={true}
                editableColumn={[
                  {
                    editFeild: "description",
                    inputType: "input",
                  },
                  {
                    editFeild: "status",
                    inputType: "select",
                  },
                ]}
                childrenColumnName={"turboconfig"}
                configIdKeyValue={"turboconfig_id"}
              />
            ) : (
              []
            )}
          </Layout>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  appData: state.app,
});

const mapDispatchToProps = {
  updateTurboConfig,
  updateTitleElements,
  updateTableStatusData,
};

const TurboContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TurboConfig);
export default TurboContainer;
