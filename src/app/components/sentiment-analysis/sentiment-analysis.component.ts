import { Component, OnInit } from '@angular/core';
import {SentimentAnalysisService} from "../../services/sentiment-analysis.service";

@Component({
  selector: 'app-sentiment-analysis',
  templateUrl: './sentiment-analysis.component.html',
  styleUrls: ['./sentiment-analysis.component.css']
})
export class SentimentAnalysisComponent implements OnInit {

  text: string;
  type: string;
  selectedLanguage: string;
  score: number | undefined;

  color = {
    r: 0,
    g: 0,
    b: 0
  }

  constructor(private sentimentAnalysisService: SentimentAnalysisService) {
    this.text = '';
    this.type = '';
    this.selectedLanguage = ''
  }

  ngOnInit(): void {
  }

  submitSentimentAnalysis() {
    if (this.text != '') {
      if (localStorage.getItem('token')) {
        this.sentimentAnalysisService.serviceSentimentAnalysis(this.selectedLanguage, this.text).subscribe((response) => {
          this.type = response.sentiment.type;
          this.score = this.calculateScore(response.sentiment.score);
        });
      } else {
        alert('Token is required');
      }
    } else {
      alert('Text field is required to be filled.');
    }
  }

  calculateScore(score: number): number {
    let p = ((score + 1) / (1+1)) * (1-0) + 0;
    this.color.r = Math.round(255 + (0 - 255) * p);
    this.color.g = Math.round(0 + (255 - 0) * p);
    this.color.b = 0;
    return (score - (-1)) / (1 - (-1));
  }

}
