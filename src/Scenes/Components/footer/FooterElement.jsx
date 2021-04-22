import React, { Component } from 'react'

export default class FooterElement extends Component {
  render() {
    return (
      <footer
        class="ant-layout-footer"
      >
        <div style={{ color: 'white', marginLeft: '30%' }}>
          &copy; 2021<a href='http://www.v-enertek.com/' target='_blank'>VAIGUNTH ENER TEK (P) LTD.</a> ALL RIGHTS RESERVED.
        </div>
      </footer>
    )
  }
}

