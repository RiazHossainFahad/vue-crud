<template>
  <v-app>
    <app-menu></app-menu>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import AppMenu from './components/AppMenu.vue';

export default {
  name: 'App',

  components: {
    AppMenu,
  },

  data: () => ({
    //
  }),
};
</script>

<style lang="scss">

.v-application {
  font-family: 'Raleway', sans-serif !important;
  #title {
    font-family: 'Raleway', sans-serif !important;
  }
}

.router-link{
  text-decoration: none;
  color: inherit !important;
  border-bottom: 3px solid transparent;

  &-active{
    border-bottom: 3px solid #3949AB;
    color: #3949AB !important;
  }
}

.router-link-title{
  text-decoration: none;
  color: inherit !important;
  border-bottom: 3px solid transparent;
}
</style>
