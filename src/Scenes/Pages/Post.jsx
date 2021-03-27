import React, { Component } from 'react'

export default class Post extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props.body)
    return (
      <div>
        <li>
          id = {this.props.id}
          <br></br>
          {this.props.body}
        </li>
      </div>
    )
  }
}
