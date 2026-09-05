import { 
  MOCK_SUBJECTS, 
  MOCK_QUESTIONS, 
  getQuestionsBySubject,
  getQuestionById as mockGetQuestionById,
} from "../utils/mockData";

// ============================================================
// ============================================================
// SUBJECT API
// ============================================================
// ============================================================

/**
 * Get all subjects
 * @returns {Array} Array of subject objects
 */
export function getSubjects() {
  console.log('📚 Returning mock subjects:', MOCK_SUBJECTS.length);
  return MOCK_SUBJECTS;
}

/**
 * Get a single subject by ID
 * @param {string} subjectId - The subject ID
 * @returns {Object|null} Subject object or null if not found
 */
export function getSubjectById(subjectId) {
  const subject = MOCK_SUBJECTS.find((s) => s._id === subjectId);
  if (!subject) {
    console.warn('⚠️ Subject not found:', subjectId);
    return null;
  }
  return subject;
}

/**
 * Create a new subject
 * @param {Object} subjectData - Subject data (name, description, icon)
 * @returns {Object} The created subject
 */
export function createSubject(subjectData) {
  const newSubject = {
    _id: `${Date.now()}`,
    name: subjectData.name || 'New Subject',
    description: subjectData.description || '',
    icon: subjectData.icon || '📚',
    mastery: 0,
    questionCount: 0,
    createdAt: new Date().toISOString().split('T')[0],
  };
  MOCK_SUBJECTS.push(newSubject);
  console.log('✅ Created new subject:', newSubject._id);
  return newSubject;
}

/**
 * Update an existing subject
 * @param {string} subjectId - The subject ID
 * @param {Object} subjectData - Updated subject data
 * @returns {Object} The updated subject
 */
export function updateSubject(subjectId, subjectData) {
  const index = MOCK_SUBJECTS.findIndex((s) => s._id === subjectId);
  if (index === -1) {
    throw new Error(`Subject not found: ${subjectId}`);
  }
  MOCK_SUBJECTS[index] = { 
    ...MOCK_SUBJECTS[index], 
    ...subjectData,
    updatedAt: new Date().toISOString().split('T')[0],
  };
  console.log('✅ Updated subject:', subjectId);
  return MOCK_SUBJECTS[index];
}

/**
 * Delete a subject and all its questions
 * @param {string} subjectId - The subject ID
 * @returns {boolean} True if deleted successfully
 */
export function deleteSubject(subjectId) {
  const index = MOCK_SUBJECTS.findIndex((s) => s._id === subjectId);
  if (index === -1) {
    throw new Error(`Subject not found: ${subjectId}`);
  }
  MOCK_SUBJECTS.splice(index, 1);
  
  // Delete all questions for this subject
  const questionIndices = [];
  MOCK_QUESTIONS.forEach((q, i) => {
    if (q.subjectId === subjectId) {
      questionIndices.push(i);
    }
  });
  // Remove from end to start (to avoid index shifting)
  for (let i = questionIndices.length - 1; i >= 0; i--) {
    MOCK_QUESTIONS.splice(questionIndices[i], 1);
  }
  
  console.log('🗑️ Deleted subject:', subjectId);
  return true;
}

// ============================================================
// ============================================================
// QUESTION API
// ============================================================
// ============================================================

/**
 * Get all questions for a subject
 * @param {string} subjectId - The subject ID
 * @returns {Array} Array of question objects
 */
export function getQuestions(subjectId) {
  console.log('📝 Fetching questions for subject:', subjectId);
  const questions = getQuestionsBySubject(subjectId);
  console.log('📝 Found:', questions.length, 'questions');
  return questions;
}

/**
 * Get a single question by ID
 * @param {string} questionId - The question ID
 * @returns {Object|null} Question object or null if not found
 */
export function getQuestionById(questionId) {
  return mockGetQuestionById(questionId);
}

/**
 * Create a new question
 * @param {Object} questionData - Question data
 * @param {string} questionData.subjectId - Subject ID
 * @param {string} questionData.question - Question text
 * @param {string} questionData.answer - Answer text
 * @param {string} questionData.difficulty - 'easy', 'medium', or 'hard'
 * @param {string} [questionData.explanation] - Optional explanation
 * @param {string} [questionData.codeSnippet] - Optional code snippet
 * @param {string} [questionData.type] - 'flashcard', 'multiple_choice', or 'true_false'
 * @param {Array} [questionData.options] - Options for multiple choice
 * @returns {Object} The created question
 */
export function createQuestion(questionData) {
  const newQuestion = {
    _id: `q${Date.now()}`,
    subjectId: questionData.subjectId,
    question: questionData.question || 'New Question',
    answer: questionData.answer || '',
    difficulty: questionData.difficulty || 'medium',
    explanation: questionData.explanation || '',
    codeSnippet: questionData.codeSnippet || '',
    type: questionData.type || 'flashcard',
    options: questionData.options || [],
    correctCount: 0,
    incorrectCount: 0,
    createdAt: new Date().toISOString().split('T')[0],
  };
  MOCK_QUESTIONS.push(newQuestion);
  
  // Update question count in subject
  const subject = MOCK_SUBJECTS.find((s) => s._id === questionData.subjectId);
  if (subject) {
    subject.questionCount = (subject.questionCount || 0) + 1;
  }
  
  console.log('✅ Created new question:', newQuestion._id);
  return newQuestion;
}

/**
 * Update an existing question
 * @param {string} questionId - The question ID
 * @param {Object} questionData - Updated question data
 * @returns {Object} The updated question
 */
export function updateQuestion(questionId, questionData) {
  const index = MOCK_QUESTIONS.findIndex((q) => q._id === questionId);
  if (index === -1) {
    throw new Error(`Question not found: ${questionId}`);
  }
  MOCK_QUESTIONS[index] = { 
    ...MOCK_QUESTIONS[index], 
    ...questionData,
    updatedAt: new Date().toISOString().split('T')[0],
  };
  console.log('✅ Updated question:', questionId);
  return MOCK_QUESTIONS[index];
}

/**
 * Delete a question
 * @param {string} questionId - The question ID
 * @returns {boolean} True if deleted successfully
 */
export function deleteQuestion(questionId) {
  const index = MOCK_QUESTIONS.findIndex((q) => q._id === questionId);
  if (index === -1) {
    throw new Error(`Question not found: ${questionId}`);
  }
  
  // Get subjectId before deleting
  const subjectId = MOCK_QUESTIONS[index].subjectId;
  
  MOCK_QUESTIONS.splice(index, 1);
  
  // Update question count in subject
  const subject = MOCK_SUBJECTS.find((s) => s._id === subjectId);
  if (subject) {
    subject.questionCount = Math.max(0, (subject.questionCount || 0) - 1);
  }
  
  console.log('🗑️ Deleted question:', questionId);
  return true;
}

// ============================================================
// ============================================================
// QUIZ API
// ============================================================
// ============================================================

/**
 * Get random questions for a quiz
 * @param {string} subjectId - The subject ID
 * @param {number} count - Number of questions (default: 10)
 * @returns {Array} Array of question objects (without answers)
 */
export function getQuizQuestions(subjectId, count = 10) {
  const questions = getQuestionsBySubject(subjectId);
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);
  
  // Return questions without answers (for quiz)
  return selected.map(({ _id, question, difficulty, subjectId, type, options }) => ({
    _id,
    question,
    difficulty,
    subjectId,
    type: type || 'flashcard',
    options: options || [],
  }));
}

/**
 * Get the answer for a specific question
 * @param {string} questionId - The question ID
 * @returns {Object} Object with answer and explanation
 */
export function getQuestionAnswer(questionId) {
  const question = getQuestionById(questionId);
  if (!question) {
    throw new Error(`Question not found: ${questionId}`);
  }
  return {
    answer: question.answer,
    explanation: question.explanation || 'No explanation provided.',
    codeSnippet: question.codeSnippet || '',
  };
}

/**
 * Update question review stats (correct/incorrect)
 * @param {string} questionId - The question ID
 * @param {boolean} isCorrect - Whether the answer was correct
 * @returns {Object} The updated question
 */
export function updateQuestionReview(questionId, isCorrect) {
  const question = getQuestionById(questionId);
  if (!question) {
    throw new Error(`Question not found: ${questionId}`);
  }
  
  if (isCorrect) {
    question.correctCount = (question.correctCount || 0) + 1;
  } else {
    question.incorrectCount = (question.incorrectCount || 0) + 1;
  }
  
  console.log('📊 Updated review stats for question:', questionId);
  return question;
}

// ============================================================
// ============================================================
// SEARCH API
// ============================================================
// ============================================================

/**
 * Search for questions across all subjects
 * @param {string} query - The search query
 * @param {Object} options - Search options
 * @param {string} options.subjectId - Filter by subject ID
 * @param {number} options.limit - Max results (default: 20)
 * @returns {Array} Array of matching questions
 */
export function searchQuestions(query, options = {}) {
  if (!query || query.trim().length < 2) {
    return [];
  }
  
  const lowerQuery = query.toLowerCase();
  let results = MOCK_QUESTIONS.filter(
    (q) =>
      q.question.toLowerCase().includes(lowerQuery) ||
      q.answer.toLowerCase().includes(lowerQuery)
  );
  
  // Filter by subject if provided
  if (options.subjectId) {
    results = results.filter((q) => q.subjectId === options.subjectId);
  }
  
  // Limit results
  const limit = options.limit || 20;
  results = results.slice(0, limit);
  
  // Add subject name to results
  results = results.map((q) => {
    const subject = getSubjectById(q.subjectId);
    return {
      ...q,
      subjectName: subject?.name || 'Unknown Subject',
    };
  });
  
  console.log('🔍 Search results:', results.length, 'for query:', query);
  return results;
}

// ============================================================
// ============================================================
// STATS API
// ============================================================
// ============================================================

/**
 * Get statistics for the user
 * @returns {Object} Statistics object
 */
export function getStats() {
  const totalQuestions = MOCK_QUESTIONS.length;
  const totalCorrect = MOCK_QUESTIONS.reduce((sum, q) => sum + (q.correctCount || 0), 0);
  const totalAttempts = MOCK_QUESTIONS.reduce(
    (sum, q) => sum + (q.correctCount || 0) + (q.incorrectCount || 0),
    0
  );
  
  // Calculate mastery per subject
  const subjectStats = MOCK_SUBJECTS.map((subject) => {
    const subjectQuestions = getQuestionsBySubject(subject._id);
    const correct = subjectQuestions.reduce((sum, q) => sum + (q.correctCount || 0), 0);
    const attempts = subjectQuestions.reduce(
      (sum, q) => sum + (q.correctCount || 0) + (q.incorrectCount || 0),
      0
    );
    const mastery = attempts === 0 ? 0 : Math.round((correct / attempts) * 100);
    
    return {
      subjectId: subject._id,
      subjectName: subject.name,
      totalQuestions: subjectQuestions.length,
      mastery,
      correct,
      attempts,
    };
  });
  
  return {
    totalQuestions,
    totalCorrect,
    totalAttempts,
    overallMastery: totalAttempts === 0 ? 0 : Math.round((totalCorrect / totalAttempts) * 100),
    subjectStats,
    streak: 4, // Mock streak
    dailyActivity: [
      { day: 'Mon', questions: 5 },
      { day: 'Tue', questions: 8 },
      { day: 'Wed', questions: 3 },
      { day: 'Thu', questions: 12 },
      { day: 'Fri', questions: 7 },
    ],
  };
}

// ============================================================
// ============================================================
// EXPORTS
// ============================================================
// ============================================================

export default {
  // Subjects
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
  
  // Questions
  getQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  
  // Quiz
  getQuizQuestions,
  getQuestionAnswer,
  updateQuestionReview,
  
  // Search
  searchQuestions,
  
  // Stats
  getStats,
};