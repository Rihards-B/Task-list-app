export interface LanguageStateInterface {
    languages: string[];
    defaultLang: string;
}

export const InitialLanguageState: LanguageStateInterface = {
    languages: ["lv", "en"],
    defaultLang: "en"
}