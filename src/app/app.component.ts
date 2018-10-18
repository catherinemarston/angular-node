import { Component, ViewChild } from '@angular/core';
import { MessagesComponent } from 'src/app/messages/message.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'Message Board';
}
