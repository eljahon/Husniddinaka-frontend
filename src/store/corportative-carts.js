import request from '@/utils/request';
const sub_url = '/users';
const tech_url = '/technical-languages'
export const CorportativeCarts = {
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
        getCorpotatives({ commit }, payload) {
            return new Promise((resolve, reject) => {
                request
                    .get(sub_url, {params:{...payload}})
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
        getTechList({ commit }, payload) {
            return new Promise((resolve, reject) => {
                request
                    .get(tech_url, {params:{...payload}})
                    .then((res) => {
                        // commit('SET_ORDERS', payload);
                        resolve(res);
                    })
                    .catch((err) => {
                        commit('SET_ORDERS', []);
                        reject(err);
                    });
            });
        },
        getCorpotative({ commit }, payload) {
            return new Promise((resolve, reject) => {
                request
                    .get(`${sub_url}/${payload}`)
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
        getTechListItem({ commit }, payload) {
            return new Promise((resolve, reject) => {
                request
                    .get(`${tech_url}/${payload}`)
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
        postCorpotative({ commit }, payload) {
            return new Promise((resolve, reject) => {
                request
                    .post(sub_url, { ...payload })
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        postTechList({ commit }, payload) {
            return new Promise((resolve, reject) => {
                request
                    .post(tech_url, { ...payload })
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        // eslint-disable-next-line no-unused-vars
        putCorpotative({ commit }, payload) {
            return new Promise((resolve, reject) => {
                request
                    .put(`${sub_url}/${payload.id}`, { ...payload.data })
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        putTechList({ commit }, payload) {
            return new Promise((resolve, reject) => {
                request
                    .put(`${tech_url}/${payload.id}`, { ...payload.data })
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        // eslint-disable-next-line no-unused-vars
        deleteCorpotative({ commit }, payload) {
            return new Promise((resolve, reject) => {
                request
                    .delete(`${sub_url}/${payload}`)
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        deleteTechList({ commit }, payload) {
            return new Promise((resolve, reject) => {
                request
                    .delete(`${tech_url}/${payload}`)
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
