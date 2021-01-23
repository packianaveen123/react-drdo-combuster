import React from "react";
import { Form, Col, Row,} from 'react-bootstrap';

// import '../App.css';

export class InputText extends React.Component {
  state = {
    name: "",
  };

  // handleChange = event => {
  //   const target = event.target;
  //   const value = target.type === "checkbox" ? target.checked : target.value;
  //   const name = target.name;
  //   this.setState({
  //     [name]: value
  //   });
  // };
  // handleSubmit = event => {
  //   event.preventDefault();
  //   alert(JSON.stringify(this.state, null, 2));
  // };

  render() {
    return (
      <div>
        <Form.Row onSubmit={this.handleSubmit}>
          {/* <Row> */}
          <Col sm={2}>
            <label htmlFor="name" style={{ color: 'rgb(151, 150, 151)' }}>Name<i style={{ color: 'red', fontSize: '15px' }}> *</i></label>
            <span> &nbsp; &nbsp; &nbsp;</span>
          </Col>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            {/* <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            /> */}
          </Col>
          {/* </Row> */}
        </Form.Row>
      </div>
    );
  }
}

export default InputText