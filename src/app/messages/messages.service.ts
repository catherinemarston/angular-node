import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable()
export class MessagesService {
    userSubject = new Subject<User>();
    user: User;
    BASE_URL = 'http://localhost:63145';
    private messagesStore = [];
    private messageSubject = new Subject();
    messages = this.messageSubject.asObservable();
    constructor(private http: HttpClient, private auth: AuthService) {
        // this.getMessages();
    }

    getMessages(user) {
        user = user ? '/' + user : '';
        this.http
            .get<Message[]>(this.BASE_URL + '/messages' + user)
            .subscribe(response => {
                this.messagesStore = response;
                this.messageSubject.next(this.messagesStore);
            });
        // .subscribe(res => {
        //     this.messages = res;
        //     console.log(res);
        // });
    }

    createMessage(message): Observable<Message[]> {
        return this.http
            .post<Message[]>(this.BASE_URL + '/messages', message)
            .pipe(
                tap(() => {
                    this.messagesStore.push(message);
                    this.messageSubject.next(this.messagesStore);
                }),
            );
    }

    getUser(): Observable<User> {
        return this.http.get<User>(
            this.BASE_URL + '/users/me',
            this.auth.tokenHeader,
        );
        // .pipe(
        //     tap(res => {
        //         console.log(res);
        //     }),
        // );
    }

    getUserData() {
        this.getUser()
            .pipe(
                map(res => {
                    this.user = res;
                }),
            )
            .subscribe();
        return this.user;
    }

    updateUser(userData): Observable<User> {
        return this.http
            .post<User>(
                this.BASE_URL + '/users/me',
                userData,
                this.auth.tokenHeader,
            )
            .pipe(
                tap(res => {
                    const editedUser = this.getUserData();
                    editedUser.firstName = userData.firstName;
                    editedUser.lastName = userData.lastName;
                    this.userSubject.next(editedUser);
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
