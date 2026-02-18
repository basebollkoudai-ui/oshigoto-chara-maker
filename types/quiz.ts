export interface Character {
  code: string;
  name: string;
  subtitle: string;
  icon: string;
  personality: string;
  strengths: string[];
  weaknesses: string[];
  hiddenFace: string;
  advice: string;
  suitableJobs: string[];
  skills: {
    leadership: number;
    communication: number;
    planning: number;
    creativity: number;
    teamwork: number;
    technical: number;
  };
}

export interface OptionScore {
  actionStyle?: number;
  socialStyle?: number;
  motivation?: number;
  thinking?: number;
}

export interface QuestionOption {
  text: string;
  scores: OptionScore;
}

export interface Question {
  id: number | string;
  question: string;
  options: QuestionOption[];
  tags?: string[];
}

export interface ScorePattern {
  axis: keyof Scores;
  threshold: number;
  direction: 'positive' | 'negative';
}

export interface QuestionConditions {
  preferredWhen?: {
    mbtiTypes?: string[];
    scorePatterns?: ScorePattern[];
    afterQuestion?: number;
  };
}

export interface QuestionVariant extends Question {
  conditions?: QuestionConditions;
}

export interface QuestionSlot {
  slotId: number;
  category: string;
  baseQuestion: Question;
  variants?: QuestionVariant[];
}

export interface Scores {
  actionStyle: number;
  socialStyle: number;
  motivation: number;
  thinking: number;
}

export interface QuizData {
  axes: {
    actionStyle: {
      name: string;
      positive: string;
      positiveLabel: string;
      negative: string;
      negativeLabel: string;
    };
    socialStyle: {
      name: string;
      positive: string;
      positiveLabel: string;
      negative: string;
      negativeLabel: string;
    };
    motivation: {
      name: string;
      positive: string;
      positiveLabel: string;
      negative: string;
      negativeLabel: string;
    };
    thinking: {
      name: string;
      positive: string;
      positiveLabel: string;
      negative: string;
      negativeLabel: string;
    };
  };
  questions: Question[];
}

export interface BranchingQuizData {
  axes: QuizData['axes'];
  questionSlots: QuestionSlot[];
  branchingRules: {
    mbtiInfluence: Record<string, { preferTags: string[]; weight: number }>;
    scoreThresholds: { early: number; mid: number; late: number };
  };
  axisBalance: Record<keyof Scores, { min: number; max: number; target: number }>;
}

export interface CharactersData {
  characterTypes: Character[];
}

export interface AnswerHistory {
  questionId: number;
  question: string;
  selectedAnswer: string;
  scores: OptionScore;
}

export interface DiagnosisResult {
  id?: string;
  characterCode: string;
  characterName: string;
  scores: Scores;
  answerHistory: AnswerHistory[];
  aiAdvice?: string;
  createdAt?: string;
}
