import React, { Component } from 'react'
import { CompanyDetails } from "../../../Services/constants";
const { company_link } = CompanyDetails;

export default class FooterElement extends Component {
  render() {
    return (
      <footer className="ant-layout-footer" >
        <div style={{ color: 'white', marginLeft: '35%' }}>
          &copy; 2021<a href={company_link} target='_blank'>VAIGUNTH ENERTEK (P) LTD.</a> ALL RIGHTS RESERVED.
        </div>
      </footer>
    )
  }
}

