import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class SpringbootService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getStatus(): Observable<any> {
    return this.http.get<any>('/springboot-api/', { observe: 'response' })
      .pipe(
        catchError(error => {
          this.messageService.error(`getSpring() ${error.message}`);
          return of(error);
        })
      );
  }
}
