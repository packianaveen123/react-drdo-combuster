import React, {useEffect , useState} from 'react';
import axios from 'axios';
import NoteTimeline from './NoteTimeline';
export default function Parent (){
  const [categories, getNotes] = useState('');

  const url= 'http://tutofox.com/foodapp/api.json';
  useEffect( () => {
    getAllNotes();

  }, []);
  
  const getAllNotes =  () => 
  {
    axios.get('${url}past')
    .then ((response) => {
      const allNotes = response.data.notes.allNotes;
      getNotes(allNotes);

    })
    .catch(error => console.error('Error: ${error}'));

  }
return(
  <NoteTimeline categories={categories}/>
)
};