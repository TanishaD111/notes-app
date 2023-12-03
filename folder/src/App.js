import React from 'react'
import Navigation from './navigation.js'
import NotesScreen from './notes.js'
import ToDoListScreen from './todolist.js'
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';

function App(){
  return(
    
    <Router>
      <div>
        <Navigation />
        <Routes>
          {/* Define the route for the NotesScreen component */}
          <Route path="/notes" element={<NotesScreen />} />

          {/* Define the route for the NotesScreen component */}
          <Route path="/todolist" element={<ToDoListScreen />} />

        </Routes>
      </div>
    </Router>
  );
  /*
  const [backendData, setBackendData] = useState([{}])
  useEffect(() => {
    fetch("/notes").then(
      response => response.json()
    ).then(
      data => {
        //console.log(data)
        setBackendData(data)
      }
    ).catch(err => console.log(err));
  }, [])

  return (
    <div style={{padding: "50px"}}>
      {
        (typeof backendData.notes === 'unndefined') ? (
          <p>Loading...</p>
        ) : (
          backendData.notes.map((d,i) =>(
            <p key={i}>{d}</p>
          ))
        )
      }
      
    </div>
  )*/
}

export default App