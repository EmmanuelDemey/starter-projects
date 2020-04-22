import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

type User = { username: string };

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getCurrentUser(): Observable<User> {
    return this.httpClient.get<User>('/assets/mocks/user.json');
  }
}
