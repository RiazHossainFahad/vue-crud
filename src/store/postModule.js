/* eslint-disable no-plusplus */
import axios from 'axios';

export default {
  namespaced: true,
  state: {
    post: [], // Store all the posts
    links: [],
    meta: { // navigation page info store here
      current_page: 1,
      last_page: 1,
    },
    error: [], // Store error
    lastUpdatedData: '', // Store last updated post for slug update
  },
  mutations: {
    /** Set the post after axios call */
    setPost(state, payload) {
      /** If No data returened, Set msg */
      if (!payload.data.length) {
        const data = [{
          id: -1,
          title: 'No-Data available.',
          body: '',
        }];
        state.post = data;
      } else { state.post = payload.data; }
    },
    setLinks(state, payload) {
      state.links = payload.links;
    },
    setMeta(state, payload) {
      state.meta = payload.meta;
    },
    setError(state, payload) {
      state.error = payload;
    },
    insertSinglePost(state, payload) {
      if (state.post[0].id === -1) { state.post = payload; } else { state.post.unshift(payload); }
    },
    updateSinglePost(state, payload) {
      // console.log('Pay', payload.data.data);
      const foundIndex = state.post.findIndex(x => x.slug === payload.prevData.slug);
      state.post[foundIndex] = payload.data.data;
      state.lastUpdatedData = state.post[foundIndex];
    },
    removeSinglePost(state, payload) {
      for (let i = 0; i < state.post.length; i++) {
        if (state.post[i].slug === payload) {
          state.post.splice(i, 1);
          i--;
        }
      }
    },
    fixTotalPost(state, payload) {
      if (payload) {
        state.meta.total++;
        if (state.meta.total % 5 === 0) {
          state.meta.last_page++;
        }
      } else {
        state.meta.total--;
        if (state.meta.total % 5 === 0) {
          if (state.meta.last_page === 1 && state.post.length === 0) {
            // const data = {
            //   id: 1,
            //   title: 'nodata available',
            //   body: '',
            // };
            // state.post = [data];
          } else {
            state.meta.current_page--;
            state.meta.last_page--;
          }
        }
      }
    },
  },
  getters: {
  },
  actions: {
    getPosts({ commit }, pageNumber = 0) {
      // commit('setPost', []);
      let url;
      if (pageNumber) { url = `/api/blogs?page=${pageNumber}`; } else { url = '/api/blogs'; }

      axios.get(url)
        .then((res) => {
          commit('setPost', res.data);
          commit('setLinks', res.data);
          commit('setMeta', res.data);
          commit('setError', []);
        })
        .catch(err => commit('setError', err.response.data));
    },
    storePost({ commit }, data) {
      return axios.post('/api/blogs', data)
        .then((res) => {
          commit('insertSinglePost', res.data.data);
          commit('fixTotalPost', 1);
        })
        .catch(err => console.log(err.response.data));
    },
    updatePost({ commit }, data) {
      return axios.put(`/api/blogs/${data.slug}`, data)
        .then((res) => {
          res.prevData = data;
          commit('updateSinglePost', res);
        })
        .catch(err => console.log(err.response.data));
    },
    deletePost({ commit }, slug) {
      return axios.delete(`/api/blogs/${slug}`)
        .then(() => {
          commit('removeSinglePost', slug);
          commit('fixTotalPost', 0);
        })
        .catch(err => console.log(err.response.data));
    },
  },
};
