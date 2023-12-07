import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, {useState, useEffect} from 'react';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import Navigation from './navigation.js';
import {Link} from 'react-router-dom'
import axios from 'axios';

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const events = [
    {
        title: "Big Meeting",
        allDay: true,
        start: new Date(2021, 6, 0),
        end: new Date(2021, 6, 0),
    },
    {
        title: "Vacation",
        start: new Date(2021, 6, 7),
        end: new Date(2021, 6, 10),
    },
    {
        title: "Conference",
        start: new Date(2021, 6, 20),
        end: new Date(2021, 6, 23),
    },
];

export default function Calender() {
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState(events);

    const [startdate, setStart] = useState('')
    const [enddate, setEnd] = useState('')
    const [mytitle, setTitle] = useState('')

    const [name, setName] = useState('')
    const [auth,setAuth] = useState(false);
    const [message, setMessage] = useState('')
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
        axios.get(`http://localhost:8080/calender?name=${name}`)
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }, [name])

    function handleAddEvent() {
        
        setAllEvents([...allEvents, newEvent]);

        setStart(newEvent.start)
        setEnd(newEvent.end)
        setTitle(newEvent.title)

        const newEv = {
            title: mytitle,
            start: startdate,
            end: enddate,
            name: name,
          };
        
          axios.post("http://localhost:8080/calender", newEv);

    }

    const handleDelete = (title) => {
        axios.delete("http://localhost:8080/calender/"+title)
        .then(res => {
          window.location.reload();
        })
        .catch(err => console.log(err));
      }

    return (
        <div>
            <Navigation />
            <div>
                {
                    auth ?
                    <div>
                        <h3>{name}, here is your calender: </h3>
                        <div>
                            <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                            <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                            <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
                            <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>Add Event</button>
                        </div>
                        <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
                        <table>
                        <thead>
                            <tr>
                            <th>Title</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody style={{}}>
                            {
                            data.map((calender, index) => (
                                <tr key={index}>
                                <td>{calender.title}</td>
                                <td>{calender.start}</td>
                                <td>{calender.end}</td>
                                <td>
                                    <button onClick={() => handleDelete(calender.title)}>delete</button>
                                </td>
                                </tr>
                            ))
                            }
                        </tbody>
                        </table>
                    </div>
                    :
                    <div>
                        <h3 className="LogoutMessage">{message}</h3>
                        <h3 className="LogoutMessage">Login Now</h3>
                        <Link to="/login" className='btn btn-primary login' >Login</Link>
                    </div>
                }
            </div>
            
        </div>
    );
}

