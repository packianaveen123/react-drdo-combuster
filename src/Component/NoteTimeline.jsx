import react from 'react';

export default function NoteTimeline(props) {
  const displayNotes= (props) =>{
  const {  notes } = props;

  if (notes.length > 0) {
    return (
      notes.map((note, index) => {
        console.log(note);
        return (
          <div key={note._id}>
            <p>{note.currentStatus}</p>
            <p>{note.T1}</p>
            <p>{note.T1}</p>
          </div>
        )
      })
    )
  } 
  else{
    return(<h3>no notes</h3>)
  }
}
return(
  <>
  {displayNotes(props)}
  </>
)
}