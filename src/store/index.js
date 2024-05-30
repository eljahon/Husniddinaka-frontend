import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            isLogined: false,
        };
    },
    mutations: {
        SET_IS_LOGINED(state, payload) {
            state.isLogined = payload;
        }
    },
    actions: {
        login({ commit }, payload) {

            commit('SET_IS_LOGINED', payload);
        }
    },
    modules: {}
});

export default store;
