import React from 'react';
import axios from 'axios';
import Navigation from './navigation.js'


export default function ToDoListScreen() {

    const inputBox = document.getElementById("input-box");
    //const listContainer = document.getElementById("list-container");
    //const addButton = document.getElementById('toDoListAddButton');

    async function addItem() {
        if(inputBox.value === '') {/* if the input box is empty */
	        alert("You must write something!")
	    } else {
            const cont = inputBox.value;
            const newTodo = {
                description: cont,
                done: false,
            };

            try {
            await axios.post("http://localhost:8080/todolist", newTodo);
            //addBookMessage.innerHTML = `<span style='color:green;'>note added successfully!</span>`;
            } catch (error) {
            console.error("Error adding task:", error);
            //addBookMessage.innerHTML = `<span style='color:red;'>Something went wrong. Try Again.</span>`;
            }

            

        }
    }
    return (
        <div>
            <Navigation />
            <div className="flex-c-row for-todo-list justify-content-center">
                <div className="flex-c-col">
                    <div className="todo-app">
                        <h2>To-Do List</h2>
                        <div className="row-of-todo-list">
                            <input type="text" id="input-box" placeholder="Add your text"/>
                            <button className="rounded-5" id="toDoListAddButton" onClick={addItem} >Add</button>
                        </div>
                        
                        <ul id="list-container" className="form-check">

                            <li className="checked">Task 1</li>
                            <li>Task 2</li>
                            <li>Task 3</li>
                        </ul>
                        
                    </div>
                </div>
                
                    
            </div> 
        </div>
    )
}