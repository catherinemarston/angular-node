import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatSnackBarModule,
    MatInputModule,
    MatToolbarModule,
    MatFormFieldModule,
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from 'src/app/register/register.component';
import { MessagesService } from 'src/app/messages/messages.service';
import { MessagesComponent } from 'src/app/messages/message.component';
import { CreateNewMessageComponent } from 'src/app/messages/create-new-message.component';
import { NavBarComponent } from 'src/app/nav.component';
import { HomeComponent } from 'src/app/home.component';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginComponent } from 'src/app/login/login.component';

const routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'messages/:name',
        component: MessagesComponent,
    },
    {
        path: 'messages',
        component: MessagesComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
];

@NgModule({
    declarations: [
        AppComponent,
        MessagesComponent,
        CreateNewMessageComponent,
        RegisterComponent,
        NavBarComponent,
        HomeComponent,
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatCardModule,
        MatSnackBarModule,
        MatInputModule,
        MatToolbarModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatInputModule,
        RouterModule.forRoot(routes),
    ],
    providers: [MessagesService, AuthService],
    bootstrap: [AppComponent],
})
export class AppModule {}
