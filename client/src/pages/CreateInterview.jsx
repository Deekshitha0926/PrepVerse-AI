import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const CreateInterview = () => {
  const navigate = useNavigate();
  const [formData, setFormData] =
    useState({
      role: "",
      experience: "",
      techStack: "",
    });

  // const [mcqs, setMcqs] =
  //   useState([]);

  // const [
  //   codingQuestion,
  //   setCodingQuestion,
  // ] = useState(null);

  // const [
  //   interviewId,
  //   setInterviewId,
  // ] = useState("");
  const [loading, setLoading] = useState(false);

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

      // Validation
      if (
        !formData.role.trim()
      ) {
        toast.error(
          "Please enter role"
        );
        return;
      }

      if (
        !formData.experience.trim()
      ) {
        toast.error(
          "Please enter experience"
        );
        return;
      }

      if (
        !formData.techStack.trim()
      ) {
        toast.error(
          "Please enter tech stack"
        );
        return;
      }

      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.post(
            "http://localhost:5000/api/interviews",
            {
              role:
                formData.role,
              experience:
                formData.experience,
              techStack:
                formData.techStack
                  .split(",")
                  .map((tech) =>
                    tech.trim()
                  ),
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        // setMcqs(
        //   res.data.mcqs
        // );

        // setCodingQuestion(
        //   res.data
        //     .codingQuestion
        // );

        // setInterviewId(
        //   res.data._id
        // );
        navigate("/mcq-interview", {
          state: {
            mcqs: res.data.mcqs,
            codingQuestion: res.data.codingQuestion,
            interviewId: res.data._id,
          },
        });

        toast.success(
          "Interview generated successfully!"
        );

      } catch (error) {
        console.log(
          error
        );

        toast.error(
          "Failed to generate interview"
        );
      }
    };
  return (
    <>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[500px]">

        <h1 className="text-3xl font-bold mb-3 text-center">
          Mock Interview Setup
        </h1>

        <p className="text-gray-600 text-center mb-6">
          Configure your role,
          experience and tech
          stack to start an
          AI-powered mock
          interview.
        </p>

        <form
          onSubmit={
            handleSubmit
          }
        >
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={
              formData.role
            }
            onChange={
              handleChange
            }
            className="border p-3 w-full mb-4 rounded-lg"
          />

          <input
            type="text"
            name="experience"
            placeholder="Experience"
            value={
              formData.experience
            }
            onChange={
              handleChange
            }
            className="border p-3 w-full mb-4 rounded-lg"
          />

          <input
            type="text"
            name="techStack"
            placeholder="React, Node.js, MongoDB"
            value={
              formData.techStack
            }
            onChange={
              handleChange
            }
            className="border p-3 w-full mb-4 rounded-lg"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-600"
          >
            Start Mock
            Interview
          </button>
        </form>

        {/* {mcqs.length >
          0 && (
          <Link
            to="/mcq-interview"
            state={{
              mcqs,
              codingQuestion,
              interviewId,
            }}
          >
            <button
              className="bg-green-500 text-white px-6 py-3 rounded-lg w-full mt-4 hover:bg-green-600"
            >
              Start Mock
              Interview
            </button>
          </Link>
        )} */}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default CreateInterview;