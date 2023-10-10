export interface SentimentAnalysisResponse {
  sentiment: SentimentAnalysis
}

interface SentimentAnalysis {
  type: string,
  score: number
}
