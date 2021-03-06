import React, { useEffect, useState } from "react";
import "./App.css";

async function login() {
  try {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "mariusspomer@hallo.de",
        password: "123",
      }),
    });
    const result = await response.text();
    alert(result);
  } catch (error) {
    alert(error.message);
  }
}

async function fetchPassword(name) {
  try {
    const response = await fetch(`/api/password/${name}`);
    const result = await response.text();
    alert(result);
  } catch (error) {
    alert(error.message);
  }
}

function App() {
  const [passwordName, setPasswordName] = useState("");
  return (
    <>
      <button onClick={login}>Login</button>
      <label>
        Password-Name{" "}
        <input
          value={passwordName}
          onChange={(event) => setPasswordName(event.target.value)}
        />
      </label>
      <button onClick={() => fetchPassword(passwordName)}>Get Password</button>
    </>
  );
}

export default App;
