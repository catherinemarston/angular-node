import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessagesService, User } from 'src/app/messages/messages.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'edit-profile',
    templateUrl: './edit-profile.component.html',
})
export class EditProfileComponent implements OnInit {
    form: FormGroup;
    user: User;
    constructor(
        private fb: FormBuilder,
        private messagesService: MessagesService,
    ) {}

    ngOnInit() {
        this.setUpForm();
        this.messagesService
            .getUser()
            .pipe(
                map(res => {
                    this.form.get('firstName').setValue(res.firstName);
                    this.form.get('lastName').setValue(res.lastName);
                }),
            )
            .subscribe();
    }

    setUpForm() {
        this.form = this.fb.group({
            firstName: '',
            lastName: '',
        });
    }

    onSubmit() {
        this.messagesService.updateUser(this.form.value).subscribe();
    }
}
