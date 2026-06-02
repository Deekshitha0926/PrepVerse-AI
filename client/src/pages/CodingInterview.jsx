import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  useState,
  useEffect,
} from "react";
import Editor from "@monaco-editor/react";

const CodingInterview = () => {
  const location =
    useLocation();

  const navigate =
    useNavigate();

  const codingQuestion =
    location.state
      ?.codingQuestion;

  const interviewId =
    location.state
      ?.interviewId;

  const [
    warningCount,
    setWarningCount,
  ] = useState(0);

  const [
    selectedLanguage,
    setSelectedLanguage,
  ] = useState(
    "javascript"
  );

  const starterCodes = {
    javascript:
`function solve() {

}`,

    java:
`public class Main {
    public static void main(String[] args) {

    }
}`,

    python:
`def solve():
    pass`,

    cpp:
`#include <iostream>
using namespace std;

int main() {

    return 0;
}`,

    c:
`#include <stdio.h>

int main() {

    return 0;
}`,

    typescript:
`function solve(): void {

}`
  };

  const [code, setCode] =
    useState(
      starterCodes[
        "javascript"
      ]
    );

  // Change editor code
  const handleLanguageChange =
    (e) => {
      const lang =
        e.target.value;

      setSelectedLanguage(
        lang
      );

      setCode(
        starterCodes[
          lang
        ]
      );
    };

  // Tab warning
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
Do not switch tabs during coding round.`
          );

          if (
            newWarnings >=
            3
          ) {
            alert(
              "Interview auto-submitted."
            );

            finishInterview();
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
  }, [warningCount]);

  const finishInterview =
    () => {
      navigate("/results", {
        state: {
          code,
          language:
            selectedLanguage,
          interviewId,
        },
      });
    };

  if (
    !codingQuestion
  ) {
    return (
      <h1 className="text-center mt-20 text-3xl">
        No coding question found
      </h1>
    );
  }

  return (
    <div className="h-screen flex bg-gray-100">

      {/* LEFT */}
      <div className="w-1/2 bg-white p-8 overflow-y-auto border-r">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">
            Coding Round
          </h1>

          <div className="bg-red-100 text-red-600 px-4 py-2 rounded-xl font-semibold">
            Warnings:
            {" "}
            {warningCount}/3
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">
          {
            codingQuestion.title
          }
        </h2>

        <p className="text-lg mb-6 whitespace-pre-line">
          {
            codingQuestion.description
          }
        </p>

        <div className="bg-gray-100 p-4 rounded-xl">
          <h3 className="font-semibold mb-2">
            Example
          </h3>

          <pre className="whitespace-pre-wrap">
            {
              codingQuestion.example
            }
          </pre>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-1/2 flex flex-col">

        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-white border-b">

          <h2 className="font-bold text-xl">
            Code Editor
          </h2>

          <select
            value={
              selectedLanguage
            }
            onChange={
              handleLanguageChange
            }
            className="border px-4 py-2 rounded-lg"
          >
            <option value="javascript">
              JavaScript
            </option>

            <option value="java">
              Java
            </option>

            <option value="python">
              Python
            </option>

            <option value="cpp">
              C++
            </option>

            <option value="c">
              C
            </option>

            <option value="typescript">
              TypeScript
            </option>
          </select>
        </div>

        {/* Editor */}
        <div className="flex-1">
          <Editor
            height="100%"
            language={
              selectedLanguage
            }
            theme="vs-dark"
            value={code}
            onChange={(
              value
            ) =>
              setCode(
                value || ""
              )
            }
          />
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t">
          <button
            onClick={
              finishInterview
            }
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl"
          >
            Submit Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodingInterview;