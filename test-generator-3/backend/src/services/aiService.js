const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateQuestionsAI(notes, opts = {}) {
  const {
    count = 10,
    difficulty = "medium",
    topic = "General",
    description = ""
  } = opts;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
You are an AI question generator.
Generate exactly ${count} questions.

Topic: ${topic}
Difficulty: ${difficulty}

Source Notes:
${notes}

Extra Instructions:
${description}

Return ONLY JSON:
[
  {
    "question": "text",
    "type": "MCQ | Short Answer | Long Answer",
    "options": ["A","B","C","D"] or null,
    "answer": "correct answer"
  }
]
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("Gemini JSON error:", err);
    console.log("Returned:", text);
    throw new Error("Gemini returned invalid JSON");
  }
}
module.exports = {
  generateQuestionsAI
};
