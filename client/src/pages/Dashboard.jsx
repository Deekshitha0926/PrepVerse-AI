import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Dashboard = () => {

  const navigate =
    useNavigate();

  const handleLogout =
    () => {
      localStorage.removeItem(
        "token"
      );

      navigate("/");
    };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 p-8">

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12 flex justify-between items-start">

        <div>
          <h1 className="text-5xl font-bold text-gray-800 mb-3">
            Welcome to PrepVerse AI
          </h1>

          <p className="text-lg text-gray-600">
            Practice, attend mock interviews,
            and improve with AI-powered
            feedback.
          </p>
        </div>

        <button
          onClick={
            handleLogout
          }
          className="bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">

        {/* Practice */}
        <div className="bg-white rounded-3xl shadow-xl p-8 hover:scale-105 transition duration-300">
          <div className="text-5xl mb-5">
            📘
          </div>

          <h2 className="text-3xl font-bold mb-4">
            Practice Questions
          </h2>

          <p className="text-gray-600 mb-8">
            Prepare using
            AI-generated questions
            tailored to your role
            and tech stack.
          </p>

          <Link to="/practice">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl w-full font-semibold">
              Start Practice
            </button>
          </Link>
        </div>

        {/* Mock Interview */}
        <div className="bg-white rounded-3xl shadow-xl p-8 hover:scale-105 transition duration-300">
          <div className="text-5xl mb-5">
            🎤
          </div>

          <h2 className="text-3xl font-bold mb-4">
            Mock Interview
          </h2>

          <p className="text-gray-600 mb-8">
            Experience realistic
            AI-powered mock
            interviews with
            scoring and feedback.
          </p>

          <Link to="/create-interview">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl w-full font-semibold">
              Start Interview
            </button>
          </Link>
        </div>

        {/* History */}
        <div className="bg-white rounded-3xl shadow-xl p-8 hover:scale-105 transition duration-300">
          <div className="text-5xl mb-5">
            📊
          </div>

          <h2 className="text-3xl font-bold mb-4">
            Interview History
          </h2>

          <p className="text-gray-600 mb-8">
            Review previous
            interview scores,
            strengths, and
            improvements.
          </p>

          <Link to="/history">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl w-full font-semibold">
              View History
            </button>
          </Link>
        </div>

      </div>
    </div>
    <Footer />
    </>
  );
};

export default Dashboard;