import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            token: "",
            loggedIn: false,
            user: {},
            items: []
        };
    },
    mutations: {
        setLoginData(state, data) {
            state.token = data.token;
            state.user = data.user;
            state.loggedIn = true;

            localStorage.setItem("persist", JSON.stringify({
                user: state.user,
                token: state.token
            }));
        },
        clearLoginData(state) {
            state.token = "";
            state.user = {};
            state.loggedIn = false;
            localStorage.clear();
        },
        setItems(state, items) {
            state.items = items;
        }
    },
});

export default store;
