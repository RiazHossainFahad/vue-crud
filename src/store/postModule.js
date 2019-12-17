/* eslint-disable no-plusplus */
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
    insertSinglePost(state, payload) {
      state.post.unshift(payload);
    },
    updateSinglePost(state, payload) {
      const foundIndex = state.post.findIndex(x => x.slug === payload.slug);
      state.post[foundIndex] = payload;
    },
    removeSinglePost(state, payload) {
      for (let i = 0; i < state.post.length; i++) {
        if (state.post[i].slug === payload) {
          state.post.splice(i, 1);
          i--;
        }
      }
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
    storePost({ commit }, data) {
      return axios.post('/api/blogs', data)
        .then((res) => {
          commit('insertSinglePost', res.data.data);
        })
        .catch(err => console.log(err.response.data));
    },
    updatePost({ commit }, data) {
      return axios.put(`/api/blogs/${data.slug}`, data)
        .then((res) => {
          commit('updateSinglePost', res.data.data);
        })
        .catch(err => console.log(err.response.data));
    },
    deletePost({ commit }, slug) {
      return axios.delete(`/api/blogs/${slug}`)
        .then(() => {
          commit('removeSinglePost', slug);
        })
        .catch(err => console.log(err.response.data));
    },
  },
};
