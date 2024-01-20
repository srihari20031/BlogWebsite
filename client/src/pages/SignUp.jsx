import { useState } from "react";
import "../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    const authURL = `${import.meta.env.VITE_REACT_AUTH_URL}/register`;
    const response = await fetch(authURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email }),
    });

    if (response.status === 201) {
      navigate("/login");
      alert("Registration successful");
    } else {
      toast("Registration failed");
    }
  };

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button>Register</button>
      <ToastContainer />
    </form>
  );
};

export default SignUp;
