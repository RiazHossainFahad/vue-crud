import Vue from 'vue';
import Vuex from 'vuex';
import postModule from './PostModule';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    posts: postModule,
  },
});
