import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import apicalls from '../apicalls/apicalls'
import { useSelector, useDispatch } from 'react-redux'
import Task from './Task'
import { useHistory } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import socketIOClient from "socket.io-client";





function Admin() {

    const [users, setUsers] = useState([])
    const [tasks, setTasks] = useState([])
    const [selectedUser, setSelectedUser] = useState("")
    const history = useHistory();
    const state = useSelector(state => state)
    const { user } = state

    useEffect(() => {
        apicalls.getAllUsers()
            .then(res => {
                if (res.status === 200) {
                    let users = res.data
                    users = users.filter((user) => {
                        return user.role !== "ADMIN"
                    })
                    setUsers(users)
                }
            })
            .catch(console.error)
    }, [])

    useEffect(() => {
        if (!user.email) {
            history.push(`/login`)
        }
    }, [])

    // useEffect(() => {
    //     const socket = socketIOClient("http://localhost:3000/");
    //     socket.on("todoStatus", data => {
    //         setResponse(data);
    //     });
    // }, [])

    const getTasks = (user) => {
        setSelectedUser(user.email)
        setTasks([])
        apicalls.getUserTasksForAdmin(user._id)
            .then(res => {
                if (res.status === 200) {
                    setTasks(res.data)
                }
            })
            .catch(() => {
                setTasks([])
            })
    }

    return (
        <React.Fragment>
            <Header></Header>
            <div className="display-flex-row-even">
                <div className="display-flex-column-even">
                    <div><h5>Available Users</h5></div>
                    {
                        users.map((user) => {
                            return <div>
                                <Button className="m-t-5" variant="outline-primary" key={user._id} type="button" onClick={() => getTasks(user)}>{user.email}</Button>
                            </div>

                        })
                    }
                </div>
                <div>
                    <h5>User Task Details</h5>
                    <div>Selected User : <b>{selectedUser}</b></div>
                    {
                        (tasks && tasks.length > 0) ?
                            tasks.map((task) => {
                                return <Task key={task._id} task={task}></Task>
                            })
                            : "No Tasks Availble"
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default Admin
