import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from 'src/app/sevices/language.service';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss'
})
export class LanguageSelectorComponent {
  languages = this.languageService.languages;
  languageFormGroup = this.formBuilder.group({
    language: [this.languageService.defaultLang]
  });

  constructor(private languageService: LanguageService, private formBuilder: FormBuilder) {}

  switchLanguage() {
    const lang = this.languageFormGroup.controls["language"].value;
    if (lang) {
      this.languageService.changeLanguage(lang);
    }
  }
}
