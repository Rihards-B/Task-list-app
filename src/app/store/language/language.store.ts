import { signalStore, withHooks, withState } from "@ngrx/signals";
import { InitialLanguageState, LanguageStateInterface } from "./language.state";
import { withLanguageSignalMethods } from "./language.methods";

export const LanguageStore = signalStore(
    { providedIn: 'root' },
    withState<LanguageStateInterface>(InitialLanguageState),
    withLanguageSignalMethods(),
    withHooks({
        onInit(store) {
            store.initLanguageStore();
        }
    })



)