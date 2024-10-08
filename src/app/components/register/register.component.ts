import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorComponent } from '../form-error/form-error.component';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { AuthService } from 'src/app/sevices/auth.service';
import { Router } from '@angular/router';
import { PasswordsMatch } from 'src/app/validators/matching.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorComponent, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerErrorsSubject: Subject<string[]> = new BehaviorSubject<string[]>([]);
  formGroup: FormGroup = this.formBuilder.group({
    username: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
    password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(64)]],
    confirm_password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(64), PasswordsMatch("password")]],
    first_name: ["", [Validators.required, Validators.maxLength(64)]],
    last_name: ["", [Validators.required, Validators.maxLength(64)]]
  })

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

  Register() {
    if (this.formGroup.valid) {
      this.authService.Register(this.formGroup.value, this.registerErrorsSubject).subscribe();
    }
  }
}