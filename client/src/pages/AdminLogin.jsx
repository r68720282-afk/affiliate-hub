import { useState } from "react";

export default function AdminLogin() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  function handleSubmit(e) {

    e.preventDefault();

    alert("Backend login API will be connected in next step.");

  }

  return (

    <div className="adminLogin">

      <form
        className="loginBox"
        onSubmit={handleSubmit}
      >

        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button>
          Login
        </button>

      </form>

    </div>

  );

}
