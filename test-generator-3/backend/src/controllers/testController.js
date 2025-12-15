const testService = require('../services/testService');
const Test = require('../models/Test');
const Question = require('../models/Question');

exports.generateTest = async (req, res) => {
  // req.body: { title, notes, count, difficulty, topic, description }
  const { title, notes, count, difficulty, topic, description } = req.body;
  const opts = { count, difficulty, topic, description, settings: { timeLimitMin: req.body.timeLimitMin || 0 } };
  const result = await testService.createTestWithAIQuestions(title, notes, opts);
  res.status(201).json({ test: result.test, questions: result.questions });
};

exports.getTest = async (req, res) => {
  const test = await Test.findById(req.params.id).populate('questions');
  if (!test) return res.status(404).json({ error: 'Test not found' });
  res.json(test);
};

exports.listTests = async (req, res) => {
  const tests = await Test.find().populate('createdBy', 'email name').limit(50).sort({ createdAt: -1 });
  res.json(tests);
};

exports.addQuestion = async (req, res) => {
  // Create question manually
  const payload = req.body;
  const q = await Question.create(payload);
  // optionally attach to test
  if (req.query.testId) {
    const test = await Test.findById(req.query.testId);
    if (test) {
      test.questions.push(q._id);
      await test.save();
    }
  }
  res.status(201).json(q);
};
