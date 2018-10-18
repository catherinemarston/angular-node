import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    constructor(private fb: FormBuilder, private auth: AuthService) {}

    ngOnInit() {
        this.setUpForm();
    }

    setUpForm() {
        this.form = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    onSubmit() {
        this.auth.login(this.form.value);
    }
}
