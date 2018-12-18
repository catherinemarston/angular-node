import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
    form: FormGroup;
    constructor(private fb: FormBuilder, private auth: AuthService) {}

    ngOnInit() {
        this.setUpForm();
    }
    setUpForm() {
        this.form = this.fb.group(
            {
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                email: ['', Validators.required],
                password: ['', Validators.required],
                confirmPassword: ['', Validators.required],
            },
            { validators: matchingFields('password', 'confirmPassword') },
        );
    }

    onSubmit() {
        this.auth.register(this.form.value);
    }

    isValid(control) {
        return (
            this.form.controls[control].invalid &&
            this.form.controls[control].touched
        );
    }
}

function matchingFields(field1, field2) {
    return form => {
        if (form.controls[field1].value !== form.controls[field2].value) {
            return { mismatchedFields: true };
        }
    };
}
