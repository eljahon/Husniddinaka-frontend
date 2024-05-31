import request from '@/utils/request';

export const Orders = {
    state: () => ({
        orders: undefined,
        order: undefined
    }),
    getters: {},
    mutations: {
        SET_ORDERS: (state, payload) => {
            state.orders = payload;
        },
        SET_ORDER: (state, payload) => {
            state.order = payload;
        }
    },
    actions: {
        getOrders({ commit }, payload) {
            return new Promise((resolve, reject) => {
                request
                    .get('/orders')
                    .then((res) => {
                        commit('SET_ORDERS', payload);
                        resolve(res);
                    })
                    .catch((err) => {
                        commit('SET_ORDERS', []);
                        reject(err);
                    });
            });
        },
        getOrder({ commit }, payload) {
            return new Promise((resolve, reject) => {
                request
                    .get(`/orders/${payload}`)
                    .then((res) => {
                        commit('SET_ORDER', payload);
                        resolve(res);
                    })
                    .catch((err) => {
                        commit('SET_ORDERS', []);
                        reject(err);
                    });
            });
        },
        // eslint-disable-next-line no-unused-vars
        postOrder({ commit }, payload) {
            return new Promise((resolve, reject) => {
                request
                    .post('/orders', { ...payload })
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        // eslint-disable-next-line no-unused-vars
        putOrder({ commit }, payload) {
            return new Promise((resolve, reject) => {
                request
                    .put(`/orders/${payload.id}`, { ...payload.data })
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        // eslint-disable-next-line no-unused-vars
        deleteOrder({ commit }, payload) {
            return new Promise((resolve, reject) => {
                request
                    .delete(`/orders/${payload}`)
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        }
    }
};
