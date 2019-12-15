<template>

    <v-container>
      <v-row dense>
        <v-col cols="12" sm12 md10 lg6>
          <v-card
            color="#385F73"
            dark
          >
            <v-card-title class="headline">
               {{data.title}}
                <v-spacer></v-spacer>
                <v-card-actions>
                    <v-btn icon>
                        <v-icon color="orange">mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon>
                        <v-icon color="red">mdi-delete</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card-title>
            <v-card-subtitle class="sub-title">Posted {{data.created_at}}</v-card-subtitle>

            <v-divider class="mx-4"></v-divider>

            <v-card-subtitle>
                {{data.body}}
            </v-card-subtitle>

          </v-card>
        </v-col>
      </v-row>
    </v-container>

</template>

<script>
export default {
  props: ['data'],
};
</script>

<style>

</style>
