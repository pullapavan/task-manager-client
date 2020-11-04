import React from 'react'
import { useState } from 'react'
import apicalls from '../apicalls/apicalls'
import { useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button'



function AddTask() {

    const [description, setDescription] = useState("")
    const dispatch = useDispatch();

    const handleChange = (e) => {
        let value = e.target.value ? e.target.value.trim() : ""
        setDescription(value)
    }

    const addTask = () => {
        if (description) {
            apicalls.addTask(description, false)
                .then(res => {
                    if (res.status === 201) {
                        dispatch({ type: "ADD_TASK", task: res.data })
                        setDescription("")
                    }
                })
                .catch()
        }
    }

    return (
        <div className="display-flex-row-even">
            <input type="test" placeholder="Description" name="description" onChange={handleChange} value={description}></input>
            <Button variant="outline-success"  onClick={addTask}>ADD</Button>
        </div>
    )
}

export default AddTask
