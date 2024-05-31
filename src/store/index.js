import { createStore } from 'vuex';
import { Auth } from "@/store/auth";
import { Orders } from '@/store/orders';
import {CorportativeCarts} from "@/store/corportative-carts";
import {Subscribers} from "@/store/subscribers";

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
    modules: {
        Auth,
        Orders,
        CorportativeCarts,
        Subscribers
    }
});

export default store;
