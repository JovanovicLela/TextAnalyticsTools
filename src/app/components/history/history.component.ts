import { Component, OnInit } from '@angular/core';
import {HistoryRequest} from "../../models/HistoryRequest";
import {HistoryService} from "../../services/history.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  historyRepository: HistoryRequest[];

  constructor(private historyService: HistoryService) {
    this.historyRepository = [];
  }

  ngOnInit(): void {
    this.historyRepository = this.historyService.getHistoryRepository();
  }

}
