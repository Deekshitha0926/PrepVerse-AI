import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Footer from "../components/Footer";
import {
  useNavigate,
  Link,
} from "react-router-dom";

const Login = () => {
  const navigate =
    useNavigate();

  const [formData,
    setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/login",
          formData
        );

        localStorage.setItem(
          "token",
          res.data.token
        );

        toast.success(
          "Login successful!"
        );

        navigate("/dashboard");

      } catch (error) {
        console.log(error.response?.data);

        toast.error(
          error.response?.data?.message ||
          "Invalid email or password"
        );
      }
    };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 flex items-center justify-center px-6">

      <div className="grid md:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full">

        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center p-14 bg-gradient-to-br from-blue-700 to-indigo-800 text-white">
          <h1 className="text-5xl font-bold mb-6">
            PrepVerse AI
          </h1>

          <p className="text-xl text-blue-100 leading-relaxed">
            Practice smarter,
            attend realistic mock
            interviews and improve
            your technical
            performance with
            AI-powered feedback.
          </p>

          <div className="mt-8 space-y-3 text-lg">
            <p>
              ✓ Mock Interviews
            </p>
            <p>
              ✓ AI Evaluation
            </p>
            <p>
              ✓ Practice Questions
            </p>
            <p>
              ✓ Interview History
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-10 md:p-14 flex flex-col justify-center">

          <h2 className="text-4xl font-bold mb-2 text-center">
            Welcome Back
          </h2>

          <p className="text-gray-500 text-center mb-8">
            Login to continue
            your interview
            journey
          </p>

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-5"
          >
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={
                handleChange
              }
              className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={
                handleChange
              }
              className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold transition"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Don't have an
            account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Login;