import React from 'react';

import axios from 'axios';
import TableElement from './TableElement';
export default class PersonList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: []
  // state = {
  //   persons: []
  }
  }
  componentDidMount() {
    axios.get(`http://192.168.0.167/orc/index.php`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

  render() {
    return (
      //const { users, isLoading, isError } = this.state
      <div>
        { this.state.persons.map(person => 
       // datatime: {person.datatime}
      
       <TableElement
       currentStatus={person.currentStatus}
       T1={person.T1}
       T2={person.T2}
       T9={person.T9}
       M1={person.M1} 
            />       
        )}
      </div>
    )
  }
}



