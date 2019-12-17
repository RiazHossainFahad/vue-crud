<template>
  <div class="home">
    <div v-if="!posts.length" class="text-center">
      <v-progress-circular
        :size="70"
        :width="7"
        color="purple"
        indeterminate
        class="my-5"
      ></v-progress-circular>
    </div>

   <!-- <div v-else-if="errors != []">
      <v-container grid-list-md>
        <v-alert
          outlined
          type="error"
          prominent
          border="left"
        >
          {{errors.errors}}
        </v-alert>
      </v-container>
    </div> -->

    <div v-else
    v-for="(post, index) in posts"
    :key="index"
    >
      <single-post :data="post"></single-post>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import SinglePost from '@/components/SinglePost.vue';

export default {
  name: 'HomePage',
  components: {
    SinglePost,
  },
  computed: {
    ...mapState('posts', {
      posts: 'post',
      errors: 'error',
    }),
  },
  created() {
    this.getPosts();
  },
  methods: {
    ...mapActions('posts', [
      'getPosts',
    ]),
  },
};
</script>
