import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorComponent } from '../form-error/form-error.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PasswordsMatch } from 'src/app/validators/matching.validator';
import { AuthStore } from 'src/app/store/auth/auth.store';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorComponent, CommonModule, TranslateModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  authStore = inject(AuthStore);
  errors = this.authStore.errors;
  formGroup: FormGroup = this.formBuilder.group({
    username: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
    password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(64)]],
    confirmPassword: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(64), PasswordsMatch("password")]],
    firstName: ["", [Validators.required, Validators.maxLength(64)]],
    lastName: ["", [Validators.required, Validators.maxLength(64)]]
  })

  constructor(private formBuilder: FormBuilder) {}

  register() {
    if (this.formGroup.valid) {
      this.authStore.register(this.formGroup.value);
    }
  }
}