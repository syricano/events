import { useState } from "react";
import { useNavigate } from "react-router"; 
import { useAuth } from "../context/AuthContext";

function Signin() {
  const { login } = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [message, setMessage] = useState(""); 

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/api/auth/login', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Login successful! Redirecting...");
        login(data.token);
        navigate("/"); 
        console.log("logged in:", data);
      } else {
        setMessage(data.message || "Login failed. Email or Password is incorrect.");
        navigate("/signin"); 
      }     

      

    } catch (error) {
      console.error("Error loggin in:", error);
    }
  };



  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight ">
          Sign in your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {message && (
          <div className="mt-4 text-center text-red-600 font-medium">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium ">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={user.email}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium ">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={user.password}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
