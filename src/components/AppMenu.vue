<template>
  <div>
    <v-toolbar>
      <v-toolbar-title class="font-weight-bold">
        <router-link to="/" class="router-link-title" exact>
            Simple Blog
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn text class="font-weight-bold">
            <router-link to="/" class="router-link" exact>
                Home
            </router-link>
        </v-btn>
        <v-btn text class="font-weight-bold">
            <router-link to="/create" class="router-link" exact>
                Create Blog
            </router-link>
        </v-btn>
      </v-toolbar-items>

    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'AppMenu',
};
</script>

<style>

</style>
