// import React, {useEffect , useState} from 'react';
// import axios from 'axios';
// import NoteTimeline from './NoteTimeline';

// export default function Parent (){
//   const [notes, getNotes] = useState('');

//   const url= 'http://192.168.0.167/orc/index.php';
//   useEffect( () => {
//     getAllNotes();

//   }, []);
  
//   const getAllNotes =  () => 
//   {
//     axios.get('${url}past')
//     .then ((response) => {
//       const allNotes = response.data.notes.allNotes;
//       getNotes(allNotes);

//     })
//     .catch(error => console.error('Error: ${error}'));

//   }
// return(
//   <NoteTimeline notes={notes}/>
// )
// };

import React from 'react';

import axios from 'axios';

export default class PersonList extends React.Component {
  state = {
    persons: []
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
      <ul>
        { this.state.persons.map(person => <li>{person.currentStatus}</li>)}
      </ul>
    )
  }
}