import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const App = () => {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLoginSuccess = (response) => {
        const decoded = jwtDecode(response.credential);
        setUser(decoded);
    };

    const handleLoginFailure = () => {
        console.error("Login Failed");
    };

    const handleLogout = () => {
        googleLogout();
        setUser(null);
    };

    const handleLogin = () => {
        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }
        setError(""); 
        alert("Sign in with Google, please.");
    };

    const handleSignUp = () => {
        alert("Only login through Google is available.");
    };

    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                {!user ? (
                    <div className="bg-white shadow-md rounded-lg p-8 w-96 text-center border">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Welcome Back</h2>
                        <p className="text-gray-600 text-sm mb-5">Sign in to continue</p>

                        {/* Email Input */}
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full px-4 py-2 border rounded-md mb-2 focus:outline-none focus:ring-2 transition ${
                                error ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
                            }`}
                        />

                        {/* Password Input */}
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full px-4 py-2 border rounded-md mb-2 focus:outline-none focus:ring-2 transition ${
                                error ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
                            }`}
                        />

                        {/* Error Message */}
                        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

                        {/* Login Button */}
                        <button 
                            onClick={handleLogin}
                            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold transition-all duration-300 hover:bg-blue-700 hover:scale-105"
                        >
                            Login
                        </button>

                        {/* Sign Up Button */}
                        <button 
                            onClick={handleSignUp}
                            className="w-full bg-green-600 text-white py-2 rounded-md font-semibold mt-3 transition-all duration-300 hover:bg-green-700 hover:scale-105"
                        >
                            Sign Up
                        </button>

                        <div className="my-5 flex items-center">
                            <hr className="w-full border-gray-300" />
                            <span className="px-3 text-gray-500 text-sm">OR</span>
                            <hr className="w-full border-gray-300" />
                        </div>

                        {/* Google Login Button */}
                        <div className="flex justify-center">
                            <div className="w-full min-w-[200px]">
                                <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginFailure} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white shadow-md rounded-lg p-8 w-96 text-center border">
                        <h2 className="text-2xl font-semibold text-gray-800">Welcome, {user.name}</h2>
                        <img src={user.picture} alt="Profile" className="w-20 h-20 mx-auto rounded-full my-4 border border-gray-300 shadow-sm" />
                        <p className="text-gray-600">{user.email}</p>

                        {/* Logout Button */}
                        <button 
                            onClick={handleLogout} 
                            className="mt-5 w-full bg-red-600 text-white py-2 rounded-md font-semibold transition-all duration-300 hover:bg-red-700 hover:scale-105"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </GoogleOAuthProvider>
    );
};

export default App;
