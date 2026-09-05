export const MOCK_SUBJECTS = [
  {
    _id: '1',
    name: 'Data Structures',
    description: 'Trees, Graphs, Hash Maps',
    icon: '🌲',
    mastery: 80,
    questionCount: 42,
  },
  {
    _id: '2',
    name: 'Networks',
    description: 'TCP/IP, OSI Model, Routing',
    icon: '🌐',
    mastery: 35,
    questionCount: 28,
  },
  {
    _id: '3',
    name: 'Operating Systems',
    description: 'Threads, Concurrency, Memory',
    icon: '🐧',
    mastery: 0,
    questionCount: 0,
  },
  {
    _id: '4',
    name: 'Algorithms',
    description: 'Sorting, Searching, Dynamic Programming',
    icon: '📊',
    mastery: 65,
    questionCount: 36,
  },
  {
    _id: '1',
    name: 'Data Structures',
    description: 'Trees, Graphs, Hash Maps',
    icon: '🌲',
    mastery: 80,
    questionCount: 42,
  },
  {
    _id: '2',
    name: 'Networks',
    description: 'TCP/IP, OSI Model, Routing',
    icon: '🌐',
    mastery: 35,
    questionCount: 28,
  },
  {
    _id: '3',
    name: 'Operating Systems',
    description: 'Threads, Concurrency, Memory',
    icon: '🐧',
    mastery: 0,
    questionCount: 0,
  },
  {
    _id: '4',
    name: 'Algorithms',
    description: 'Sorting, Searching, Dynamic Programming',
    icon: '📊',
    mastery: 65,
    questionCount: 36,
  },
  {
    _id: '1',
    name: 'Data Structures',
    description: 'Trees, Graphs, Hash Maps',
    icon: '🌲',
    mastery: 80,
    questionCount: 42,
  },
  {
    _id: '2',
    name: 'Networks',
    description: 'TCP/IP, OSI Model, Routing',
    icon: '🌐',
    mastery: 35,
    questionCount: 28,
  },
  {
    _id: '3',
    name: 'Operating Systems',
    description: 'Threads, Concurrency, Memory',
    icon: '🐧',
    mastery: 0,
    questionCount: 0,
  },
  {
    _id: '4',
    name: 'Algorithms',
    description: 'Sorting, Searching, Dynamic Programming',
    icon: '📊',
    mastery: 65,
    questionCount: 36,
  },
];

export const MOCK_QUESTIONS = [
  // ============================================================
  // Data Structures (subjectId: '1')
  // ============================================================
  
  // Easy Questions
  {
    _id: 'q1',
    subjectId: '1',
    question: 'What is the time complexity of searching in a balanced BST?',
    answer: 'O(log n) because the search space is halved at each step',
    difficulty: 'easy',
    correctCount: 5,
    incorrectCount: 1,
    createdAt: '2024-01-15',
  },
  {
    _id: 'q2',
    subjectId: '1',
    question: 'Describe an Array data structure.',
    answer: 'A contiguous block of memory storing elements of the same type',
    difficulty: 'easy',
    correctCount: 4,
    incorrectCount: 0,
    createdAt: '2024-01-15',
  },
  {
    _id: 'q3',
    subjectId: '1',
    question: 'What is a Stack? Give an example.',
    answer: 'LIFO data structure. Example: Undo/Redo operations in text editors',
    difficulty: 'easy',
    correctCount: 6,
    incorrectCount: 2,
    createdAt: '2024-01-16',
  },
  {
    _id: 'q4',
    subjectId: '1',
    question: 'What is a Queue? Give an example.',
    answer: 'FIFO data structure. Example: Printer job scheduling',
    difficulty: 'easy',
    correctCount: 3,
    incorrectCount: 1,
    createdAt: '2024-01-16',
  },
  
  // Medium Questions
  {
    _id: 'q5',
    subjectId: '1',
    question: 'Explain the difference between an Array and a Linked List.',
    answer: 'Array: contiguous memory, O(1) access, O(n) insertion. Linked List: non-contiguous, O(n) access, O(1) insertion at head',
    difficulty: 'medium',
    correctCount: 3,
    incorrectCount: 2,
    createdAt: '2024-01-17',
  },
  {
    _id: 'q6',
    subjectId: '1',
    question: 'What is a Binary Search Tree (BST) and its properties?',
    answer: 'A binary tree where left child < parent < right child. In-order traversal gives sorted order',
    difficulty: 'medium',
    correctCount: 2,
    incorrectCount: 3,
    createdAt: '2024-01-17',
  },
  {
    _id: 'q7',
    subjectId: '1',
    question: 'Explain what a Hash Map is and its typical time complexity.',
    answer: 'Key-value store using hash function for O(1) average time for insert, delete, search',
    difficulty: 'medium',
    correctCount: 4,
    incorrectCount: 1,
    createdAt: '2024-01-18',
  },
  
  // Hard Questions
  {
    _id: 'q8',
    subjectId: '1',
    question: 'What is the difference between a Binary Tree and a Binary Search Tree?',
    answer: 'Binary Tree: each node has at most 2 children, no ordering. BST: ordered (left < parent < right)',
    difficulty: 'hard',
    correctCount: 1,
    incorrectCount: 3,
    createdAt: '2024-01-18',
  },
  {
    _id: 'q9',
    subjectId: '1',
    question: 'Explain AVL Tree rotations and when they are needed.',
    answer: 'AVL rotates (LL, RR, LR, RL) to maintain balance after insert/delete. Balance factor must be -1, 0, or 1',
    difficulty: 'hard',
    correctCount: 2,
    incorrectCount: 4,
    createdAt: '2024-01-19',
  },
  {
    _id: 'q10',
    subjectId: '1',
    question: 'What is the concept of Trie and where is it used?',
    answer: 'A tree data structure for efficient string search. Used in autocomplete, spell checkers',
    difficulty: 'hard',
    correctCount: 1,
    incorrectCount: 2,
    createdAt: '2024-01-19',
  },

  // ============================================================
  // Networks (subjectId: '2')
  // ============================================================
  
  // Easy Questions
  {
    _id: 'q11',
    subjectId: '2',
    question: 'What is the OSI model? How many layers does it have?',
    answer: 'Open Systems Interconnection model with 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application',
    difficulty: 'easy',
    correctCount: 8,
    incorrectCount: 1,
    createdAt: '2024-01-15',
  },
  {
    _id: 'q12',
    subjectId: '2',
    question: 'What is TCP/IP?',
    answer: 'Transmission Control Protocol/Internet Protocol - the fundamental suite of protocols for the internet',
    difficulty: 'easy',
    correctCount: 7,
    incorrectCount: 2,
    createdAt: '2024-01-15',
  },
  
  // Medium Questions
  {
    _id: 'q13',
    subjectId: '2',
    question: 'Explain the difference between TCP and UDP.',
    answer: 'TCP: connection-oriented, reliable, ordered delivery. UDP: connectionless, unreliable, faster, no ordering',
    difficulty: 'medium',
    correctCount: 4,
    incorrectCount: 3,
    createdAt: '2024-01-16',
  },
  {
    _id: 'q14',
    subjectId: '2',
    question: 'What is an IP address and what are its types?',
    answer: 'A unique identifier for devices on a network. Types: IPv4 (32-bit), IPv6 (128-bit). Also public vs private',
    difficulty: 'medium',
    correctCount: 5,
    incorrectCount: 2,
    createdAt: '2024-01-16',
  },

  // ============================================================
  // Operating Systems (subjectId: '3') - Some questions
  // ============================================================
  
  {
    _id: 'q15',
    subjectId: '3',
    question: 'What is a Process?',
    answer: 'A program in execution. Contains program code, data, stack, heap, and process control block (PCB)',
    difficulty: 'easy',
    correctCount: 0,
    incorrectCount: 0,
    createdAt: '2024-01-20',
  },
  {
    _id: 'q16',
    subjectId: '3',
    question: 'What is the difference between a Process and a Thread?',
    answer: 'Process: independent, heavy, separate memory. Thread: light, shares memory with parent process, within a process',
    difficulty: 'medium',
    correctCount: 0,
    incorrectCount: 0,
    createdAt: '2024-01-20',
  },

  // ============================================================
  // Algorithms (subjectId: '4')
  // ============================================================
  
  // Easy Questions
  {
    _id: 'q17',
    subjectId: '4',
    question: 'What is the time complexity of Binary Search?',
    answer: 'O(log n). The search space is halved with each iteration',
    difficulty: 'easy',
    correctCount: 6,
    incorrectCount: 1,
    createdAt: '2024-01-15',
  },
  {
    _id: 'q18',
    subjectId: '4',
    question: 'What is the time complexity of Linear Search?',
    answer: 'O(n). It checks each element one by one in the worst case',
    difficulty: 'easy',
    correctCount: 5,
    incorrectCount: 0,
    createdAt: '2024-01-15',
  },
  
  // Medium Questions
  {
    _id: 'q19',
    subjectId: '4',
    question: 'Explain the QuickSort algorithm and its time complexity.',
    answer: 'Divide and conquer. Picks a pivot, partitions array, recursively sorts. Average: O(n log n), Worst: O(n²)',
    difficulty: 'medium',
    correctCount: 3,
    incorrectCount: 2,
    createdAt: '2024-01-16',
  },
  {
    _id: 'q20',
    subjectId: '4',
    question: 'What is the Merge Sort algorithm and its time complexity?',
    answer: 'Divide and conquer. Splits array in half, recursively sorts, merges back. Time: O(n log n) in all cases',
    difficulty: 'medium',
    correctCount: 4,
    incorrectCount: 2,
    createdAt: '2024-01-16',
  },
  
  // Hard Questions
  {
    _id: 'q21',
    subjectId: '4',
    question: 'What is Dynamic Programming and when to use it?',
    answer: 'Technique to solve problems by breaking them into overlapping subproblems. Used for optimization problems like Fibonacci, Knapsack',
    difficulty: 'hard',
    correctCount: 2,
    incorrectCount: 3,
    createdAt: '2024-01-17',
  },
  {
    _id: 'q22',
    subjectId: '4',
    question: 'Explain the difference between Divide and Conquer and Dynamic Programming.',
    answer: 'Divide and Conquer: non-overlapping subproblems (Merge Sort). Dynamic Programming: overlapping subproblems (Fibonacci, Knapsack)',
    difficulty: 'hard',
    correctCount: 1,
    incorrectCount: 4,
    createdAt: '2024-01-17',
  },
];

export const getQuestionsBySubject=(subjectId)=>{
  return MOCK_QUESTIONS.filter((q)=>q.subjectId===subjectId)
}

export const getQuestionsByDifficulty=(subjectId,difficulty)=>{
  return MOCK_QUESTIONS.filter(
  (q)=>q.subjectId===subjectId &&q.difficulty===difficulty
  )
}
export const getRandomQuestions=(subjectId,count=10)=>{
  const questions=getQuestionsBySubject(subjectId);
  const shuffled=[...questions].sort(()=>Math.random()-0.5);
  return shuffled.slice(0,count)
}
