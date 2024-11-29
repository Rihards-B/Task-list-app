import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorComponent } from '../form-error/form-error.component';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AuthStore } from 'src/app/store/auth/auth.store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorComponent, CommonModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authStore = inject(AuthStore);
  failedLoginSubject = new BehaviorSubject<boolean>(false);
  formGroup: FormGroup = this.formBuilder.group({
    username: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
    password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(64)]]
  })

  constructor(private formBuilder: FormBuilder) {}

  login() {
    this.authStore.login(this.formGroup.value);
  }
}
