import { Component, inject, OnInit, Signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { RouterModule, UrlSegment } from '@angular/router';
import { UserService } from 'src/app/sevices/user.service';
import { AuthService } from 'src/app/sevices/auth.service';
import { User } from 'src/app/models/user.model';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from 'src/app/sevices/language.service';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { AuthStore } from 'src/app/store/auth/auth.store';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule, CommonModule, TranslateModule, LanguageSelectorComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  authStore = inject(AuthStore);
  currentUser: Signal<User | null> = this.authStore.currentUser;

  constructor() {}

  logout() {
    //   TODO
    //   this.authStore.logout()
  }
}
