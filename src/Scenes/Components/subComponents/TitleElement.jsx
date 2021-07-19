import React, { Component } from 'react'
import { Row, Layout } from 'antd';
import { connect } from 'react-redux';
import { updateTitleElements } from '../../../Redux/action';

class TitleElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleValue: ''
    }
  }
  render() {
    const titleValue = this.props.app.titleElements;

    return (
      <div>
        <Layout style={{ backgroundColor: "#212840", paddingBottom: "20px" }}>
          <Row>
            <text style={{ color: '#42dad6', fontSize: "25px" }}>EnerTek </text>
            <text style={{ color: '#585a5f', fontSize: "25px" }}> / {titleValue.type} /  {titleValue.title}  </text>
          </Row>
        </Layout>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  app: state.app
})

const mapDispatchToProps = {
  updateTitleElements
}

const Title = connect(
  mapStateToProps,
  mapDispatchToProps
)(TitleElement)
export default Title;

