import React,{Component} from 'react'
import { Table } from "react-bootstrap";

// const testdatas = [

//   { SNo: "1", Name: "Stage 1 Temprature", Unit: "Degree C", Value: "50", Edit: "-" },
//   { SNo: "2", Name: "Stage 2 Temprature", Unit: "Degree C", Value: "100", Edit: "-" },
//   { SNo: "3", Name: "Stage 3 Temprature", Unit: "Degree C", Value: "50", Edit: "-" },
//   { SNo: "4", Name: "Stage 4 Temprature", Unit: "Degree C", Value: "150", Edit: "-" }
// ]


export class TableElement extends Component {
  constructor(props){
    super(props)
    
  }
  render() {
    const{currentStatus ,T1, T2, T9,M1}=this.props
    return (
      <div>
        <Table striped bordered hover variant="dark">
          <thead style={{ color: "rgb(151, 150, 151)", backgroundColor: "rgb(19, 23, 50)" }}>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Unit</th>
              <th>value</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody style={{ color: "rgb(151, 150, 151)" }}>
            <tr  >
              <td>{currentStatus}</td>
              <td>{T1}</td>
              <td>{T2}</td>
              <td>{T9}</td>
              <td>{M1}</td>
            </tr>
        </tbody>
        </Table>
      </div>
    )
  }
}

export default TableElement;

