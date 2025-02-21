import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from 'src/app/sevices/language.service';
import { LanguageStore } from 'src/app/store/language/language.store';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss'
})
export class LanguageSelectorComponent {
  languageStore = inject(LanguageStore);
  languages = this.languageStore.languages;
  languageFormGroup = this.formBuilder.group({
    language: [this.languageStore.defaultLang()]
  });

  constructor(private formBuilder: FormBuilder) {}

  switchLanguage() {
    const lang = this.languageFormGroup.controls["language"].value;
    if (lang) {
      this.languageStore.switchLanguage(lang);
    }
  }
}
