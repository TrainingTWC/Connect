
export interface TranscriptionEntry {
  speaker: 'You' | 'HR Bot';
  text: string;
}

export interface KeyPoint {
  point: string;
  type: 'Concern' | 'Positive';
  context: string;
}

export interface SentimentAnalysisResult {
  overallSentiment: 'Positive' | 'Neutral' | 'Negative' | 'Error' | 'N/A';
  summary: string;
  keyPoints: KeyPoint[];
}