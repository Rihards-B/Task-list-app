import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TranslateLoader } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { backend_translations } from "../constants/endpoints";

@Injectable({
    providedIn: 'root'
})
export class TranslationLoader implements TranslateLoader {
    constructor(private http: HttpClient) {}

    getTranslation(lang: string): Observable<any> {
        return this.http.get<Object>(backend_translations + lang);
    }
}