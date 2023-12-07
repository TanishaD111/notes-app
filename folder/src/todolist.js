import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Navigation from './navigation.js'
import {Link} from 'react-router-dom'

export default function ToDoListScreen() {

    const [auth,setAuth] = useState(false);
    const [message, setMessage] = useState('')
    const [name, setName] = useState('')
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

    const [data, setData] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:8080/todolist?name=${name}`)
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }, [name])


    const inputBox = document.getElementById("input-box");
    const listContainer = document.getElementById("list-container");
    //const addButton = document.getElementById('toDoListAddButton');

    async function removeItem() {
        if(inputBox.value === '') {/* if the input box is empty */
	        alert("You must write something!");
	    } else {
            const cont = inputBox.value;
            const newTodo = {
                description: cont,
                done: true,
            };

            try {
            await axios.post("http://localhost:8080/todolist/remove", newTodo);
            //addBookMessage.innerHTML = `<span style='color:green;'>note added successfully!</span>`;
            } catch (error) {
            console.error("Error removing task:", error);
            //addBookMessage.innerHTML = `<span style='color:red;'>Something went wrong. Try Again.</span>`;
            }
            //window.location.reload();

            try {
            await axios.get("http://localhost:8080/todolist");
            //addBookMessage.innerHTML = `<span style='color:green;'>note added successfully!</span>`;
            
        } catch (error) {
            console.error("Error removing task:", error);
            //addBookMessage.innerHTML = `<span style='color:red;'>Something went wrong. Try Again.</span>`;
            }
        }
    }
    

    async function addItem() {
        if(inputBox.value === '') {/* if the input box is empty */
	        alert("You must write something!");
	    } else {
            console.log(inputBox.innerHTML);
            const cont = inputBox.value;
            const newTodo = {
                description: cont,
                name: name,
            };

            try {
            await axios.post("http://localhost:8080/todolist", newTodo);
            //addBookMessage.innerHTML = `<span style='color:green;'>note added successfully!</span>`;
            } catch (error) {
            console.error("Error adding task:", error);
            //addBookMessage.innerHTML = `<span style='color:red;'>Something went wrong. Try Again.</span>`;
            }

            let li = document.createElement("li");
            let check = document.createElement("input");
            check.setAttribute("class", "form-check-input"); /* part of boostrap */
            check.setAttribute("type", "checkbox");
            li.append(check);
            
            /* adding space b/t checkbox and text */
            let str = "\xa0\xa0";
            li.innerHTML +=(str);
            
            let theLabel = document.createElement("label");
            theLabel.setAttribute("class", "form-check-label");
            theLabel.append(inputBox.value);
            li.append(theLabel);

            listContainer.appendChild(li);
            check.setAttribute("type", "checkbox");
            

            

        }
        inputBox.value = "";


    }
    return (
        <div>
            <Navigation />
            <div>
                {
                    auth ?
                    <div>
                        <h3 class="notesMessage">{name}, here is your to do list: </h3>
                        <div className="flex-c-row for-todo-list justify-content-center">
                <div className="flex-c-col">
                    <div className="todo-app">
                        <h2>To-Do List</h2>
                        <div className="row-of-todo-list">
                            <input type="text" id="input-box" placeholder="Add your text"/>
                            <button className="rounded-2" id="toDoListAddButton" onClick={addItem} >Add</button>
                            <button className="rounded-2" id="toDoListAddButton" onClick={removeItem} >Remove</button>
                        </div>
                        
                        <ul id="list-container" className="form-check">

                            
                        </ul>
                        
                    </div>
                </div>
                
                    
            </div> 
            <p className="LogoutMessage">Past List Items</p>
            <table>
              <thead>
                <tr>
                  <th>List Item</th>
                  <th>Time Created</th>
                </tr>
              </thead>
              <tbody style={{}}>
                {
                  data.map((todolist, index) => (
                    <tr key={index}>
                      <td>{todolist.description}</td>
                      <td>{todolist.created}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
                    </div>
                    :
                    <div>
                        <h3 className="LogoutMessage">{message}</h3>
                        <h3 className="LogoutMessage"> Login Now</h3>
                        <Link to="/login" className='btn btn-primary login' >Login</Link>
                    </div>
                }
            </div>
            
        </div>
    )
}