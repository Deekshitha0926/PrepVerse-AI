import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";


const ResultsPage = () => {
  const location = useLocation();

  const answers =
    location.state?.answers || [];

  const interviewId =
    location.state?.interviewId;

  const [feedback, setFeedback] =
    useState({
      score: 0,
      strengths: [],
      improvements: [],
    });

  useEffect(() => {
    evaluateInterview();
  }, []);

  const evaluateInterview =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.post(
            "http://localhost:5000/api/interviews/evaluate",
            {
              answers,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setFeedback(
          res.data
        );

        await axios.put(
          `http://localhost:5000/api/interviews/${interviewId}/submit`,
          {
            answers,
            score:
              res.data.score,
            strengths:
              res.data.strengths,
            improvements:
              res.data.improvements,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <>
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">

        <h1 className="text-4xl font-bold mb-8 text-center">
          Interview Results
        </h1>

        <div className="bg-blue-100 p-6 rounded-lg mb-8 text-center">
          <h2 className="text-3xl font-bold">
            Score:
            {feedback.score}/10
          </h2>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Strengths
          </h2>

          <ul className="list-disc ml-6">
            {feedback.strengths.map(
              (
                item,
                index
              ) => (
                <li key={index}>
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Improvements
          </h2>

          <ul className="list-disc ml-6">
            {feedback.improvements.map(
              (
                item,
                index
              ) => (
                <li key={index}>
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">
            Question Review
          </h2>

          {answers.map(
            (
              item,
              index
            ) => (
              <div
                key={index}
                className="border rounded-lg p-4 mb-6"
              >
                <h3 className="font-bold mb-2">
                  Question{" "}
                  {index + 1}
                </h3>

                <p className="mb-2">
                  <strong>
                    Q:
                  </strong>{" "}
                  {
                    item.question
                  }
                </p>

                <p>
                  <strong>
                    Your Answer:
                  </strong>{" "}
                  {item.answer}
                </p>
              </div>
            )
          )}
        </div>

      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ResultsPage;