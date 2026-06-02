import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateInterview from "./pages/CreateInterview";
import ResultsPage from "./pages/ResultsPage";
import HistoryPage from "./pages/HistoryPage";
import PracticePage from "./pages/PracticePage";
import MCQInterview from "./pages/MCQInterview";
import CodingInterview from "./pages/CodingInterview";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    <Routes>
      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/practice"
        element={
          <ProtectedRoute>
            <PracticePage />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/create-interview"
        element={
          <ProtectedRoute>
            <CreateInterview />
          </ProtectedRoute>
        }
      />

      <Route
        path="/mcq-interview"
        element={
          <ProtectedRoute>
            <MCQInterview />
          </ProtectedRoute>
        }
      />

      <Route
        path="/coding-interview"
        element={
          <ProtectedRoute>
            <CodingInterview />
          </ProtectedRoute>
        }
      />

      <Route
        path="/results"
        element={
          <ProtectedRoute>
            <ResultsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <HistoryPage />
          </ProtectedRoute>
        }
      />
      
    </Routes>
    </>
  );
}

export default App;