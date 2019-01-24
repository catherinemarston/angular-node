import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { MessagesService, User } from 'src/app/messages/messages.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'nav-bar',
    template: `<mat-toolbar color="primary">
    <div>
    <button mat-button routerLink="/">Message Board</button>
    <button mat-button routerLink="/messages">Messages</button>
    </div>
    <span class="nav-right">
    <div>
    <button mat-button *ngIf="!auth.isAuthenticated" routerLink="/login">Login</button>
    <button mat-button *ngIf="!auth.isAuthenticated" routerLink="/register">Register</button>
    <button mat-button *ngIf="auth.isAuthenticated">Welcome</button>
    <button mat-button *ngIf="auth.isAuthenticated" (click)="auth.logout()">Logout</button>
    <button mat-button *ngIf="auth.isAuthenticated" routerLink="/libraries">Libraries</button>
    </div>
    </span>
    </mat-toolbar>`,
    styleUrls: ['./app.component.css'],
})
export class NavBarComponent implements OnInit {
    user: User;

    constructor(
        private auth: AuthService,
        private messagesService: MessagesService,
    ) {}

    ngOnInit() {
        this.messagesService
            .getUser()
            .pipe(
                map(res => {
                    this.user = res;
                }),
            )
            .subscribe();

        // this.messagesService.userSubject.subscribe(() => {
        //     this.messagesService.getUserData().subscribe(el => {
        //         this.user = el;
        //     });
        // });
    }
}
