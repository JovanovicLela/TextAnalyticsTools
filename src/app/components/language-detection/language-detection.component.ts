import { Component, OnInit } from '@angular/core';
import {LanguageDetectionService} from "../../services/language-detection.service";

@Component({
  selector: 'app-language-detection',
  templateUrl: './language-detection.component.html',
  styleUrls: ['./language-detection.component.css']
})
export class LanguageDetectionComponent implements OnInit {

  text: string;
  clean: boolean;
  confidence: number | undefined;
  language: string;

  constructor(private languageDetectionService: LanguageDetectionService) {
    this.text = '';
    this.language = '';
    this.clean = false;
  }

  ngOnInit(): void {
  }

  submitLanguageDetection() {
    if (this.text != '') {
      if (localStorage.getItem('token')) {
        this.languageDetectionService.serviceLanguageDetection(this.text, this.clean).subscribe((response) => {
          response.detectedLangs.map(value => {
            this.language = value.lang;
            this.confidence = value.confidence;
          });
        });
      } else {
        alert('Token is required.');
      }
    } else {
      alert('Text field is required to be filled.');
    }
  }

}
