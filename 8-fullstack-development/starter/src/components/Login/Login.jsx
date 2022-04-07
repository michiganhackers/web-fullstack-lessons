import React, { useState } from "react";
import { login } from "../../api";

function Login() {
    const [username, setUsername] = useState("");
    const [loggedInName, setLoggedInName] = useState(document.cookie
        .split("; ")
        .find((row) => row.startsWith("username="))
        ?.split("=")[1]);

    const handleLogin = () => {
        // finish this call
        login(username, "FIXME").then(() => {
            setLoggedInName(username);
            setUsername("");
        });
    };
    const handleLogout = () => {
        document.cookie = "username=; max-age=0";
        setLoggedInName(null);
    };

    return loggedInName ? (
        <div>
            <p>Welcome {loggedInName}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    ) : (
        <div className="inputs">
            <label>
                Username:&nbsp;
                <input
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </label>
            {/* Add a password field and a button to do the login */}
        </div>
    );
}

export default Login;
