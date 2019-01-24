import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap, map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable()
export class MessagesService {
  userSubject = new Subject < User > ();
  user: User;
  BASE_URL = 'http://localhost:63145';
  editedUser: User;
  private messagesStore = [];
  private messageSubject = new Subject();
  messages = this.messageSubject.asObservable();

  constructor(private http: HttpClient, private auth: AuthService) {
    // this.getMessages();
  }

  getMessages(user): Observable<Message[]> {
    user = user ? '/' + user : '';
    return this.http
      .get<Message[]>(this.BASE_URL + '/messages' + user)
      .pipe(
        tap(response => {
          this.messagesStore = response;
          // calling next on the subject and passing the response will let any observer such as our
          // messages component know that there is probably an update and we will pass along the message array
          // to provide the observer with the array
          this.messageSubject.next(this.messagesStore);
        }));
  }

  createMessage(message): Observable < Message[] > {
    return this.http
      .post<Message[]> (this.BASE_URL + '/messages', message)
      .pipe(
        tap(() => {
          this.messagesStore.push(message);
          this.messageSubject.next(this.messagesStore);
        }),
      );
  }

  getUser(): Observable<User> {
    return this.http.get<User> (
      this.BASE_URL + '/users/me',
      this.auth.tokenHeader,
    ).pipe(
      tap(res => {
        this.user = res;
      })
    );
    // .pipe(
    //     tap(res => {
    //         console.log(res);
    //     }),
    // );
  }

  getUserData(): Observable<void> {
    const user = this.getUser()
      .pipe(
        map(res => {
          this.user = res;
        })
      );
    return user;
  }

  updateUser(userData): Observable <User> {
    return this.http
      .post<User> (
        this.BASE_URL + '/users/me',
        userData,
        this.auth.tokenHeader,
      )
      .pipe(
        tap(res => {
          this.getUser().subscribe(user => {
            this.editedUser = user;
          });
          this.editedUser.firstName = userData.firstName;
          this.editedUser.lastName = userData.lastName;
          this.userSubject.next(this.editedUser);
        }),
      );
    // .pipe(
    //     map(res => {
    //         console.log(res);
    //     }),
    // );
  }

}
export interface Message {
  text: string;
  sender: string;
}

export interface FindResponse<T> {
  data: T[];
}

export class User {
  firstName: string;
  lastName: string;
  email: string;
}
