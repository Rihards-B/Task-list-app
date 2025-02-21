import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslationLoader } from './sevices/translation.loader';
import { provideStore } from '@ngrx/store';
import { appEffects, appStore } from './store/app.store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideClientHydration(),
  provideAnimationsAsync(),
  provideHttpClient(withFetch(), withInterceptors([AuthInterceptor])),
  importProvidersFrom([TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useClass: TranslationLoader,
      deps: [HttpClient]
    }
  })]),
  provideStore(appStore),
  provideEffects(appEffects),
  provideStoreDevtools({
    maxAge: 25,
    logOnly: !isDevMode(),
    trace: true
  })]
}
