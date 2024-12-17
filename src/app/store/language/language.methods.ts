import { inject, PLATFORM_ID } from "@angular/core"
import { getState, patchState, signalStoreFeature, withMethods } from "@ngrx/signals"
import { TranslateService } from "@ngx-translate/core"
import { LanguageStateInterface } from "./language.state"
import { isPlatformBrowser } from "@angular/common"

export function withLanguageSignalMethods() {
    return signalStoreFeature(
        withMethods((store, translateService = inject(TranslateService), platformID = inject(PLATFORM_ID)) => {
            return {
                initLanguageStore(): void {
                    if (isPlatformBrowser(platformID)) {
                        const lang: string | null = localStorage.getItem("lang");
                        if (lang) {
                            this.switchLanguage(lang);
                        }
                    }
                },
                switchLanguage(lang: string): void {
                    const state = getState(store) as LanguageStateInterface;
                    if (state.languages.includes(lang)) {
                        translateService.use(lang);
                        patchState(store, { defaultLang: lang });
                        localStorage.setItem("lang", lang);
                    } else {
                        console.log("Unknown language: ", lang);
                    }
                }
            }
        })
    )
}