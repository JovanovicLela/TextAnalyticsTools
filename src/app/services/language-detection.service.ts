import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {LanguageDetectionResponse} from "../models/LanguageDetectionResponse";
import {HistoryService} from "./history.service";

@Injectable({
  providedIn: 'root'
})
export class LanguageDetectionService {

  private readonly apiUrl = environment.postApi

  constructor(private httpClient: HttpClient, private historyService: HistoryService) { }

  serviceLanguageDetection(text: string, clean: boolean): Observable<LanguageDetectionResponse> {
    let params = new HttpParams();
    if (clean) {
      params.append( 'clean', clean);
    }
    params = params.append('text', text);
    params = params.append('clean', clean);
    params = params.append('min_confidence', clean);
    // @ts-ignore
    params = params.append('token', localStorage.getItem('token'));

    let request = {
      timestamp: new Date().toISOString().split('T')[0],
      method: "GET",
      url: this.apiUrl + "li/v1/?" + params
    }

    this.historyService.recordHistoryRequest(new Date(), "GET", this.apiUrl + "li/v1/?" + params);

    return this.httpClient.get<LanguageDetectionResponse>(`${this.apiUrl}li/v1/?`, {params: params});
  }
}


