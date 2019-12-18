<template>

    <v-container>
      <v-row dense>
        <v-col cols="12" sm12 md10 lg6>

          <edit-post
            v-if="editing"
            :postData="data"
            @cancel="cancelEditing"
          ></edit-post>

          <v-card
          v-else
          style="box-shadow: 0 20px 30px -16px rgba(9,9,16,.2);"
          class="mx-auto"
          max-width="900"
          >
            <div v-if="data.id === -1">
              <v-card-title class="headline" id="title">
               {{data.title}}
               <router-link to="/create">Create New.</router-link>
              </v-card-title>
            </div>

            <div v-else>
              <v-card-title class="headline" id="title">
                {{data.title}}
                  <v-spacer></v-spacer>
                  <v-card-actions>


                      <v-btn icon @click="editing = true">
                          <v-icon color="orange">mdi-pencil</v-icon>
                      </v-btn>

                      <v-dialog v-model="deleteDialog" persistent max-width="350">
                        <template v-slot:activator="{ on }">
                          <!-- <v-btn color="primary" dark v-on="on">Open Dialog</v-btn> -->
                          <v-btn icon>
                            <v-icon color="red" v-on="on">mdi-delete</v-icon>
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-title class="headline red--text">
                            Do you want to delete?
                          </v-card-title>
                          <v-card-text class="red--text">
                            Once Deleted, It can't be undone.
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1"
                                  dark
                                  @click="deleteDialog = false"
                            >No</v-btn>
                            <v-btn color="red darken-1"
                                  :disabled="disableDeleteDialog"
                                  @click="deleteSinglePost(data.slug)"
                            >Yes</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>

                  </v-card-actions>
              </v-card-title>
              <v-card-subtitle class="subtitle-2">Posted {{data.created_at}}</v-card-subtitle>

              <v-divider class="mx-4"></v-divider>

              <v-card-subtitle class="font-weight-bold" v-html="body">
              </v-card-subtitle>
            </div>

          </v-card>
        </v-col>
      </v-row>
    </v-container>

</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import md from 'marked';
import { mapState, mapActions } from 'vuex';
import EditPost from './EditPost.vue';


export default {
  props: ['data'],
  components: { EditPost },
  data() {
    return {
      deleteDialog: false,
      disableDeleteDialog: false,
      editing: false,
    };
  },
  computed: {
    ...mapState('posts', { page: 'meta' }),
    body() {
      if (this.data.body) { return md.parse(this.data.body); }
      return '';
    },
  },
  methods: {
    ...mapActions('posts', [
      'deletePost', 'getPosts',
    ]),
    editPost(slug) {
      console.log(slug);
    },
    deleteSinglePost(slug) {
      this.disableDeleteDialog = true;
      this.deletePost(slug)
        .then(() => {
          this.getPosts(this.page.current_page);
          this.deleteDialog = false;
          this.disableDeleteDialog = false;
        });
    },
    cancelEditing() {
      this.editing = false;
    },
  },
};
</script>

<style>

</style>
