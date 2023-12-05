import React from 'react';
//import { Button } from 'bootstrap'; // Import Bootstrap Button component
//import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import axios from 'axios';
import Navigation from './navigation.js'


export default function NoteScreen() {

    async function addNote() {
        //const title = document.getElementById("Notes_title").value;
        const content = document.getElementById("userInput").value;

        const newNote = {
            content: content,
            user_id: 1,
          };

          try {
            await axios.post("http://localhost:8080/notes", newNote);
            //addBookMessage.innerHTML = `<span style='color:green;'>Book added successfully!</span>`;
          } catch {
            //addBookMessage.innerHTML = `<span style='color:red;'>Something went wrong. Try Again.</span>`;
          }
      }
      
      
        

    return (
      <div>
        <Navigation />
        <div className="flex-c-row for-sticky-notes">
          <div className="flex-c-col">
            <div className="notes">
              
                    <textarea placeholder="Write Here..." id="userInput"></textarea>
                    <button onClick={addNote}>Add Note</button>
                  </div>
                
          </div> 
        </div>
      </div>
    );
    
  
}

/*
<div>
        <Navigation />
        
        <div className="notes__sidebar">
          <button className="notes__add btn-primary rounded-3" onClick={addNote} id="addNotesButton">Add Note</button>
          <div className="notes__list" id="theNotes_list">
              
          </div>
        </div>
            
        <div className="notes__preview">
            <input className="notes__title form-control" id="Notes_title" type="text" placeholder="Enter a title..."/>
            <span>
                <button className="saveNoteTitle btn-primary rounded-3" id="saveTitleButton" onClick={addNote} >Save Title</button>
                <button className="saveNote btn-primary rounded-3">Save Note</button>
            </span>
            
            
            <textarea className="notes__body form-control" id="Notes_content" placeholder="I am the notes body..."></textarea> 
        </div>
      </div>
*/

