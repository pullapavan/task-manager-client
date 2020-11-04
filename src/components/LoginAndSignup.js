import React from 'react'
import { useState, useEffect } from 'react'
import validator from 'validator'
import apicalls from '../apicalls/apicalls'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'



function LoginAndSignup(props) {
    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const [error, setError] = useState("")

    const state = useSelector(state => state)
    const { user } = state
    const dispatch = useDispatch();
    const history = useHistory();


    const handleChange = (e) => {
        let value = e.target.value ? e.target.value.trim() : ""
        if (e.target.name === 'email')
            setEmail(value)
        else if (e.target.name === 'password')
            setpassword(value)
    }

    const validations = () => {
        if (!validator.isEmail(email ? email : "")) {
            setError(`Enter Valid EmailID`)
            return false
        }

        if (!password || password.length < 7) {
            setError("Enter valid Password(min 7 characters)")
            return false
        }
        return true
    }

    const errorHandler = (error) => {
        const data = error.response ? error.response.data : {}
        setError(data.error || "Failed to Login/Sign up, try again")
    }

    const saveUser = (user, token) => {
        dispatch({ type: "SAVE", user, token })
        redirect(user)
    }

    const login = () => {
        if (validations()) {
            apicalls.login(email, password)
                .then(res => {
                    if (res.status === 200) {
                        saveUser(res.data.user, res.data.token)
                    }
                })
                .catch(errorHandler)
        }
    }

    const register = function () {
        if (validations()) {
            apicalls.register(email, password)
                .then(res => {
                    if (res.status === 201) {
                        saveUser(res.data.user, res.data.token)
                    }
                })
                .catch(errorHandler)
        }
    }

    const redirect = (user) => {
        if (user.role === 'ADMIN') {
            history.push(`/admin`)
        } else if (user.role === 'USER') {
            history.push(`/tasks`)
        }
    }

    useEffect(() => {
        if (user.email) {
            redirect(user)
        }
    }, [state])

    return (
        <div className="main-div">
            <div className="text-center">
                <h5>Welcome to TODO App</h5>
            </div>
            <div className="width-50 m-auto">

                <div className="display-flex-column-even">
                    <div>{error && <Alert variant="danger">{error}</Alert>}</div>
                    <div>
                        <input className="form-control" placeholder="Email" type="text" name="email" value={email} onChange={handleChange} />
                    </div>
                    <div>
                        <input className="form-control" placeholder="password" type="password" name="password" value={password} onChange={handleChange} />
                    </div>
                </div>
                <div className="display-flex-row-even">
                    <div><Button type="button" onClick={login}>Login</Button></div>
                    <div><Button type="button" onClick={register}>Sign Up</Button></div>
                </div>
            </div>
        </div>
    )
}

export default LoginAndSignup
