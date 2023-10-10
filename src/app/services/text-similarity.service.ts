import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {TextSimilarityResponse} from "../models/TextSimilarityResponse";
import {HistoryComponent} from "../components/history/history.component";
import {HistoryService} from "./history.service";
import {tokenize} from "@angular/compiler/src/ml_parser/lexer";

@Injectable({
  providedIn: 'root'
})
export class TextSimilarityService {

  private readonly apiUrl = environment.postApi

  constructor(private httpClient: HttpClient, private historyService: HistoryService) { }

  serviceTextSimilarity(text1: string, text2: string): Observable<TextSimilarityResponse> {
    let params = new HttpParams();
    params = params.append('text1', text1);
    params = params.append('text2', text2);
    // @ts-ignore
    params = params.append('token', localStorage.getItem("token"));

    let request = {
      timestamp: new Date().toISOString().split('T')[0],
      method: "GET",
      url: this.apiUrl + "sim/v1/?" + params
    }

/*
    this.historyService.recordHistoryRequest(new Date(), "GET",
      this.apiUrl + "sim/v1/?text1="+text1 + "&text2=" + text2 + "&token=" + localStorage.getItem('token'));
*/

    this.historyService.recordHistoryRequest(new Date(), "GET", this.apiUrl + "sim/v1/?" + params);
    return this.httpClient.get<TextSimilarityResponse>(`${this.apiUrl}sim/v1/?`, {params: params});
  }
}
