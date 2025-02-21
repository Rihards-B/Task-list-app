import { signalStore, withHooks, withState } from "@ngrx/signals";
import { AuthStateInterface, InitialAuthState } from "./auth.state";
import { withAuthSignalMethods } from "./auth.methods";

export const AuthStore = signalStore(
    { providedIn: 'root' },
    withState<AuthStateInterface>(InitialAuthState),
    withAuthSignalMethods(),
    withHooks({
        onInit(store) {
            store.loadCurrentUser();
        },
    })
)