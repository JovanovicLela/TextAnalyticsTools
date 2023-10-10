import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  token: string;

  constructor() {
    this.token = localStorage.getItem("token")!
  }

  setNewToken(newToken: string): void {
    localStorage.setItem("token", newToken)
    this.token = newToken;
  }

  getToken(): string {
    return this.token;
  }

}
