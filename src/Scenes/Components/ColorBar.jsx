import React, { Component } from 'react'
import { Col, Row } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateColorBar } from '../../Redux/action';
class ColorBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: []
    };
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  componentDidMount() {
    this.getMock();
  }
  handleColorChange(status, e) {
    console.log('CHANGE', status, e)
    const colorChange = {
      'key': status,
      'value': e.target.value
    }
    this.props.updateColorBar(colorChange);
  }

  handleInputChangeNC(e) {
    console.log('CHANGE')
    this.setState({
      normalcolor: e.target.value
    })
    console.log(this.state.normalcolor)
  }
  handleInputChangeUC(e) {
    console.log('CHANGE')
    this.setState({
      uppercolor: e.target.value
    })
    console.log(this.state.uppercolor)
  }
  getMock = () => {
    axios.get('http://localhost/TVS/dashboard_color.php')
      .then(res => {
        let ColorData = res.data[0];
        this.props.updateColorBar(ColorData);
        console.log(ColorData)
        this.setState({
          colors: ColorData
        })

      }).catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <div>
        <Row style={{ paddingTop: "50px" }}>
          <Col span="8">
            <Row>
              <Col span="6">
                <label class="label">LowerColor</label>
              </Col>

              <Col span="6">
                <input type="color"
                  ng-model="LowerColor"
                  class="form-control"
                  placeholder="Symbol"
                  onChange={(innerHTML) => this.handleColorChange('low', innerHTML)}
                  style={{
                    width: "20rem",
                    height: "30px",
                    backgroundColor: "#131633",
                    borderColor: "1 px solid #3e434d"
                  }} />

              </Col>
            </Row>
          </Col>

          <Col span="8">
            <Row>
              <Col span="6">
                <label class="label" >NormalColor</label>
              </Col>

              <Col span="6">
                <input type="color"
                  ng-model="LowerColor"
                  class="form-control"
                  placeholder="Symbol"
                  onChange={(innerHTML) => this.handleColorChange('normal', innerHTML)}
                  style={{
                    width: "20rem",
                    height: "30px",
                    backgroundColor: "#131633",
                    borderColor: "1 px solid gray"
                  }} />

              </Col>
            </Row>
          </Col>

          <Col span="8">
            <Row>
              <Col span="6">
                <label class="label" >UpperColor</label>
              </Col>

              <Col span="6">
                <input type="color"
                  ng-model="LowerColor"
                  class="form-control"
                  placeholder="Symbol"
                  onChange={(innerHTML) => this.handleColorChange('up', innerHTML)}
                  style={{
                    width: "20rem",
                    height: "30px",
                    backgroundColor: "#131633",
                    borderColor: "1 px solid gray"
                  }} />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  app: state.app
})

const mapDispatchToProps = {
  updateColorBar
}

const colorbox = connect(
  mapStateToProps,
  mapDispatchToProps
)(ColorBar)
export default colorbox;