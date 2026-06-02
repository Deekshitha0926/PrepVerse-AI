import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";


const HistoryPage = () => {
  const [interviews, setInterviews] =
    useState([]);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/interviews/my-interviews",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInterviews(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-8">
        Interview History
      </h1>

      <div className="grid gap-6">
        {interviews.map((item) => (
          <div
            key={item._id}
            className="bg-white p-6 rounded-xl shadow"
          >
            <h2 className="text-2xl font-semibold">
              {item.role}
            </h2>

            <p className="mt-2">
              <strong>Experience:</strong>{" "}
              {item.experience}
            </p>

            <p className="mt-2">
              <strong>Tech Stack:</strong>{" "}
              {item.techStack?.join(", ")}
            </p>

            <div className="mt-4">
              <p className="text-lg font-semibold">
                Score: {item.score || 0}/10
              </p>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold">
                Strengths
              </h3>

              <ul className="list-disc ml-6">
                {item.strengths?.map(
                  (strength, index) => (
                    <li key={index}>
                      {strength}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold">
                Improvements
              </h3>

              <ul className="list-disc ml-6">
                {item.improvements?.map(
                  (
                    improvement,
                    index
                  ) => (
                    <li key={index}>
                      {improvement}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold">
                Answers
              </h3>

              {item.answers?.map(
                (answer, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-3 rounded mt-2"
                  >
                    <p>
                      <strong>
                        Q:
                      </strong>{" "}
                      {
                        answer.question
                      }
                    </p>

                    <p>
                      <strong>
                        A:
                      </strong>{" "}
                      {
                        answer.answer
                      }
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default HistoryPage;