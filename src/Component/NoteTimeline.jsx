import react from 'react';

export default function NoteTimeline(props) {
  const displayNotes= (props) =>{
  const {  categories } = props;

  if (categories.length > 0) {
    return (
      categories.map((note, index) => {
        console.log(note);
        return (
          <div key={note._id}>
            <p>{note.name}</p>
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