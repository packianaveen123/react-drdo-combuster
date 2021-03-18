import React from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import { Col, Row, Button, Form, Transfer } from 'antd';
import { updateTransferElement } from '../../Redux/action';
import TurboConfig from '../Pages/ConfigurationPage/TurboConfig';
class TransferElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mockData: [],
      targetKeys: [],
      dashboardData: [{ "key": "1", "Name": "Combustor Outlet Temperature 1", "chosen": true },
      { "key": "2", "Name": "Turbo Chrager Outlet Temperature 1", "chosen": true },
      { "key": "3", "Name": "Cumbustor Inlet pressure 1", "chosen": true },
      { "key": "4", "Name": "RPM Combustor 1", "chosen": true },
      { "key": "5", "Name": "RPM Combustor 2", "chosen": true },
      { "key": "6", "Name": "Combustor Outlet Temperature 2", "chosen": true },
      { "key": "7", "Name": "Turbo Chrager Outlet Temperature 2", "chosen": false },
      { "key": "8", "Name": "Cumbustor Inlet pressure 2", "chosen": false },
      { "key": "9", "Name": "Gas Inlet pressure", "chosen": false }
      ]
    }
  }

  componentDidMount() {
    this.getMock();
  }

  getMock = () => {
    const targetKeys = [];
    const mockData = [];
    console.log(this.props.app)
    let { dashboardData } = this.props.app.dashboardData

    for (let i = 0; i < this.state.dashboardData.length; i++) {
      const data = {
        key: this.state.dashboardData[i].key,
        title: this.state.dashboardData[i].Name,
        chosen: this.state.dashboardData[i].chosen,
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
    if (targetKeys.length > 6) {
      alert("select only 6 data")
    }
    else {
      this.setState({ targetKeys });
      console.log(this.state.dashboardData)
    }
  };
  clearChosen = () => {
    this.getMock()
  }
  submitClick = () => {
    this.props.updateTransferElement(TurboConfig)
  }
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

          <Row style={{ paddingTop: '25px', paddingLeft: "40%", paddingBottom: '30px' }}>
            <Col xs={3}>
              <Form.Item>
                <Button htmlType="submit" style={{ width: "82px" }} onClick={() => this.submitClick()}> Submit</Button>
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
