import { Component, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { RouterModule, UrlSegment } from '@angular/router';
import { UserService } from 'src/app/sevices/user.service';
import { AuthService } from 'src/app/sevices/auth.service';
import { Observable, take } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  currentUser$: Observable<User> = this.userService.currentUserSubject.asObservable();

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userService.isLoggedIn.pipe(take(1)).subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.currentUser$.subscribe((user) => {
          console.log("You are logged in as ", user.username);
        })
      }
    })
  }

  logout() {
    this.authService.logout().subscribe();
  }
}
