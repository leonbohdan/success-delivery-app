<script setup>
import HeaderLayout from "./views/HeaderLayout.vue";
</script>

<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary">
        <HeaderLayout/>
      </v-app-bar>

      <v-main style="min-height: 100vh;">
        <v-container>
          <RouterView/>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>
