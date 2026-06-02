import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const MCQInterview = () => {
  const navigate =
    useNavigate();

  const location =
    useLocation();

  const mcqs =
    location.state?.mcqs || [];

  const codingQuestion =
    location.state
      ?.codingQuestion;

  const interviewId =
    location.state
      ?.interviewId;

  const [
    currentQuestion,
    setCurrentQuestion,
  ] = useState(0);

  const [answer, setAnswer] =
    useState("");

  const [answers, setAnswers] =
    useState([]);

  const [timeLeft, setTimeLeft] =
    useState(1800);

  const [
    warningCount,
    setWarningCount,
  ] = useState(0);

  // TIMER
  useEffect(() => {
    if (timeLeft <= 0) {
      navigate("/results", {
        state: {
          answers,
          interviewId,
        },
      });

      return;
    }

    const timer =
      setInterval(() => {
        setTimeLeft(
          (prev) =>
            prev - 1
        );
      }, 1000);

    return () =>
      clearInterval(timer);
  }, [
    timeLeft,
    answers,
    navigate,
    interviewId,
  ]);

  // TAB SWITCH WARNING
  useEffect(() => {
    const handleVisibility =
      () => {
        if (
          document.hidden
        ) {
          const newWarnings =
            warningCount +
            1;

          setWarningCount(
            newWarnings
          );

          alert(
            `Warning ${newWarnings}/3
Do not switch tabs during interview.`
          );

          if (
            newWarnings >=
            3
          ) {
            alert(
              "Interview auto-submitted due to repeated tab switching."
            );

            navigate(
              "/results",
              {
                state: {
                  answers,
                  interviewId,
                },
              }
            );
          }
        }
      };

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
    };
  }, [
    warningCount,
    answers,
    navigate,
    interviewId,
  ]);

  const handleNext =
    () => {
      const updatedAnswers =
        [
          ...answers,
          {
            question:
              mcqs[
                currentQuestion
              ]?.question,
            answer,
          },
        ];

      setAnswers(
        updatedAnswers
      );

      setAnswer("");

      if (
        currentQuestion <
        mcqs.length - 1
      ) {
        setCurrentQuestion(
          (prev) =>
            prev + 1
        );
      } else {
        navigate(
          "/coding-interview",
          {
            state: {
              codingQuestion,
              answers:
                updatedAnswers,
              interviewId,
            },
          }
        );
      }
    };

  if (
    !mcqs ||
    mcqs.length === 0
  ) {
    return (
      <h1 className="text-center mt-20 text-3xl">
        No MCQ questions found
      </h1>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-4xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold">
              AI Mock Interview
            </h1>

            <p className="text-gray-500">
              Answer carefully and avoid tab switching
            </p>
          </div>

          <div className="bg-red-100 text-red-600 px-5 py-3 rounded-xl font-bold">
            Warnings:
            {" "}
            {warningCount}/3
          </div>
        </div>

        {/* Timer */}
        <div className="text-center mb-6">
          <span className="bg-red-100 text-red-600 px-5 py-2 rounded-xl font-bold text-lg">
            Time Left:
            {" "}
            {Math.floor(
              timeLeft / 60
            )}
            :
            {(
              timeLeft %
              60
            )
              .toString()
              .padStart(
                2,
                "0"
              )}
          </span>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="font-medium">
              Question{" "}
              {currentQuestion + 1}
            </span>

            <span className="text-gray-500">
              {currentQuestion + 1}/
              {mcqs.length}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full"
              style={{
                width: `${
                  ((currentQuestion +
                    1) /
                    mcqs.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-gray-100 rounded-xl p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            Question{" "}
            {currentQuestion + 1}
          </h2>

          <p className="text-lg mb-6">
            {
              mcqs[
                currentQuestion
              ]?.question
            }
          </p>

          <div className="space-y-4">
            {mcqs[
              currentQuestion
            ]?.options?.map(
              (
                option,
                index
              ) => (
                <button
                  key={index}
                  onClick={() =>
                    setAnswer(
                      option
                    )
                  }
                  className={`w-full text-left border p-4 rounded-xl ${
                    answer ===
                    option
                      ? "bg-blue-200 border-blue-500"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {option}
                </button>
              )
            )}
          </div>
        </div>

        {/* Button */}
        <button
          onClick={
            handleNext
          }
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl w-full text-lg"
        >
          {currentQuestion ===
          mcqs.length - 1
            ? "Go To Coding Round"
            : "Next Question"}
        </button>
      </div>
    </div>
  );
};

export default MCQInterview;