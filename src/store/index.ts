import { createStore } from "redux";
import reducers from './reducers/index';

// convert object to string and store in localStorage
function saveToLocalStorage(state: State) {
    try {
        const serialisedState = JSON.stringify(state.theme);
        localStorage.setItem("theme", serialisedState);
    } catch (e) {
        console.warn(e);
    }
  }
  
  // load string from localStarage and convert into an Object
  // invalid output must be undefined
function loadFromLocalStorage() {
    try {
        const serialisedState = localStorage.getItem("theme");
        if (serialisedState === null) return undefined;
        return JSON.parse(serialisedState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}

const store = createStore(reducers, {
    theme: loadFromLocalStorage()
});

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;

export type State = ReturnType<typeof reducers>