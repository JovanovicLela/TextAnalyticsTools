export interface LanguageDetectionResponse {
  detectedLangs: Array<Language>
}

interface Language {
  lang: string,
  confidence: number
}
