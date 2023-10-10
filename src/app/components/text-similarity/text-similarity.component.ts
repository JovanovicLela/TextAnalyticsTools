import { Component, OnInit } from '@angular/core';
import {TextSimilarityService} from "../../services/text-similarity.service";

@Component({
  selector: 'app-text-similarity',
  templateUrl: './text-similarity.component.html',
  styleUrls: ['./text-similarity.component.css']
})
export class TextSimilarityComponent implements OnInit {

  text1: string;
  text2: string;
  similarity: number | undefined;

  constructor(private textSimilarityService: TextSimilarityService) {
    this.text1 = "";
    this.text2 = "";
  }

  ngOnInit(): void {
  }

  submitTextSimilarity() {
    if (this.text1 != '' && this.text2 != '') {
      if (localStorage.getItem('token')) {
        this.textSimilarityService.serviceTextSimilarity(this.text1, this.text2).subscribe((response) => {
          this.similarity = response.similarity;
        });
      } else {
        alert("Token is required.");
      }
    } else {
      alert("Both text fields are required to be filled.");
    }
  }
}
