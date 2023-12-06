import React, {useState, useEffect} from 'react';
//import { Button } from 'bootstrap'; // Import Bootstrap Button component
//import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import axios from 'axios';
import Navigation from './navigation.js'
import {Link} from 'react-router-dom'


export default function NoteScreen() {

  const [auth,setAuth] = useState(false);
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  //const [userId, setUserId] = useState('')
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:8080/home')
    .then(res => {
        if(res.data.Status === "Success"){
            setAuth(true)
            setName(res.data.name)
        } else{
            setAuth(false)
            setMessage(res.data.Error)
        }
    })
    .then(err => console.log(err));
}, [])


    async function addNote() {
      //const title = document.getElementById("Notes_title").value;
      const content = document.getElementById("userInput").value;

      const newNote = {
        content: content,
        name: name,
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
        <div>
          {
            auth ?
            <div>
                <h3>{name}, here are your notes: </h3>
            </div>
            :
            <div>
                <h3>{message}</h3>
                <h3>Login Now</h3>
                <Link to="/login" className='btn btn-primary' >Login</Link>
            </div>
          }
        </div>
        <div className="flex-c-row for-sticky-notes">
          <div className="flex-c-col">
            <div className="notes">
              
              <textarea placeholder="Write Here..." id="userInput"></textarea>
              <button onClick={addNote}>Add Note</button>
            </div>
            <button>Update</button>  
            
          </div> 
        </div>
        <div>
          
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

