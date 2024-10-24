import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { UserService } from 'src/app/sevices/user.service';
import { AuthService } from 'src/app/sevices/auth.service';
import { Observable, Subscription, take } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit, OnDestroy {
  logoutSubscription = Subscription.EMPTY;
  currentUser$: Observable<User> = this.userService.currentUserSubject.asObservable();

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userService.isLoggedInSubject.pipe(take(1)).subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.currentUser$.subscribe((user) => {
          console.log("You are logged in as ", user.username);
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.logoutSubscription.unsubscribe();
  }

  logout() {
    this.logoutSubscription = this.authService.logout().subscribe(() => {
      this.userService.isLoggedInSubject.next(false);
    });
  }
}
