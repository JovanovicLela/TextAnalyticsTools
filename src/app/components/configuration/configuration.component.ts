import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../../services/config.service";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  token: string;

  constructor(private configService: ConfigService) {
    this.token = this.configService.getToken();
  }

  ngOnInit(): void {
  }

  setNewToken() {
    if (this.token == "") {
      return;
    }
    this.configService.setNewToken(this.token)
    }

}
