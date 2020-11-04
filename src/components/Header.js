import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom'



function Header() {
    const state = useSelector(state => state)
    const { user } = state
    const dispatch = useDispatch();
    const history = useHistory();


    const logout = () => {
        dispatch({ type: "CLEAR" })
        history.push(`/login`)
    }

    return (
        <div className="display-flex-row-between">
            <div><h4>{user.email}</h4></div>
            <div>
                <Button variant="outline-danger" onClick={logout}>Logout</Button>
            </div>
        </div>
    )
}

export default Header
