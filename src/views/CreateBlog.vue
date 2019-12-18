<template>

    <v-container>
      <v-row dense>
        <v-col cols="12" sm12 md10 lg6>
          <v-card
          style="box-shadow: 0 20px 30px -16px rgba(9,9,16,.2);"
          class="mx-auto"
          max-width="900"
          >
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              class="px-10 py-10"
              @submit.prevent="createPost()"
            >
              <h2 primary-title class="text-center mb-2">
                Create Post
              </h2>
              <v-text-field
                v-model="form.title"
                :counter="100"
                :rules="titleRules"
                label="Title"
                required
                outlined
                autocomplete="false"
              ></v-text-field>

              <!-- <v-textarea
                outlined
                name="body"
                label="Body"
                :counter="600"
                v-model="form.body"
                :rules="titleRules"
              ></v-textarea> -->

              <vue-simplemde
                v-model="form.body"
                name="body"
                label="Body"
                :class="error ? 'CodeMirrorError' : ''"
                @input="bodyRules()"
              />
              <div class="v-text-field__details mb-2 pa-3"
                :style="error ? 'visbility:visible' : 'visbility:hidden'"
              >
                <div class="v-messages theme--light error--text" role="alert">
                  <div class="v-messages__wrapper">
                    <div class="v-messages__message">
                      {{error}}
                    </div>
                  </div>
                </div>
              </div>

              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="validate"
                type="submit"
              >
                Create
              </v-btn>
            </v-form>

          </v-card>

          <!-- Preview of Post  -->
          <v-card
          style="box-shadow: 0 20px 30px -16px rgba(9,9,16,.2);"
          class="mx-auto mt-5"
          max-width="900"
          v-if="form.title || form.body"
          >
            <h2 primary-title class="text-center pt-6">
              Preview
            </h2>

            <v-card-title class="headline" id="title">
              {{form.title}}
              <v-spacer></v-spacer>
            </v-card-title>
            <!-- <v-card-subtitle class="sub-title">Posted {{form.created_at}}</v-card-subtitle> -->

            <v-divider class="mx-4"></v-divider>

            <v-card-subtitle class="font-weight-bold" v-html="body">
                <!-- {{form.body}} -->
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import VueSimplemde from 'vue-simplemde/src/index.vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import md from 'marked';

import { mapActions } from 'vuex';


export default {
  name: 'CreateBlog',
  components: { VueSimplemde },
  data: () => ({
    valid: true,
    form: {
      title: '',
      body: '',
    },
    titleRules: [
      v => !!v || 'Title is required',
      v => (v && v.length <= 100) || 'Title must be less than 100 characters',
    ],
    error: null,
  }),
  computed: {
    body() {
      if (this.form.body) { return md.parse(this.form.body); }
      return '';
    },
  },
  methods: {
    ...mapActions('posts', [
      'storePost',
    ]),
    validate() {
      this.bodyRules();
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    createPost() {
      if (this.form.title && this.form.body) {
        if (this.form.title.length < 101) {
          this.storePost(this.form)
            .then(() => this.$router.push('/'));
        }
      }
    },
    bodyRules() {
      if (this.form.body === '') {
        this.valid = false;
        this.error = 'Body is required';
      } else {
        this.valid = true;
        this.error = null;
      }
    },
  },
};
</script>

<style lang="scss">
@import '~simplemde/dist/simplemde.min.css';
.editor-statusbar{
  display: none;
}

.CodeMirrorError {
  border: 2px solid red;
  border-radius: 4px;
}
</style>
