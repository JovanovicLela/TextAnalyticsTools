import { Component, OnInit } from '@angular/core';
import {SingleEntity} from "../../models/EntityExtractionResponse";
import {EntityExtractionService} from "../../services/entity-extraction.service";

@Component({
  selector: 'app-entity-extraction',
  templateUrl: './entity-extraction.component.html',
  styleUrls: ['./entity-extraction.component.css']
})
export class EntityExtractionComponent implements OnInit {

  inputText: string;
  min_confidence: number;
  isImage: boolean;
  isCategories: boolean;
  isAbstract: boolean;

  titles: String[];
  image: string;
  abstract: string;
  annotations: Array<SingleEntity>;
  categories: String[];

  constructor(private entityExtractionService: EntityExtractionService) {
    this.inputText = entityExtractionService.getInputText();
    this.isCategories = false;
    this.isAbstract = false;
    this.isImage = false;
    this.min_confidence = 0.5;
    this.abstract = '';
    this.image = '';
    this.titles = [];
    this.categories = [];
    this.annotations = [];
  }

  ngOnInit(): void {
  }

  submitEntityExtraction() {
    this.entityExtractionService.serviceEntityExtraction(this.inputText, this.min_confidence, this.isAbstract, this.isImage, this.isCategories).subscribe((response) => {
      this.annotations = response.annotations;
      response.annotations.map(value => {
        this.abstract = value.abstract;
        this.categories = value.categories;
        this.image = value.image.thumbnail;
      })
    })
  }

}
