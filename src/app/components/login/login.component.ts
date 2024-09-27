import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorComponent } from '../form-error/form-error.component';
import { AuthService } from 'src/app/sevices/auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/sevices/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  failedLoginSubject = new BehaviorSubject<boolean>(false);
  formGroup: FormGroup = this.formBuilder.group({
    username: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
    password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(64)]]
  })

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router) {}

  login() {
    this.authService.login(this.formGroup.value).subscribe((response) => {
      if (response.isLoggedIn === true) {
        this.router.navigateByUrl("/");
        this.userService.currentUserSubject.next(response.user);
        this.userService.isLoggedInSubject.next(true);
      } else {
        this.failedLoginSubject.next(true);
      }
    })
  }
}
