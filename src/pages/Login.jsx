import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Login = () => {
    const [role, setRole] = useState("user");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // const handleLogin = async () => {
    //     if (!username || !password) {
    //         setError("Username and Password are required!");
    //         return;
    //     }
    //     setError("");
    
    //     try {
    //         const response = await axios.post("http://localhost:8080/api/auth/login",
    //             { username, password }
    //         );
    
    //         console.log(response.data);
    //         if (response.data.includes("Admin")) {
    //             navigate("/admin-home");
    //         } else if (response.data.includes("User")) {
    //             navigate("/home");
    //         }
    //     } catch (error) {
    //         console.error("Login Error:", error);
    //         if (error.response) {
    //             if (error.response.status === 401) {
    //                 setError("Invalid Username or Password!");
    //             } else {
    //                 setError(`Server Error: ${error.response.status}`);
    //             }
    //         } else {
    //             setError("Network error. Check if backend is running.");
    //         }
    //     }
    // };

    const handleLogin = () => {
        if (!username || !password) {
            setError("Username and Password are required!");
            return;
        }
        setError("");
    
        // setTimeout({

        // }, [])
        // Navigate based on the selected role
        if (role === "admin" && username === "ADMIN" && password === "123") {
            navigate("/admin-home");
        } else if(role === "user" && username === "USER" && password === "123") {
            navigate("/home");
        }else{
            navigate("/");
            setError(`${role} not found `);
        }
    };
    
    

    return (
        <div>
            <Navbar />
            <div className='w-full h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white flex flex-col items-center pt-12'>
                {/* Role Selection Dropdown */}
                <div className="mb-6">
                    <select 
                        className="bg-fuchsia-950 p-2 text-amber-200 rounded-lg cursor-pointer"
                        onChange={(e) => setRole(e.target.value)} 
                        value={role}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                {/* Login Form */}
                <div className='w-96 p-8 border-2 rounded-2xl bg-gray-700 shadow-lg'>
                    <p className='text-2xl text-gray-400 font-bold mb-5 text-center'>
                        {role.toUpperCase()}
                    </p>
                    <form className='font-serif flex flex-col'>
                        <label className="mb-1">{role.charAt(0).toUpperCase()}{role.substring(1)} name:</label>
                        <input 
                            type="text" 
                            className='mb-4 bg-gray-500 p-2 rounded-lg focus:outline-none' 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <label className="mb-1">Password:</label>
                        <input 
                            type="password" 
                            className='mb-4 bg-gray-500 p-2 rounded-lg focus:outline-none' 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {error && <p className="text-yellow-500 text-center mb-3">{error}</p>}

                        <input 
                            type="button" 
                            value="Login"
                            className='w-full bg-blue-600 px-4 py-2 mt-2 rounded-lg hover:bg-green-600 transition duration-300'
                            onClick={handleLogin}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
