import { Component, inject, Signal } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { TranslateModule } from '@ngx-translate/core';
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
    this.authStore.logout();
  }
}
