import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useSelector, useDispatch } from 'react-redux'
import apicalls from '../apicalls/apicalls'
import Task from '../components/Task'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { useHistory } from 'react-router-dom'
import AddTask from '../components/AddTask'


function Tasks() {
    const state = useSelector(state => state)
    const { user } = state
    const { tasks } = state
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        apicalls.getUserTaks()
            .then(res => {
                dispatch({ type: "LOAD_TASKS", tasks: res.data || [] })
            })
            .catch()
    }, [])

    useEffect(() => {
        if (!user.email) {
            history.push(`/login`)
        }
    }, [])

    return (
        <div>
            <div><Header></Header></div>
            <div>
                <AddTask></AddTask>
            </div>
            <div className="m-auto">
                <Card className="text-center">
                    <Card.Header><h5>Manage your TODO's</h5></Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <ListGroup>
                                {
                                    tasks && tasks.length > 0 ?
                                        tasks.map((task) => {
                                            return <Task key={task._id} task={task}></Task>
                                        }) : "NO Tasks Available"
                                }
                            </ListGroup>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default Tasks
