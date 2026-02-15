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
  id: number;
  question: string;
  options: QuestionOption[];
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
