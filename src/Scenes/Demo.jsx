import React, { Component } from 'react'
import Post from './Pages/Post'

import { Card, Col, Row, Layout, Divider, Input, Select, Alert, Button } from 'antd';
export default class Demo extends Component {
  constructor(props) {
    super(props)
    this.postID = 0;
    this.state = {
      resetTemp: [],
      Body: '',
      id: ''
    }
  }


  setPost = (event) => {
    this.setState({
      Body: event.target.value
    })
  }

  addPost = () => {
    this.postID = this.postID + 1;
    const copyPostArray = Object.assign([], this.state.resetTemp)
    copyPostArray.push({
      id: this.postID,
      body: this.state.Body
    })
    this.setState({
      resetTemp: copyPostArray
    })
  }
  render() {
    return (
      <div>
        <Input
          type="text"
          onBlur={this.setPost}
          style={{ width: "75px" }}
        />
        <Button
          style={{ width: "2px" }}
          // onClick={() => this.ResetonClick()}
          onClick={this.addPost}
        >
          +
                        </Button>



        <ul>
          {
            this.state.resetTemp.map((post, index) => {
              <Post
                key={post.id}
                id={post.id}
                body={post.body}
              />
            })
          }
        </ul>
      </div>
    )
  }
}
