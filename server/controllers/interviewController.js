const Interview =
  require("../models/Interview");

const groq =
  require("../config/groq");

const createInterview =
  async (req, res) => {
    try {
      const {
        role,
        experience,
        techStack,
      } = req.body;

      const randomSeed =
        Math.floor(
          Math.random() * 1000000
        );

      const prompt = `
You are an AI mock interview generator.

Random Interview ID:
${randomSeed}

Generate a REALISTIC technical mock interview.

Role:
${role}

Experience:
${experience}

Tech Stack:
${techStack.join(", ")}

Return ONLY VALID JSON.

FORMAT:

{
  "mcqs": [
    {
      "question": "",
      "options": [
        "",
        "",
        "",
        ""
      ],
      "answer": ""
    }
  ],
  "codingQuestion": {
    "title": "",
    "description": "",
    "example": "",
    "starterCode": ""
  }
}

STRICT RULES:

1. Generate EXACTLY 10 MCQs.

2. MCQs MUST depend on:
- role
- experience
- tech stack

3. EVERY interview generation
must be DIFFERENT.

4. Even if the SAME role,
experience and tech stack
are entered again,
generate NEW questions.

5. Coding question MUST
change every generation.

6. NEVER repeat coding
problems.

7. Coding question MUST
match technologies.

Frontend / React / JS:
Choose RANDOMLY from:
- DOM manipulation
- API fetching
- Navbar toggle
- Search filter
- Todo logic
- Form validation
- Responsive UI
- State management
- Array methods
- Event handling
- Local storage
- Theme toggle
- Pagination

Java / Spring Boot:
Choose RANDOMLY from:
- Arrays
- Strings
- OOP
- Collections
- Streams
- REST API logic
- Exception handling
- Database logic

Python:
Choose RANDOMLY from:
- Lists
- Strings
- Loops
- Dictionary problems
- APIs
- File handling

MERN:
Choose RANDOMLY from:
- CRUD logic
- JWT auth
- MongoDB queries
- API integration
- React state logic

8. Difficulty based on experience:
- Fresher → easy
- 1–3 years → medium
- 3+ years → hard

9. starterCode MUST match
tech stack language.

10. Return ONLY JSON.
`;

      const completion =
        await groq.chat.completions.create(
          {
            messages: [
              {
                role:
                  "user",
                content:
                  prompt,
              },
            ],
            model:
              "llama-3.3-70b-versatile",

            temperature: 1.4,
          }
        );

      const text =
        completion
          .choices[0]
          .message
          .content;

      const cleanText =
        text
          .replace(
            /```json/g,
            ""
          )
          .replace(
            /```/g,
            ""
          )
          .trim();

      const parsedData =
        JSON.parse(
          cleanText
        );

      const mcqs =
        parsedData.mcqs ||
        [];

      const codingQuestion =
        parsedData.codingQuestion ||
        {};

      const interview =
        await Interview.create(
          {
            user:
              req.user._id,
            role,
            experience,
            techStack,
            mcqs,
            codingQuestion,
          }
        );

      res
        .status(201)
        .json(interview);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

const getMyInterviews =
  async (req, res) => {
    try {
      const interviews =
        await Interview.find(
          {
            user:
              req.user.id,
          }
        );

      res.json(
        interviews
      );
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to fetch interviews",
      });
    }
  };

const getInterviews =
  async (req, res) => {
    try {
      const interviews =
        await Interview.find(
          {
            user:
              req.user._id,
          }
        );

      res
        .status(200)
        .json(interviews);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

const submitInterview =
  async (req, res) => {
    try {
      const {
        answers,
        score,
        strengths,
        improvements,
      } = req.body;

      const interview =
        await Interview.findById(
          req.params.id
        );

      if (!interview) {
        return res
          .status(404)
          .json({
            message:
              "Interview not found",
          });
      }

      interview.answers =
        answers;

      interview.score =
        score;

      interview.strengths =
        strengths;

      interview.improvements =
        improvements;

      await interview.save();

      res.json(
        interview
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

const evaluateInterview =
  async (req, res) => {
    try {
      const {
        answers,
      } = req.body;

      const formattedAnswers =
        answers
          .map(
            (
              item,
              index
            ) =>
              `Question ${
                index + 1
              }: ${
                item.question
              }

Answer:
${item.answer}`
          )
          .join(
            "\n\n"
          );

      const prompt = `
        You are a strict technical interviewer.

        Evaluate this interview honestly.

        Questions and Answers:

        ${formattedAnswers}

        STRICT SCORING RULES:

        - Empty answer = 0 marks
        - "don't know", "no idea", blank answer = 0 marks
        - Very short/basic answer = low marks
        - Partially correct answer = medium marks
        - Detailed technical answer = high marks
        - Incorrect technical explanation = deduct score
        - Score MUST reflect actual performance

        Scoring Guide:
        0–2 = Very poor
        3–4 = Poor
        5–6 = Average
        7–8 = Good
        9–10 = Excellent

        If candidate skipped many questions,
        score MUST stay below 5.

        If candidate answered almost nothing,
        score MUST be 0–2.

        Return ONLY valid JSON in this format:

        {
          "score": 0,
          "strengths": [
            ""
          ],
          "improvements": [
            ""
          ]
        }

        Rules:
        - score between 0 and 10
        - give exactly 3 strengths
        - give exactly 3 improvements
        - be strict and realistic
        - return ONLY JSON
        `;

      const completion =
        await groq.chat.completions.create(
          {
            messages: [
              {
                role:
                  "user",
                content:
                  prompt,
              },
            ],
            model:
              "llama-3.3-70b-versatile",
          }
        );

      const text =
        completion
          .choices[0]
          .message
          .content;

      const cleanText =
        text
          .replace(
            /```json/g,
            ""
          )
          .replace(
            /```/g,
            ""
          )
          .trim();

      const feedback =
        JSON.parse(
          cleanText
        );

      res.json(
        feedback
      );
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

module.exports = {
  createInterview,
  getMyInterviews,
  getInterviews,
  submitInterview,
  evaluateInterview,
};