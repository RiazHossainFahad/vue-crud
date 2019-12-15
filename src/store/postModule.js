import axios from 'axios';

export default {
  namespaced: true,
  state: {
    post: [],
    error: [],
  },
  mutations: {
    setPost(state, payload) {
      state.post = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
  },
  getters: {},
  actions: {
    getPosts({ commit }) {
      axios.get('/api/blogs')
        .then((res) => {
          commit('setPost', res.data.data);
          commit('setError', []);
        })
        .catch(err => commit('setError', err.response.data));
    },
  },
};
