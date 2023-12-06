import React from 'react';
import axios from 'axios';
import Navigation from './navigation.js'


export default function ToDoListScreen() {

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
            window.location.reload();

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
                done: false,
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
        </div>
    )
}