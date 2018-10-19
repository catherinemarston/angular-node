import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

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
    <button mat-button *ngIf="auth.isAuthenticated">Welcome {{auth.name}}</button>
    <button mat-button *ngIf="auth.isAuthenticated" (click)="auth.logout()">Logout</button>
    </div>
    </span>
    </mat-toolbar>`,
    styleUrls: ['./app.component.scss'],
})
export class NavBarComponent implements OnInit {
    constructor(private auth: AuthService) {}

    ngOnInit(): void {}
}
