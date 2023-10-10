import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {EntityExtractionResponse} from "../models/EntityExtractionResponse";
import {HistoryService} from "./history.service";

@Injectable({
  providedIn: 'root'
})
export class EntityExtractionService {

  private readonly apiUrl = environment.postApi

  inputText: string;

  constructor(private httpClient: HttpClient, private historyService: HistoryService) {
    this.inputText = ""
  }

  serviceEntityExtraction(inputText: string, min_confidence: number, isAbstract: boolean, isImage: boolean, isCategories: boolean): Observable<EntityExtractionResponse> {
    let params = new HttpParams();
    if (isAbstract) {
      params = params.append('include', 'abstract')
    }
    if (isImage) {
      params = params.append('include', 'image')
    }
    if (isCategories) {
      params = params.append('inlcude', 'categories')
    }
    params = params.append('text', inputText);
    params = params.append('min_confidence', min_confidence)
    // @ts-ignore
    params = params.append('token', localStorage.getItem("token"));

    let request = {
      timestamp: new Date().toISOString().split('T')[0],
      method: "GET",
      url: this.apiUrl + "nex/v1/?" + params
    }

    this.historyService.recordHistoryRequest(new Date(), "GET", this.apiUrl + "nex/v1/?" + params);

    return this.httpClient.get<EntityExtractionResponse>(`${this.apiUrl}nex/v1/?`, {params: params});
  }

  getInputText(): string {
    return this.inputText
  }

}
