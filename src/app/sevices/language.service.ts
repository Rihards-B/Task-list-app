import { isPlatformBrowser } from "@angular/common";
import { inject, Injectable, OnInit, PLATFORM_ID } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    platformID = inject(PLATFORM_ID);
    languages = ["lv", "en"];
    defaultLang = "";

    constructor(private translateService: TranslateService) {
        if (isPlatformBrowser(this.platformID)) {
            this.defaultLang = localStorage.getItem("lang") || this.languages[0];
            this.translateService.setDefaultLang(this.defaultLang);
            this.translateService.use(this.defaultLang);
        }
    }

    changeLanguage(lang: string) {
        if (isPlatformBrowser(this.platformID)) {
            if (this.languages.includes(lang)) {
                localStorage.setItem("lang", lang);
                this.translateService.use(lang);
            }
        }
    }
}