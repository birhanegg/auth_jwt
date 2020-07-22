import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from "../model/user.model";
import { Observable } from "rxjs/index";
import { ApiResponse } from "../model/api.response";

@Injectable({
  // we declare that this service should be created
  // by the root application injector.
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:3000/users/';

  getUsers(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl);
  }

  getUserById(id: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + id);
  }

  createUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl, user);
  }

  updateUser(user: User): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl + user._id, user);
  }

  deleteUser(id: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + id);
  }
}
