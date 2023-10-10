import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {SentimentAnalysisResponse} from "../models/SentimentAnalysisResponse";
import {HistoryService} from "./history.service";

@Injectable({
  providedIn: 'root'
})
export class SentimentAnalysisService {

  private readonly apiUrl = environment.postApi

  constructor(private httpClient: HttpClient, private historyService: HistoryService) { }

  serviceSentimentAnalysis(lang: string, text: string): Observable<SentimentAnalysisResponse> {
    let params = new HttpParams();
    params = params.append('text', text);
    params = params.append('lang', lang);
    // @ts-ignore
    params = params.append('token', localStorage.getItem('token'));

    let request = {
      timestamp: new Date().toISOString().split('T')[0],
      method: "GET",
      url: this.apiUrl + "sent/v1/?" + params
    }

    this.historyService.recordHistoryRequest(new Date(), "GET", this.apiUrl + "sent/v1/?" + params);

    return this.httpClient.get<SentimentAnalysisResponse>(`${this.apiUrl}sent/v1/?`, {params: params});
  }
}
