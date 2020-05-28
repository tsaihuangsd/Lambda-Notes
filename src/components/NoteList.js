import  React from 'react';
import './Note.css';

const NoteList =(props) =>{
    return (
        <div className="notelist-wrapper">                      
            <div className="note-card-container">               
                <h1>Your Notes:</h1>
                {props.noteList.map(note => (
                    <div className="note-card" 
                        key={note.id}
                        onClick={() => props.history.push(`/note/${note.id}`)}>
                        <h2 className="mdhtmlform-html note-title"
                        data-mdhtml-group="0">{note.title}</h2>
                        <hr></hr>
                        <p className="mdhtmlform-html note-textBody"
                        data-mdhtml-group="1">{note.content}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NoteList;