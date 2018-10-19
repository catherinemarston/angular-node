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
    updatedUser: User;
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
                    this.user = res;
                    this.form.get('firstName').setValue(this.user.firstName);
                    this.form.get('lastName').setValue(this.user.lastName);
                }),
            )
            .subscribe();
    }

    setUpForm() {
        //    this.messagesService
        //         .getUser()
        //         .pipe(
        //             map(res => {
        //                 this.user = res;
        //             }),
        //         )
        //         .subscribe();
        // this.user = this.messagesService.getUser().subscribe();
        this.form = this.fb.group({
            firstName: this.user ? this.user.firstName : '',
            lastName: this.user ? this.user.lastName : '',
        });
    }

    onSubmit() {
        // this.user.firstName = this.form.get('firstName').value;
        // this.user.firstName = this.form.get('firstName').value;
        const updatedUser = new User();
        updatedUser.firstName = this.form.get('firstName').value;
        updatedUser.lastName = this.form.get('lastName').value;
        updatedUser.email = this.user.email;
        this.messagesService.updateUser(updatedUser).subscribe();
    }
}
