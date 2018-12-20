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
    MatToolbarModule,
} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterComponent } from 'src/app/register/register.component';
import { MessagesService } from 'src/app/messages/messages.service';
import { MessagesComponent } from 'src/app/messages/message.component';
import { CreateNewMessageComponent } from 'src/app/messages/create-new-message.component';
import { NavBarComponent } from 'src/app/nav.component';
import { HomeComponent } from 'src/app/home.component';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginComponent } from 'src/app/login/login.component';
import { EditProfileComponent } from 'src/app/profile/edit-profile.component';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { ModalFormControlComponent } from 'src/app/shared/form-control.component';
import { SelectComponent } from 'src/app/shared/select.component';
import { FormService } from 'src/app/shared/form.service';

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
    {
        path: 'user',
        component: EditProfileComponent,
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
        EditProfileComponent,
        ModalFormControlComponent,
        SelectComponent
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
        FormsModule,
        NguiAutoCompleteModule
    ],
    exports: [
        MatFormFieldModule,
    ],
    providers: [MessagesService, AuthService, FormService],
    bootstrap: [AppComponent],
})
export class AppModule {}
