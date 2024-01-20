import { useContext, useState } from "react";
import { Navigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  async function login(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setRedirect(true);
        toast.success(`Welcome back ${userInfo.name}!`);
      });
    } else {
      toast(<h3>Wrong Credentials</h3>);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  

  return (
    <div>
      <form className="login" onSubmit={login}>
        <h1>Login</h1>
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
        <button>Login</button>
      </form>
      
      <ToastContainer />
    </div>
  );
};

export default Login;
