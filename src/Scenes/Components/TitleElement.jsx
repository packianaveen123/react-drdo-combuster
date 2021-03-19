import React, { Component } from 'react'
import { Row, Layout } from 'antd';
import { connect } from 'react-redux';

class TitleElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleValue: ''
    }
  }
  render() {
    const titleValue = this.props.app.titleElements;
    console.log(titleValue);
    return (
      <div>
        {/* {titleValue.filter(it => (
          it.name === this.props.titleValue
        )
        )} */}
        <Layout style={{ backgroundColor: "#212840", paddingBottom: "20px", paddingTop: '10px' }}>
          <Row>
            <text style={{ color: '#42dad6', fontSize: "25px" }}>EnerTek </text>
            <text style={{ color: '#585a5f', fontSize: "25px" }}>  / config/ testConfig  </text>
          </Row>
        </Layout>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  app: state.app
})

const mapDispatchToProps = {}

const Title = connect(
  mapStateToProps,
  mapDispatchToProps
)(TitleElement)
export default Title;

