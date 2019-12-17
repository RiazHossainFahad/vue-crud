<template>

    <v-container>
      <v-row dense>
        <v-col cols="12" sm12 md10 lg6>
          <v-card
          style="box-shadow: 0 20px 30px -16px rgba(9,9,16,.2);"
          class="mx-auto"
          max-width="900"
          v-if="postData"
          >
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              class="px-10 py-10"
              @submit.prevent="update()"
            >
              <h2 primary-title class="text-center mb-2">
                Edit Blog
              </h2>
              <v-text-field
                v-model="postData.title"
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
                v-model="postData.body"
                :rules="titleRules"
              ></v-textarea> -->

              <vue-simplemde
                v-model="postData.body"
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
                color="teal"
                class="mr-4"
                dark
                @click="validate"
                type="submit"
              >
                Update
              </v-btn>

              <v-btn
                class="mr-4"
                @click="cancelEdit()"
                dark
              >
                Cancel
              </v-btn>
            </v-form>

          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import VueSimplemde from 'vue-simplemde/src/index.vue';

import { mapActions } from 'vuex';


export default {
  name: 'EditPost',
  components: { VueSimplemde },
  props: ['postData'],
  data: () => ({
    valid: true,
    titleRules: [
      v => !!v || 'Title is required',
      v => (v && v.length <= 100) || 'Title must be less than 100 characters',
    ],
    error: null,
  }),
  computed: {
  },
  created() {},
  methods: {
    ...mapActions('posts', [
      'updatePost',
    ]),
    validate() {
      this.bodyRules();
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    update() {
      if (this.postData.title && this.postData.body) {
        this.updatePost(this.postData)
          .then(() => this.cancelEdit());
      }
    },
    bodyRules() {
      if (this.postData.body === '') {
        this.valid = false;
        this.error = 'Body is required';
      } else {
        this.valid = true;
        this.error = null;
      }
    },
    cancelEdit() {
      this.$emit('cancel');
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
