const Question = require("../models/Question");
const Test = require("../models/Test");

// Gemini version
const { GoogleGenerativeAI } = require("@google/generative-ai");

function getModel() {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }
  const client = new GoogleGenerativeAI(apiKey);
  return client.getGenerativeModel({ model: "gemini-2.5-flash" });
}

/* OpenAI version
const OpenAI = require("openai").default;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
*/

const generateQuestionsAI = async (notes, opts = {}) => {
  const { count = 10, difficulty = "medium", topic = "General", description = "" } = opts;

  const prompt = `
Generate ${count} exam questions.
Topic: ${topic}
Difficulty: ${difficulty}
Notes:
${notes}
Extra instructions:
${description}

Return ONLY JSON:
[
  {
    "question": "",
    "type": "MCQ | Short Answer | Long Answer | True/False | FillBlank",
    "options": ["A","B","C","D"] OR null,
    "answer": ""
  }
]
`;

  // gemini version
  const model = getModel();
  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ]
  });
  const text = result.response.text();

  try {
    return JSON.parse(text);
  } catch (err) {
     console.log("Gemini Returned:", text);
    throw new Error("Gemini response is not valid JSON.");
  }
};

/* openai
const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.choices[0].message.content;

  try {
    const parsed = JSON.parse(text);

    return parsed.map((q) => ({
      text: q.question || "",
      type:
        (q.type || "").toLowerCase() === "mcq"
          ? "mcq"
          : (q.type || "").toLowerCase() === "short answer"
          ? "short"
          : (q.type || "").toLowerCase() === "long answer"
          ? "long"
          : (q.type || "").toLowerCase() === "true/false"
          ? "truefalse"
          : "mcq",

      options: Array.isArray(q.options)
        ? q.options.map((opt) => ({ text: opt, isCorrect: false }))
        : [],
    }));
  } catch (err) {
    console.log("OpenAI Returned:", text);
    throw new Error("OpenAI response is not valid JSON.");
  }
};
*/

const createQuestionsFromAI = async (notes, opts = {}) => {
  const generated = await generateQuestionsAI(notes, opts);
  return await Question.insertMany(generated);
};

const createTestWithAIQuestions = async (title, notes, opts = {}) => {
  const questions = await createQuestionsFromAI(notes, opts);

  const test = await Test.create({
    title,
    description: opts.description || "",
    questions: questions.map((q) => q._id),
    settings: opts.settings || {},
  });

  return { test, questions };
};

module.exports = {
  generateQuestionsAI,
  createQuestionsFromAI,
  createTestWithAIQuestions,
};