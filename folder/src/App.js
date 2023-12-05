import React from 'react'
import NotesScreen from './notes.js'
import ToDoListScreen from './todolist.js'
import Login from './login.js'
import Signup from './signup.js'
import Home from './home.js'
import Welcome from './welcome.js'
import Profile from './profile.js'
import Calender from './calender.js'
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';

function App(){
  return(
    <Router>
    <Routes>
      <Route path='/' element={<Welcome />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/notes" element={<NotesScreen />}></Route>
      <Route path="/todolist" element={<ToDoListScreen />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/calender" element={<Calender />}></Route>
    </Routes>
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

/*
<Router>
        <div>
          <Navigation />
          <Routes>
            {/* Define the route for the NotesScreen component */
            /*<Route path="/notes" element={<NotesScreen />} />
              

            {/* Define the route for the NotesScreen component */
            /*<Route path="/todolist" element={<ToDoListScreen />} />

          </Routes>
        </div>
      </Router>*/