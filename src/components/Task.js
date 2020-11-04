import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import apicalls from '../apicalls/apicalls'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'



function Task(props) {

    const state = useSelector(state => state)
    const { user } = state
    const { task } = props
    const dispatch = useDispatch();

    const deleteTask = () => {
        apicalls.deleteTask(task._id)
            .then(res => {
                if (res.status === 200) {
                    dispatch({ type: "DELETE_TASK", taskId: task._id })
                }
            })
            .catch(console.error)
    }

    const updateTask = () => {
        apicalls.updateTask(task._id, { completed: true })
            .then(res => {
                if (res.status === 200) {
                    dispatch({ type: "UPDATE_TASK", taskId: task._id })
                }
            })
            .catch(console.error)
    }

    return (
        // <ListGroup.Item>
            <div className="display-flex-row-even">
                <div>
                    {task.description}
                </div>
                {
                    task.completed &&
                    <div>
                        <span className="text-success"><b>Completed</b></span>
                        {user.role === "USER" && <Button variant="outline-danger" type="button" onClick={deleteTask}>Delete</Button>}
                    </div>
                }
                {
                    !task.completed &&
                    <div>
                        <span className="text-warning"><b>Pending</b></span>
                        {user.role === "USER" && <Button variant="outline-warning" type="button" onClick={updateTask}>Finish Task</Button>}
                    </div>
                }
            </div>
        // </ListGroup.Item>
    )
}

export default Task
