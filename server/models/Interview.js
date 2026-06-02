const mongoose =
  require("mongoose");

const interviewSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema
            .Types.ObjectId,
        ref: "User",
        required: true,
      },

      role: {
        type: String,
        required: true,
      },

      experience: {
        type: String,
        required: true,
      },

      techStack: {
        type: [String],
        required: true,
      },

      mcqs: [
        {
          question:
            String,

          options: [
            String,
          ],

          answer:
            String,
        },
      ],

      codingQuestion: {
        title:
          String,

        description:
          String,

        example:
          String,

        starterCode:
          String,
      },

      answers: [
        {
          question:
            String,

          answer:
            String,
        },
      ],

      score: {
        type: Number,
        default: 0,
      },

      strengths: [
        String,
      ],

      improvements: [
        String,
      ],
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Interview",
    interviewSchema
  );