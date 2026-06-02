import Footer from "../components/Footer";
import toast from "react-hot-toast";
import {
  useState,
} from "react";
import axios from "axios";

const PracticePage = () => {
  const [formData,
    setFormData] =
    useState({
      role: "",
      experience: "",
      techStack: "",
    });

  const [questions,
    setQuestions] =
    useState([]);

  const handleChange =
    (e) => {
      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });
    };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

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
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setQuestions(
          res.data.mcqs
        );

        toast.success(
          "Practice questions generated!"
        );

      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to generate practice questions"
        );
      }
    };

  return (
    <>
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-8">
      <div className="bg-white shadow-xl rounded-xl p-8 w-[700px]">

        <h1 className="text-3xl font-bold text-center mb-6">
          Practice Questions
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
        >
          <input
            type="text"
            name="role"
            placeholder="Role"
            onChange={
              handleChange
            }
            className="border p-3 rounded-lg w-full mb-4"
          />

          <input
            type="text"
            name="experience"
            placeholder="Experience"
            onChange={
              handleChange
            }
            className="border p-3 rounded-lg w-full mb-4"
          />

          <input
            type="text"
            name="techStack"
            placeholder="React, Node.js, MongoDB"
            onChange={
              handleChange
            }
            className="border p-3 rounded-lg w-full mb-4"
          />

          <button
            className="bg-blue-500 text-white w-full py-3 rounded-lg hover:bg-blue-600"
          >
            Generate Questions
          </button>
        </form>

        {questions.length >
          0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">
              Practice Questions
            </h2>

            {questions.map(
              (
                q,
                index
              ) => (
                <div
                  key={
                    index
                  }
                  className="bg-gray-100 p-4 rounded-lg mb-3"
                >
                  <p>
                    <strong>
                      {
                        index +
                        1
                      }
                      .
                    </strong>{" "}
                    {q.question}
                  </p>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default PracticePage;