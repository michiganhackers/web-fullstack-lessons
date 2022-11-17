import React, { useState } from "react";
import { login } from "../../api";
import "./Login.css";
import "../../App.css"
import logo from "../../logo.svg";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggedInName, setLoggedInName] = useState(
        document.cookie
            .split("; ")
            .find((row) => row.startsWith("username="))
            ?.split("=")[1]
    );

    const handleLogin = () => {
        login(username, password).then(() => {
            setLoggedInName(username);
            setUsername("");
            setPassword("");
        });
    };
    const handleLogout = () => {
        document.cookie = "username=; max-age=0";
        setLoggedInName(null);
    };

    return loggedInName ? (
        <header>
            {/*<img className={"App-logo"} src={logo} alt={"logo"}/>*/}
        <div className="profile">
            <p>Welcome {loggedInName}</p>
            <button onClick={handleLogout}>Logout</button>
        </div></header>
    ) : (
        <div className="inputs">
            <label>
                Username:&nbsp;
                <input
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </label>
            <label>
                Password:&nbsp;
                <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </label>
            <button onClick={handleLogin} disabled={!username || !username}>
                Login
            </button>
        </div>
    );
}

export default Login;
