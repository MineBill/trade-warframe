import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            token: "",
            user: {}
        };
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setUserData(state, data) {
            state.user = data;
        },
    }
});

export default store;