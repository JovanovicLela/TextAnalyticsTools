import { Injectable } from '@angular/core';
import {HistoryRequest} from "../models/HistoryRequest";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

   historyRepository: HistoryRequest[];

  constructor() {
    this.historyRepository = [];
  }

  getHistoryRepository(): HistoryRequest[] {
    return this.historyRepository;
  }

  recordHistoryRequest(time: Date, method: string, endpoint: string): void {
    this.historyRepository.push({
      time: time,
      method: method,
      endpoint: endpoint
    });
  }
}
