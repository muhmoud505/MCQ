import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuizQuestions,
  getQuestionAnswer,
  searchQuestions,
} from "../services/api";

// ============================================================
// CREATE STORE WITH PERSISTENCE
// ============================================================

const useAppStore = create(
  persist(
    (set, get) => ({
      // ============================================================
      // STATE
      // ============================================================

      // Subjects
      subjects: [],
      currentSubject: null,

      // Questions
      questions: [],
      currentQuestion: null,

      // Quiz
      quizQuestions: [],
      currentQuizIndex: 0,
      quizAnswers: [],
      quizStarted: false,
      quizCompleted: false,

      // UI
      isLoading: false,
      error: null,

      // Stats
      stats: {
        totalQuestions: 0,
        masteredQuestions: 0,
        streak: 0,
        weeklyActivity: [],
      },

      // ============================================================
      // SUBJECT ACTIONS
      // ============================================================

      setSubjects: (subjects) => set({ subjects }),

      setCurrentSubject: (subject) => set({ currentSubject: subject }),

      addSubject: (subject) =>
        set((state) => ({
          subjects: [subject, ...state.subjects],
        })),

      updateSubject: (subject) =>
        set((state) => ({
          subjects: state.subjects.map((s) =>
            s._id === subject._id ? subject : s
          ),
          currentSubject:
            state.currentSubject?._id === subject._id
              ? subject
              : state.currentSubject,
        })),

      deleteSubject: (subjectId) =>
        set((state) => ({
          subjects: state.subjects.filter((s) => s._id !== subjectId),
          currentSubject:
            state.currentSubject?._id === subjectId
              ? null
              : state.currentSubject,
          questions:
            state.currentSubject?._id === subjectId
              ? []
              : state.questions,
        })),

      // ============================================================
      // QUESTION ACTIONS
      // ============================================================

      setQuestions: (questions) => set({ questions }),

      setCurrentQuestion: (question) => set({ currentQuestion: question }),

      addQuestion: (question) =>
        set((state) => ({
          questions: [question, ...state.questions],
        })),

      updateQuestion: (question) =>
        set((state) => ({
          questions: state.questions.map((q) =>
            q._id === question._id ? question : q
          ),
        })),

      deleteQuestion: (questionId) =>
        set((state) => ({
          questions: state.questions.filter((q) => q._id !== questionId),
        })),

      // ============================================================
      // QUIZ ACTIONS
      // ============================================================

      startQuiz: () =>
        set({
          quizStarted: true,
          quizCompleted: false,
          currentQuizIndex: 0,
          quizAnswers: [],
        }),

      setQuizQuestions: (questions) =>
        set({
          quizQuestions: questions,
          quizAnswers: questions.map(() => null),
        }),

      answerQuestion: (index, isCorrect, selectedAnswer) =>
        set((state) => {
          const updatedAnswers = [...state.quizAnswers];
          updatedAnswers[index] = { isCorrect, selectedAnswer };
          return { quizAnswers: updatedAnswers };
        }),

      nextQuestion: () =>
        set((state) => ({
          currentQuizIndex: state.currentQuizIndex + 1,
        })),

      completeQuiz: () =>
        set({
          quizCompleted: true,
          quizStarted: false,
        }),

      resetQuiz: () =>
        set({
          quizQuestions: [],
          quizAnswers: [],
          currentQuizIndex: 0,
          quizStarted: false,
          quizCompleted: false,
        }),

      // ============================================================
      // UI ACTIONS
      // ============================================================

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      clearError: () => set({ error: null }),

      // ============================================================
      // STATS ACTIONS
      // ============================================================

      setStats: (stats) =>
        set((state) => ({
          stats: { ...state.stats, ...stats },
        })),

      updateStreak: () =>
        set((state) => ({
          stats: {
            ...state.stats,
            streak: state.stats.streak + 1,
          },
        })),

      // ============================================================
      // API CALLS (Async Actions)
      // ============================================================

      // ---- Subjects ----

      fetchSubjects: async () => {
        try {
          set({ isLoading: true, error: null });
          const response = await getSubjects();
          set({ subjects: response, isLoading: false });
          return response;
        } catch (error) {
          console.error("❌ Error loading subjects:", error);
          set({ error: error.message || "Failed to load subjects", isLoading: false });
          throw error;
        }
      },

      createNewSubject: async (subjectData) => {
        try {
          set({ isLoading: true, error: null });
          const newSubject = await createSubject(subjectData);
          set((state) => ({
            subjects: [newSubject, ...state.subjects],
            isLoading: false,
          }));
          return newSubject;
        } catch (error) {
          console.error("❌ Error creating subject:", error);
          set({ error: error.message || "Failed to create subject", isLoading: false });
          throw error;
        }
      },

      updateExistingSubject: async (subjectId, subjectData) => {
        try {
          set({ isLoading: true, error: null });
          const updatedSubject = await updateSubject(subjectId, subjectData);
          set((state) => ({
            subjects: state.subjects.map((s) =>
              s._id === subjectId ? updatedSubject : s
            ),
            currentSubject:
              state.currentSubject?._id === subjectId
                ? updatedSubject
                : state.currentSubject,
            isLoading: false,
          }));
          return updatedSubject;
        } catch (error) {
          console.error("❌ Error updating subject:", error);
          set({ error: error.message || "Failed to update subject", isLoading: false });
          throw error;
        }
      },

      deleteExistingSubject: async (subjectId) => {
        try {
          set({ isLoading: true, error: null });
          await deleteSubject(subjectId);
          set((state) => ({
            subjects: state.subjects.filter((s) => s._id !== subjectId),
            currentSubject:
              state.currentSubject?._id === subjectId
                ? null
                : state.currentSubject,
            questions:
              state.currentSubject?._id === subjectId
                ? []
                : state.questions,
            isLoading: false,
          }));
          return true;
        } catch (error) {
          console.error("❌ Error deleting subject:", error);
          set({ error: error.message || "Failed to delete subject", isLoading: false });
          throw error;
        }
      },

      // ---- Questions ----

      fetchQuestions: async (subjectId) => {
        try {
          set({ isLoading: true, error: null });
          const response = await getQuestions(subjectId);
          set({ questions: response, isLoading: false });
          return response;
        } catch (error) {
          console.error("❌ Error loading questions:", error);
          set({ error: error.message || "Failed to load questions", isLoading: false });
          throw error;
        }
      },

      createNewQuestion: async (questionData) => {
        try {
          set({ isLoading: true, error: null });
          const newQuestion = await createQuestion(questionData);
          set((state) => ({
            questions: [newQuestion, ...state.questions],
            isLoading: false,
          }));
          return newQuestion;
        } catch (error) {
          console.error("❌ Error creating question:", error);
          set({ error: error.message || "Failed to create question", isLoading: false });
          throw error;
        }
      },

      updateExistingQuestion: async (questionId, questionData) => {
        try {
          set({ isLoading: true, error: null });
          const updatedQuestion = await updateQuestion(questionId, questionData);
          set((state) => ({
            questions: state.questions.map((q) =>
              q._id === questionId ? updatedQuestion : q
            ),
            isLoading: false,
          }));
          return updatedQuestion;
        } catch (error) {
          console.error("❌ Error updating question:", error);
          set({ error: error.message || "Failed to update question", isLoading: false });
          throw error;
        }
      },

      deleteExistingQuestion: async (questionId) => {
        try {
          set({ isLoading: true, error: null });
          await deleteQuestion(questionId);
          set((state) => ({
            questions: state.questions.filter((q) => q._id !== questionId),
            isLoading: false,
          }));
          return true;
        } catch (error) {
          console.error("❌ Error deleting question:", error);
          set({ error: error.message || "Failed to delete question", isLoading: false });
          throw error;
        }
      },

      // ---- Quiz ----

      fetchQuizQuestions: async (subjectId, count = 10) => {
        try {
          set({ isLoading: true, error: null });
          const questions = await getQuizQuestions(subjectId, count);
          set({
            quizQuestions: questions,
            quizAnswers: questions.map(() => null),
            isLoading: false,
          });
          return questions;
        } catch (error) {
          console.error("❌ Error loading quiz questions:", error);
          set({ error: error.message || "Failed to load quiz questions", isLoading: false });
          throw error;
        }
      },

      fetchAnswer: async (questionId) => {
        try {
          set({ isLoading: true, error: null });
          const answer = await getQuestionAnswer(questionId);
          set({ isLoading: false });
          return answer;
        } catch (error) {
          console.error("❌ Error loading answer:", error);
          set({ error: error.message || "Failed to load answer", isLoading: false });
          throw error;
        }
      },

      // ---- Search ----

      searchQuestions: async (query) => {
        try {
          set({ isLoading: true, error: null });
          const results = await searchQuestions(query);
          set({ isLoading: false });
          return results;
        } catch (error) {
          console.error("❌ Error searching questions:", error);
          set({ error: error.message || "Failed to search", isLoading: false });
          throw error;
        }
      },

      // ============================================================
      // COMPUTED PROPERTIES (Getters)
      // ============================================================

      // Get questions grouped by difficulty
      getGroupedQuestions: () => {
        const questions = get().questions;
        return {
          easy: questions.filter((q) => q.difficulty === "easy"),
          medium: questions.filter((q) => q.difficulty === "medium"),
          hard: questions.filter((q) => q.difficulty === "hard"),
        };
      },

      // Get mastery percentage for current subject
      getMastery: () => {
        const questions = get().questions;
        if (questions.length === 0) return 0;

        const totalCorrect = questions.reduce(
          (sum, q) => sum + (q.correctCount || 0),
          0
        );
        const totalAttempts = questions.reduce(
          (sum, q) => sum + (q.correctCount || 0) + (q.incorrectCount || 0),
          0
        );

        if (totalAttempts === 0) return 0;
        return Math.round((totalCorrect / totalAttempts) * 100);
      },

      // Get total questions across all subjects
      getTotalQuestions: () => {
        const subjects = get().subjects;
        return subjects.reduce(
          (sum, subject) => sum + (subject.questionCount || 0),
          0
        );
      },

      // Get quiz results
      getQuizResults: () => {
        const { quizQuestions, quizAnswers } = get();
        const answered = quizAnswers.filter((a) => a !== null);
        const correct = answered.filter((a) => a?.isCorrect);

        return {
          totalQuestions: quizQuestions.length,
          answeredQuestions: answered.length,
          correctAnswers: correct.length,
          incorrectAnswers: answered.length - correct.length,
          score: quizQuestions.length > 0
            ? Math.round((correct.length / quizQuestions.length) * 100)
            : 0,
          isComplete: answered.length === quizQuestions.length,
        };
      },

      // Check if current question is last
      isLastQuestion: () => {
        const { currentQuizIndex, quizQuestions } = get();
        return currentQuizIndex === quizQuestions.length - 1;
      },

      // Get current question
      getCurrentQuestion: () => {
        const { quizQuestions, currentQuizIndex } = get();
        return quizQuestions[currentQuizIndex] || null;
      },

      // Get current answer
      getCurrentAnswer: () => {
        const { quizAnswers, currentQuizIndex } = get();
        return quizAnswers[currentQuizIndex] || null;
      },
    }),

    // ============================================================
    // PERSISTENCE CONFIGURATION
    // ============================================================
    {
      name: "CS-Storage",
      storage: createJSONStorage(() => AsyncStorage),

      // Only persist these fields
      partialize: (state) => ({
        subjects: state.subjects,
        currentSubject: state.currentSubject,
        stats: state.stats,
        // Don't persist: questions (loaded per subject)
        // Don't persist: quiz state (fresh each time)
        // Don't persist: UI state (loading, error)
      }),

      // Merge persisted state with default state
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...persistedState,
        // Reset quiz state on load
        quizQuestions: [],
        quizAnswers: [],
        quizStarted: false,
        quizCompleted: false,
        currentQuizIndex: 0,
        // Reset UI state
        isLoading: false,
        error: null,
      }),
    }
  )
);

// ============================================================
// SELECTOR HOOKS (For cleaner components)
// ============================================================

// ---- Simple Selectors ----

export const useSubjects = () => useAppStore((state) => state.subjects);
export const useCurrentSubject = () => useAppStore((state) => state.currentSubject);
export const useQuestions = () => useAppStore((state) => state.questions);
export const useCurrentQuestion = () => useAppStore((state) => state.currentQuestion);
export const useLoading = () => useAppStore((state) => state.isLoading);
export const useError = () => useAppStore((state) => state.error);

// ---- Combined Selectors ----

export const useUIState = () =>
  useAppStore((state) => ({
    isLoading: state.isLoading,
    error: state.error,
  }));

// ---- Computed Selectors ----

export const useGroupedQuestions = () =>
  useAppStore((state) => state.getGroupedQuestions());

export const useMastery = () =>
  useAppStore((state) => state.getMastery());

export const useTotalQuestions = () =>
  useAppStore((state) => state.getTotalQuestions());

// ---- Quiz Selectors ----

export const useQuizState = () =>
  useAppStore((state) => ({
    questions: state.quizQuestions,
    currentIndex: state.currentQuizIndex,
    answers: state.quizAnswers,
    started: state.quizStarted,
    completed: state.quizCompleted,
    currentQuestion: state.getCurrentQuestion(),
    currentAnswer: state.getCurrentAnswer(),
    isLastQuestion: state.isLastQuestion(),
    results: state.getQuizResults(),
  }));

// ---- Stats Selectors ----

export const useStats = () => useAppStore((state) => state.stats);
export const useStreak = () => useAppStore((state) => state.stats.streak);

// ============================================================
// EXPORT DEFAULT
// ============================================================

export default useAppStore;