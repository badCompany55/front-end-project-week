import React from 'react'
import Note from './note.js'

const SelectedNote = props => {
	let theNote = props.notes.find(note => {
		console.log(typeof note._id)
		console.log(typeof props.match.params.id)
		return note._id === props.match.params.id
	})
	console.log(theNote)

	return (
		<div className="singNoteCont">
			<Note
				key={theNote._id}
				id={theNote._id}
				noteName={theNote.title}
				noteContent={theNote.textBody}
				noteDelete={props.delete}
				/>
			</div>
		); 
}

export default SelectedNote
