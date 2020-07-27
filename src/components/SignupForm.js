import React, { useState } from 'react'

export default function SignupForm({signup, alerts}){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        let user = {
            username,
            password
        }

        signup(user)
    }

    const handleChange = ({target}) => {
        return target.name === "username" 
            ? setUsername(target.value) 
            : setPassword(target.value)
    }

    const showAlerts = () => {
        return alerts.map(alert => {
            return <p>{alert}</p>
        })
    }

    return (
        <>
            <form className="signup-form" onSubmit={handleSubmit}>
                <label>Username</label>
                <input name="username" value={username} onChange={handleChange} />
                <label>Password</label>
                <input name="password" type="password" value={password} onChange={handleChange} />
                <input type="submit" />
            </form>
            {alerts ? showAlerts() : null}
        </>
    )
}